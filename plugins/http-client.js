/* eslint-disable no-useless-catch */
import axios from 'axios';

export const ERROR_CODES = {
	GENERIC: 'GENERIC',
	REQUEST_ABORTED: 'REQUEST_ABORTED',
};

export const ERRORS = {
	[ERROR_CODES.GENERIC](error) {
		return {
			code: ERROR_CODES.GENERIC,
			message: 'Sorry, an error occurred.',
			originalError: error,
		};
	},
	[ERROR_CODES.REQUEST_ABORTED](error) {
		return {
			code: ERROR_CODES.REQUEST_ABORTED,
			message: 'Sorry, the request was cancelled.',
			originalError: error,
		};
	},
};

class HttpClient {
	constructor(httpConfig) {
		this._baseUrl = httpConfig.baseUrl || '';
		this._headers = httpConfig.defaultHeaders || {};
		this._requests = [];

		this._axiosInstance = axios.create({
			transformRequest: [
				(data, headers) => {
					const accessToken = httpConfig.getToken();

					if (accessToken) {
						headers[httpConfig.tokenHeaderKey] = accessToken;
					} else {
						delete headers[httpConfig.tokenHeaderKey];
					}

					return data;
				},
			],
		});
	}

	abortRequest(requestId) {
		const request = this._requests[requestId];

		if (request) {
			request.abort();
		}
	}

	async _fetch(config) {
		try {
			const { data } = await this._axiosInstance(config);
			return data;
		} catch (error) {
			if (axios.isCancel(error)) {
				throw ERRORS.REQUEST_ABORTED(error);
			} else {
				throw this._getFormattedError(error);
			}
		}
	}

	_getFormattedError(error) {
		const MATCHING_ERROR = ERRORS[error.code];

		if (MATCHING_ERROR) {
			return MATCHING_ERROR(error);
		} else if (error.code) {
			return error;
		}

		return ERRORS.GENERIC(error);
	}

	orchestrateRequest(requestConfig) {
		const orchestratedRequest = {
			requestComplete: false,
		};

		orchestratedRequest.fetch = async () => {
			const source = axios.CancelToken.source();

			orchestratedRequest.requestComplete = false;
			orchestratedRequest.source = source;
			orchestratedRequest.config = {
				baseURL: this._baseUrl,
				headers: {
					...this._headers,
					...requestConfig.headers,
				},
				url: requestConfig.url,
				cancelToken: source.token,
				...(requestConfig.body ? { data: requestConfig.body } : {}),
			};

			this._requests[orchestratedRequest.requestId] = orchestratedRequest;

			const data = await this._fetch(orchestratedRequest.config);

			orchestratedRequest.requestComplete = true;
			delete this._requests[orchestratedRequest.requestId];

			return data;
		};

		orchestratedRequest.abort = () => {
			if (orchestratedRequest.requestComplete) return;

			orchestratedRequest.source.cancel();

			orchestratedRequest.requestComplete = true;
			delete this._requests[orchestratedRequest.requestId];
		};

		return orchestratedRequest;
	}
}

export default (context, inject) => {
	const httpClient = new HttpClient({
		baseUrl: process.env.BASE_URL,
		defaultHeaders: {
			'X-Locale': 'en-US',
			'X-Time-Zone': 'America/New_York',
			'X-Simulate-Delay': 0,
			'X-Random-Error-Probability': 0,
		},
		tokenHeaderKey: 'X-Access-Token',
		getToken: () => {
			return context.app.$cookies.get('accessToken');
		},
	});

	inject('httpClient', httpClient);
};

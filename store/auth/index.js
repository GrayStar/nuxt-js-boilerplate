export const AUTH_NAMESPACE = 'auth';

export const AUTH_MUTATIONS = {
	SET_USER: 'SET_USER',
};

export const AUTH_ACTIONS = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
};

export const state = () => ({
	user: undefined,
});

export const mutations = {
	[AUTH_MUTATIONS.SET_USER](state, payload) {
		state.user = payload;
	},
};

export const actions = {
	[AUTH_ACTIONS.LOGIN]({ commit }) {
		const accessToken = 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx';
		const user = {
			title: 'John Doe',
			email: 'johndoe@gmail.com',
		};

		commit(AUTH_MUTATIONS.SET_USER, user);

		this.$cookies.set('accessToken', accessToken);
		this.$router.push('/about');
	},
	[AUTH_ACTIONS.LOGOUT]({ commit }) {
		commit(AUTH_MUTATIONS.SET_USER, undefined);

		this.$cookies.remove('accessToken');
		this.$router.push('/');
	},
};

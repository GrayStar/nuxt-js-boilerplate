import dtpTheme from '@/assets/themes/dtp';
import oracleTheme from '@/assets/themes/oracle';

export const THEME_NAMESPACE = 'theme';

export const THEME_MUTATIONS = {
	SET_THEME: 'SET_THEME',
};

export const THEME_ACTIONS = {
	GET_DTP_THEME: 'GET_DTP_THEME',
	GET_ORACLE_THEME: 'GET_ORACLE_THEME',
};

export const state = () => {
	return dtpTheme;
};

export const mutations = {
	[THEME_MUTATIONS.SET_THEME](state, payload) {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
	},
};

export const actions = {
	[THEME_ACTIONS.GET_DTP_THEME]({ commit }) {
		commit(THEME_MUTATIONS.SET_THEME, dtpTheme);
	},
	[THEME_ACTIONS.GET_ORACLE_THEME]({ commit }) {
		commit(THEME_MUTATIONS.SET_THEME, oracleTheme);
	},
};

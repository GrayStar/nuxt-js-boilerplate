<template>
	<header>
		<b-container>
			<b-row>
				<p>Theme Select: {{ _themeName }}</p>
			</b-row>
			<b-row>
				<b-button @click="handleGetDtpThemeButtonClick">
					Dtp Theme
				</b-button>
				<b-button @click="handleGetOracleThemeButtonClick">
					Oracle Theme
				</b-button>
			</b-row>
		</b-container>
	</header>
</template>

<script>
import { mapState } from 'vuex';
import { THEME_NAMESPACE, THEME_ACTIONS } from '@/store/theme';

export default {
	name: 'ThemeSelect',
	computed: {
		...mapState(THEME_NAMESPACE, ['_themeName']),
	},
	methods: {
		handleGetDtpThemeButtonClick() {
			this.$store.dispatch(
				`${THEME_NAMESPACE}/${THEME_ACTIONS.GET_DTP_THEME}`
			);
		},
		handleGetOracleThemeButtonClick() {
			this.$store.dispatch(
				`${THEME_NAMESPACE}/${THEME_ACTIONS.GET_ORACLE_THEME}`
			);
		},
	},
};
</script>

<style lang="scss" scoped>
p {
	margin: 0;
}
</style>

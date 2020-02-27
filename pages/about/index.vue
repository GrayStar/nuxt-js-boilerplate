<template>
	<b-container>
		<b-row>
			<b-col>
				<h1>About Index</h1>
				<b-button @click="logout">Logout</b-button>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import { AUTH_NAMESPACE, AUTH_ACTIONS } from '@/store/auth';

export default {
	methods: {
		logout() {
			this.$store.dispatch(`${AUTH_NAMESPACE}/${AUTH_ACTIONS.LOGOUT}`);
		},
	},
	head() {
		return {
			title: 'About page',
		};
	},
	layout: 'default',
	middleware: ['authenticated'],
};
</script>

<style></style>

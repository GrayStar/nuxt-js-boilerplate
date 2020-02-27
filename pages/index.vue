<template>
	<b-container>
		<b-row>
			<b-col sm="12">
				<h1>Index</h1>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-button @click="login">Login</b-button>
				<b-button @click="makeRequest">Test request</b-button>
				<b-button @click="abortRequest">Test abort request</b-button>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<p>Test request response:</p>
				<ul>
					<li
						v-for="currentPokemon in pokemon"
						:key="currentPokemon.id"
					>
						{{ currentPokemon.name }}
					</li>
				</ul>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import { AUTH_NAMESPACE, AUTH_ACTIONS } from '@/store/auth';

export default {
	name: 'Index',
	data() {
		return {
			pokemonRequest: undefined,
			pokemon: [],
		};
	},
	methods: {
		login() {
			this.$store.dispatch(`${AUTH_NAMESPACE}/${AUTH_ACTIONS.LOGIN}`);
		},
		async makeRequest() {
			this.pokemonRequest = this.$httpClient.orchestrateRequest({
				url: '/pokemon',
				method: 'get',
			});

			try {
				const { results } = await this.pokemonRequest.fetch();
				this.pokemon = results;
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log('error', error);
			}
		},
		abortRequest() {
			if (this.pokemonRequest) this.pokemonRequest.abort();
		},
	},
	head() {
		return {
			title: 'index page',
		};
	},
	layout: 'default',
};
</script>

<style lang="scss" scoped></style>

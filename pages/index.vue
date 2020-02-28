<template>
	<b-container>
		<b-row>
			<b-col sm="12">
				<h1>Brand Primary</h1>
				<h2>Brand Secondary</h2>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<ThemeSelect />
				<b-button @click="handleLoginButtonClick">Login</b-button>
				<b-button @click="handleRequestButtonClick">
					Test request
				</b-button>
				<b-button @click="handleAbortButtonClick"
					>Test abort request</b-button
				>
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
// eslint-disable-next-line no-unused-vars
import { css } from 'styled-vue';
import { AUTH_NAMESPACE, AUTH_ACTIONS } from '@/store/auth';
import ThemeSelect from '@/components/theme-select';

export default {
	name: 'Index',
	components: {
		ThemeSelect,
	},
	data() {
		return {
			pokemonRequest: undefined,
			pokemon: [],
		};
	},
	methods: {
		handleLoginButtonClick() {
			this.$store.dispatch(`${AUTH_NAMESPACE}/${AUTH_ACTIONS.LOGIN}`);
		},
		async handleRequestButtonClick() {
			this.pokemonRequest = this.$httpClient.orchestrateRequest({
				url: '/pokemon',
				method: 'get',
			});

			try {
				const { results } = await this.pokemonRequest.fetch();
				this.pokemon = results;
			} catch (error) {
				alert(error.message);
			}
		},
		handleAbortButtonClick() {
			if (this.pokemonRequest) this.pokemonRequest.abort();
		},
	},
	head() {
		return {
			title: 'index page',
		};
	},
	layout: 'default',
	style: css`
		h1 {
			color: ${({ $store }) => $store.state.theme.brandPrimary};
		}
		h2 {
			color: ${({ $store }) => $store.state.theme.brandSecondary};
		}
	`,
};
</script>

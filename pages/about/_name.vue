<template>
	<b-container>
		<b-row>
			<b-col>
				<h1>About _name</h1>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
	head() {
		return {
			title: 'About page with query param _name',
		};
	},
	layout: 'default',
	middleware: ['authenticated'],
};
</script>

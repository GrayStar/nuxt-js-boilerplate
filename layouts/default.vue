<template>
	<div>
		<Header />
		<nuxt />
		<Footer />
	</div>
</template>

<script>
import Header from '@/components/header';
import Footer from '@/components/footer';

export default {
	components: {
		Header,
		Footer,
	},
};
</script>

<style lang="scss">
html {
	height: 100%;
}

body {
	min-height: 100%;
	position: relative;
}
</style>

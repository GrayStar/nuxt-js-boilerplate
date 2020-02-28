<template>
	<div>
		<Header />
		<nuxt />
		<Footer ref="footer" />
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
	mounted() {
		this.setBodyPaddingForFooter();
		window.addEventListener('resize', this.setBodyPaddingForFooter);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.setBodyPaddingForFooter);
	},
	methods: {
		setBodyPaddingForFooter() {
			const footerHeight = this.$refs.footer.$el.clientHeight;
			document.body.style.paddingBottom = `${footerHeight}px`;
		},
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

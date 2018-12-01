<template>
	<v-app dark>
		<nuxt/>
	</v-app>
</template>

<script>
export default {
}
</script>
<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300i,700');
	@import url('https://fonts.googleapis.com/css?family=Fjalla+One&subset=latin-ext');
	@import url('https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700&subset=cyrillic,cyrillic-ext,latin-ext');

	@import "./assets/css/main.scss";
	@import "./assets/css/style.scss";
	@import "./assets/css/custom-style.scss";
    /* For Responsive */
    @import "./assets/css/responsive-style.scss";

	/*Card related*/
	@import "./assets/css/source/csgo.scss";
	@import "./assets/css/source/style.scss";
  @import "./assets/sass/three-dots/three-dots.scss";
	
	.application.theme--dark {
		background: unset;
	}
</style>

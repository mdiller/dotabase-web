<template>
	<div id="app">
		<v-app dark dense>
			<Header></Header>
			<router-view></router-view>
		</v-app>
	</div>
</template>

<script>
import Header from "./components/Header.vue";


export default {
	name: "app",
	components: {
		Header
	}
}
</script>

<style lang="scss">
@import "./styles/base.scss";
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}


</style>

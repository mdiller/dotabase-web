<template>
	<div id="app">
		<router-link to="/">Home</router-link>,
		<router-link to="/responses">Responses</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
import HomePage from "./components/HomePage.vue";


export default {
	name: "app",
	components: {
		HomePage
	}
}
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>

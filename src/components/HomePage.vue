<template>
	<div class="hello">
		<div id="maintitle">
			<h1>Example Title</h1>
		</div>
		<LoadingScreen :screen.sync="loadingscreen"></LoadingScreen>
	</div>
</template>

<script>
import dotabase from "../dotabase.js";
import LoadingScreen from "./LoadingScreen.vue";

export default {
	name: 'HomePage',
	data() {
		return {
			loadingscreen: null
		}
	},
	created() {
		const self = this;
		dotabase.query("SELECT * FROM loadingscreens WHERE hero_ids IS NOT NULL ORDER BY RANDOM() LIMIT 1").then(response => {
			self.loadingscreen = response.rows[0];
			console.log("done");
		});
	},
	components: {
		LoadingScreen
	}
}
</script>

<style lang="scss">
#maintitle {
	text-align: center;

	h1 {
		font-family: "Arial Black", Gadget, sans-serif;
		color: black;
		font-size: 64px;
		font-weight: bold;
		text-shadow: 0 0 5px black, 0 0 10px white;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
}

.loadingscreen-box img {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	animation: fadein 3s ease-out;
}

@keyframes fadein {
	from { opacity: 0; }
	to { opacity: 1; }
}

@media (orientation:portrait) {
	.loadingscreen-box img {
		width: auto !important;
		height: 100%;
		margin: auto;
		left: 50% !important;
		transform: translateX(-50%);
	}

	body {
		overflow-x: hidden;
	}
}
</style>

<template>
	<div class="hello">
		<div id="form">
			<h1>Example Title</h1>
			<img :src="screenUrl">
		</div>
	</div>
</template>

<script>
import dotabase from "../dotabase.js";

export default {
	name: 'HomePage',
	data() {
		return {
			showAlphaBack: false,
			loadingscreen: null
		}
	},
	computed: {
		screenUrl() {
			return this.loadingscreen ? `${dotabase.vpk_path}${this.loadingscreen.thumbnail}` : "";
		}
	},
	created() {
		const self = this;
		dotabase.query("SELECT * FROM loadingscreens WHERE hero_ids IS NOT NULL ORDER BY RANDOM() LIMIT 1").then(response => {
			self.loadingscreen = response.rows[0];
			console.log("done");
		});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
	box-sizing: border-box;
}
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>

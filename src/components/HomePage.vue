<template>
	<div class="hello">
		<div id="form">
			<h1>Example Title</h1>
			<input type="checkbox" id="alphaBack" v-model="showAlphaBack">
			<label for="alphaBack">Checkbox</label>
		</div>
	</div>
</template>

<script>

export default {
	name: 'HomePage',
	data() {
		return {
			showAlphaBack: false
		}
	},
	created() {
		
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

<template>
	<div class="loadingscreen-box">
		<img v-if="screen" :src="vpk_path + screen.thumbnail">
		<img v-if="screen && show_image" :src="vpk_path + screen.image">
	</div>
</template>

<script>
import dotabase from "../dotabase.js";

export default {
	name: 'LoadingScreen',
	props: {
		screen: {
			required: true
		}
	},
	data() {
		return {
			show_image: false,
			vpk_path: dotabase.vpk_path
		}
	},
	computed: {
		screenUrl() {
			return this.screen ? `${dotabase.vpk_path}${this.screen.thumbnail}` : "";
		}
	},
	created() {
		const self = this;
		setTimeout(() => self.show_image = true, 100);
	}
}
</script>

<style lang="scss" scoped>
</style>

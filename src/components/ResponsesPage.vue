<template>
	<div class="hello">
		<div id="form">
			<h1>Example Title</h1>
			<select-search
				:selected_option.sync="hero"
				:options_func="searchHeroes"
				placeholder="Select a Hero">
			</select-search>
		</div>
	</div>
</template>

<script>
import dotabase from '../dotabase.js';

function sortHeroes(heroes) {
	return heroes.sort((a, b) => (a.localized_name > b.localized_name));
}

export default {
	name: 'ResponsesPage',
	data() {
		return {
			hero: null,
			heroes: []
		}
	},
	methods: {
		searchHeroes(input, callback) {
			if (input == "") {
				callback(this.heroes);
				return;
			}
			var result = this.heroes.filter(hero => hero.value.includes(input));
			if (!result) {
				callback([], "None Found");
				return;
			}
			callback(result);
		}
	},
	created() {
		this.hero = {
			id: null,
			text: "None!",
			icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/26/26f39ad1bfbede565f1e7f0399b8afd40d74c74e_full.jpg"
		}
		const self = this;
		dotabase.query("SELECT * FROM heroes").then(response => {
			self.heroes = sortHeroes(response.rows).map(hero => ({
				id: parseInt(hero.id),
				value: hero.aliases,
				text: hero.localized_name,
				icon: dotabase.vpk_path + hero.icon
			}));
		});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

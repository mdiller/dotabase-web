<template>
	<div class="page">
		<div id="title">
			<h1>
				Dota 2 Voice Lines
			</h1>
		</div>
		<form>
			<fieldset>
				<select-search
					:selected_option.sync="vars.voice"
					:options_func="searchVoices"
					placeholder="Select a Hero">
				</select-search>
			</fieldset>
		</form>
		<div>
			<Response v-for="response in responses" :response="response"></Response>
		</div>
	</div>
</template>

<script>
import dotabase from '../dotabase.js';
import Response from "./Response.vue";

export default {
	name: 'ResponsesPage',
	data() {
		return {
			voices: [],
			responses: [],
			vars: {
				text: null,
				voice: null,
				criteria: null
			}
		}
	},
	methods: {
		searchVoices(input, callback) {
			if (input == "") {
				callback(this.voices);
				return;
			}
			var result = this.voices.filter(hero => hero.text.includes(input));
			if (!result) {
				callback([], "None Found");
				return;
			}
			callback(result);
		},
		search() {
			const self = this;
			var fields = "r.name, r.mp3, r.text, r.text_simple, r.criteria, r.pretty_criteria, v.icon as voice_icon";
			dotabase.query(`SELECT ${fields} FROM responses r JOIN voices v ON r.voice_id = v.id LIMIT 50`).then(response => {
				self.responses = response.rows;
			});
		}
	},
	created() {
		this.vars.voice = {
			id: null,
			text: "None!",
			icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/26/26f39ad1bfbede565f1e7f0399b8afd40d74c74e_full.jpg"
		}
		const self = this;
		dotabase.query("SELECT * FROM voices ORDER BY name").then(response => {
			self.voices = response.rows.map(voice => ({
				id: parseInt(voice.id),
				value: voice.name,
				text: voice.name,
				icon: dotabase.vpk_path + voice.icon
			}));
		});
		this.search();
	},
	components: {
		Response
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

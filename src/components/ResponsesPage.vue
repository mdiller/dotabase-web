<template>
	<div class="page">
		<div id="title">
			<h1>
				Dota 2 Voice Lines
			</h1>
		</div>
		<form>
			<fieldset>
				<v-text-field 
					v-model="vars.text"
					class="ma-0"
					value=""
					placeholder="Search for text..."
					:hide-details="true"
					:clearable="true">
				</v-text-field>
				<v-autocomplete 
					v-model="vars.voice"
					:items="voices"
					item-text="text"
					item-avatar="icon"
					item-value="id"
					:hide-details="true"
					:clearable="true"
					:loading="voices.length == 0"
					placeholder="Select a hero..."
					dense>
					<template slot="item" slot-scope="data">
						<v-list-tile-avatar size="24">
							<img :src="data.item.icon">
						</v-list-tile-avatar>
						<v-list-tile-content>
							{{data.item.text}}
						</v-list-tile-content>
					</template>
					<template slot="selection" slot-scope="data">
						<v-list-tile-avatar size="24">
							<img :src="data.item.icon">
						</v-list-tile-avatar>
						<v-list-tile-content>
							{{data.item.text}}
						</v-list-tile-content>
					</template>
				</v-autocomplete>
				<v-autocomplete 
					v-model="vars.criteria"
					:items="criteria"
					item-text="text"
					item-value="value"
					:hide-details="true"
					:clearable="true"
					:loading="criteria.length == 0"
					placeholder="Select a criteria..."
					dense>
				</v-autocomplete>
			</fieldset>
		</form>
		<div>
			<Response v-for="response in responses" :response="response"></Response>
		</div>
	</div>
</template>

<script>
import dotabase from '../dotabase.js';
import utils from '../utils.js';
import Response from "./Response.vue";

export default {
	name: 'ResponsesPage',
	data() {
		return {
			voices: [],
			responses: [],
			criteria: [],
			vars: {
				text: "",
				voice: null,
				criteria: null
			}
		}
	},
	watch: {
		vars: {
			handler() {
				this.debouncedSearch();
			},
			deep: true
		}
	},
	methods: {
		search() {
			const self = this;
			var fields = "r.name, r.mp3, r.text, r.text_simple, r.criteria, r.pretty_criteria, v.icon as voice_icon";
			var query = `SELECT ${fields} FROM responses r JOIN voices v ON r.voice_id = v.id`;
			var conditions = [ "text != ''" ];
			if (this.vars.text != "") {
				// Yes i know theres sql insertion issues here. It doesnt matter, the db is readonly anyway
				conditions.push(`r.text_simple like '% ${utils.cleanText(this.vars.text)} %'`);
			}
			if (this.vars.voice != null) {
				conditions.push(`r.voice_id == ${this.vars.voice}`);
			}
			if (this.vars.criteria != null) {
				conditions.push(`(r.criteria LIKE '${this.vars.criteria}%' OR r.criteria LIKE '%|${this.vars.criteria}%')`);
			}
			query += ` WHERE ${conditions.join(" AND ")}`;
			if (this.vars.text != "") {
				query += ` ORDER BY LENGTH(text)`;
			}
			else {
				query += ` ORDER BY RANDOM()`;
			}
			query += ` LIMIT 50`;
			dotabase.query(query).then(response => {
				if (!response.success) {
					console.error(`error on query: "${response.query}"`)
					alert(`search query errored: ${response.error}`);
				}
				self.responses = response.rows;
			});
		}
	},
	created() {
		this.debouncedSearch = utils.debounce(this.search, 200);
		const self = this;
		dotabase.query("SELECT * FROM voices ORDER BY name").then(response => {
			self.voices = response.rows.map(voice => ({
				id: parseInt(voice.id),
				text: voice.name,
				icon: dotabase.vpk_path + voice.icon
			}));
		});
		dotabase.query("SELECT * FROM criteria WHERE matchkey = 'Concept'").then(response => {
			self.criteria = response.rows.map(crit => ({
				value: crit.name,
				text: crit.pretty
			}));
		});
		this.debouncedSearch();
	},
	components: {
		Response
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

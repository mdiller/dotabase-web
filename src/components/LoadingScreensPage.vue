<template>
	<div class="page">
		<div id="title">
			<h1>
				Dota 2 Loading Sreens
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
					v-model="vars.hero"
					:items="heroes"
					item-text="text"
					item-avatar="icon"
					item-value="id"
					:hide-details="true"
					:clearable="true"
					:loading="heroes.length == 0"
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
			</fieldset>
		</form>
		<v-container grid-list-sm fluid>
			<v-layout row wrap>
				<v-flex
					v-for="screen in screens"
					xs3
					d-flex>
					<v-card flat tile class="d-flex">
						<v-img
							:src="vpkpath(screen.image)"
							:lazy-src="vpkpath(screen.thumbnail)"
							:aspect-ratio="128/64"
							:style="{ backgroundColor: screen.color, cursor: 'pointer' }"
							@click="selectScreen(screen)">
						</v-img>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-dialog
			:value="selected_screen">
			<v-container
				v-if="selected_screen"
				fluid fill-height
				pa-0>
				<v-layout justify-center align-center>
					<v-carousel
						:hide-delimiters="true"
						:cycle="false"
						:value="selected_screen.index">
						<v-carousel-item
							v-for="(screen, i) in screens"
							:key="i"
							:src="vpkpath(screen.image)"
							:lazy-src="vpkpath(screen.thumbnail)"
							:aspect-ratio="128/64"
							lazy>
							<v-container fill-height full-width ma-0 grid-list-xl>
								<v-layout align-top row wrap>
									<v-flex xs10>
										<span class="display-1">{{screen.name}}</span>
									</v-flex>
									<v-layout ma-0 xs2 align-top justify-end>
										<v-btn icon @click="selected_screen = null">
											<v-icon>mdi-close</v-icon>
										</v-btn>
									</v-layout>
								</v-layout>
							</v-container>
						</v-carousel-item>
					</v-carousel>
				</v-layout>
			</v-container>
		</v-dialog>
	</div>
</template>

<script>
import dotabase from '../dotabase.js';
import utils from '../utils.js';
import LoadingScreen from "./LoadingScreen.vue";


function createHeroIdWhereClause(hero_id) {
	var parts = [];
	parts.push(`hero_ids LIKE '${hero_id}'`)
	parts.push(`hero_ids LIKE '${hero_id}|%'`)
	parts.push(`hero_ids LIKE '%|${hero_id}'`)
	parts.push(`hero_ids LIKE '%|${hero_id}|%'`)
	return `(${parts.join(" OR ")})`;
}

export default {
	name: 'LoadingScreensPage',
	data() {
		return {
			screens: [],
			heroes: [],
			vars: {
				text: "",
				hero: null,
				color: null
			},
			selected_screen: null
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
		vpkpath(path) {
			return dotabase.vpk_path + path;
		},
		selectScreen(screen) {
			this.selected_screen = screen;
		},
		search() {
			const self = this;
			this.vars.text = this.vars.text || "";
			var query = `SELECT * FROM loadingscreens`;
			var conditions = [];
			if (this.vars.text != "") {
				conditions.push(`name like '%${utils.cleanText(this.vars.text)}%'`);
			}
			if (this.vars.hero != null) {
				conditions.push(createHeroIdWhereClause(this.vars.hero));
			}
			if (conditions.length > 0){
				query += ` WHERE ${conditions.join(" AND ")}`;
			}

			if (this.vars.color != null) {
				var hsv = convert.hex.hsv(this.vars.color);
				console.log(hsv);
				var hue = hsv[0] * (256.0 / 360.0);
				var sat = hsv[1] * (256.0 / 100.0);
				var val = hsv[2] * (256.0 / 100.0);
				if (sat < 20)
					query += ` ORDER BY (ABS(value - ${val}) + saturation)`;
				else
					query += ` ORDER BY ABS(hue - ${hue})`;
			}
			else if (this.vars.hero != null) {
				query += ` ORDER BY LENGTH(hero_ids), category`
			}
			else {
				query += ` ORDER BY creation_date DESC`;
			}
			query += ` LIMIT 102`;
			dotabase.query(query).then(response => {
				if (!response.success) {
					console.error(`error on query: "${response.query}"`)
					alert(`search query errored: ${response.error}`);
				}
				var rows = response.rows;
				rows = rows.map((s, i) => {
					s.index = i;
					return s;
				});
				self.screens = rows;
			});
		}
	},
	created() {
		this.debouncedSearch = utils.debounce(this.search, 200);
		const self = this;
		dotabase.query("SELECT * FROM heroes ORDER BY name").then(response => {
			self.heroes = response.rows.map(hero => ({
				id: parseInt(hero.id),
				text: hero.localized_name,
				icon: dotabase.vpk_path + hero.icon
			}));
		});
		this.debouncedSearch();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-dialog .container {
	max-width: none;
}
</style>

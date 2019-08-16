<template>
	<div class="page">
		<div id="contentbox">
			<v-data-table
				item-key="name"
				:loading="items.length == 0"
				:pagination.sync="table_pagination"
				:headers="columns"
				:items="items">
				<template v-slot:items="props">
					<td 
						:key="column.value"
						v-for="column in columns"
						v-html="localize_value(props.item, column)">
					</td>
				</template>
				<v-progress-linear v-slot:progress color="blue" indeterminate>
					
				</v-progress-linear>
			</v-data-table>
		</div>
	</div>
</template>

<script>
import dotabase from "../dotabase.js";

var attr_icons = {
	"strength": dotabase.vpk_path + "/panorama/images/primary_attribute_icons/primary_attribute_icon_strength_psd.png",
	"intelligence": dotabase.vpk_path + "/panorama/images/primary_attribute_icons/primary_attribute_icon_intelligence_psd.png",
	"agility": dotabase.vpk_path + "/panorama/images/primary_attribute_icons/primary_attribute_icon_agility_psd.png"
}

var hero_columns = [
	{
		text: "Hero",
		value: "localized_name",
		func: (hero) => `<div><img src="${dotabase.vpk_path + hero.icon}">${hero.localized_name}</div>`
	},
	{
		text: "Primary Attribute",
		value: "attr_primary",
		func: (hero) => `<img src="${attr_icons[hero.attr_primary]}">`
	},
	{
		text: "Base Strength",
		value: "attr_strength_base"
	},
	{
		text: "Strength Gain",
		value: "attr_strength_gain"
	},
	{
		text: "Base Intelligence",
		value: "attr_intelligence_base"
	},
	{
		text: "Intelligence Gain",
		value: "attr_intelligence_gain"
	},
	{
		text: "Base Agility",
		value: "attr_agility_base"
	},
	{
		text: "Agility Gain",
		value: "attr_agility_gain"
	},
	{
		text: "Base Health Regen",
		value: "base_health_regen"
	},
	{
		text: "Base Armor",
		value: "base_armor"
	},
	{
		text: "Base Movement",
		value: "base_movement"
	},
	{
		text: "Turn Rate",
		value: "turn_rate"
	},
	{
		text: "Attack Range",
		value: "attack_range"
	},
	{
		text: "Projectile Speed",
		value: "attack_projectile_speed"
	},
	{
		text: "Attack Damage Min",
		value: "attack_damage_min"
	},
	{
		text: "Attack Damage Max",
		value: "attack_damage_max"
	},
	{
		text: "Attack Point",
		value: "attack_point"
	},
	{
		text: "Attack Rate",
		value: "attack_rate"
	}
];


export default {
	name: 'ExplorerPage',
	data() {
		return {
			items: [],
			columns: hero_columns,
			table_pagination: {
				rowsPerPage: -1
			}
		}
	},
	methods: {
		vpkpath(path) {
			return dotabase.vpk_path + path;
		},
		localize_value(item, column) {
			return "func" in column ? column.func(item) : item[column.value];
		}
	},
	// computed: {
	// 	headers() {
	// 		if (this.items == null || this.items.length == 0) {
	// 			return [];
	// 		}
	// 		return Object.keys(this.items[0]).map(key => {
	// 			return {
	// 				text: key,
	// 				value: key
	// 			}
	// 		}).filter(h => h.value != "json_data")
	// 	}
	// },
	created() {
		const self = this;
		dotabase.query("SELECT * FROM heroes").then(response => {
			self.items = response.rows;
		});
	}
}
</script>

<style lang="scss" scoped>

.page /deep/ #contentbox {
	max-height: calc(100vh - 50px - 50px);

	& > div {
		max-height: inherit;
		display: flex;
		flex-direction: column;
	}

	.v-table__overflow {
		overflow-y: auto;
	}

	td:first-child div {
		line-height: 24px;
		height: 24px;
		position: relative;
		padding-left: 30px;

		& > img {
			position: absolute;
			left: 0;
		}
	}

	td,
	th {
		padding: 0px 16px;
	}

	td img {
		width: 24px;
		height: 24px;
	}
	// sticky headers

	thead {
		position: sticky;
		top: 0;
		background-color: #212121;
		z-index: 100;
	}

	td:first-child,
	th:first-child {
		position: sticky;
		left: 0;
		white-space: nowrap;
		// background-clip: padding-box;
	}

	th:first-child {
		z-index: 100;
		background-color: #212121;
	}

	td:first-child {
		background-color: #424242;
	}

	// shadows

	td:first-child::after {
		display: block;
		content: '';
		position: absolute;
		width: 8px;
		height: calc(100% + 1px);
		top: 0px;
		right: -8px;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
	}
}

// th:not(:first-child)::after {
// 	display: block;
// 	content: '';
// 	position: absolute;
// 	height: 8px;
// 	width: 100%;
// 	left: 0px;
// 	bottom: -8px;
// 	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
// 	z-index: -1;
// }

</style>

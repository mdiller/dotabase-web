<template>
	<div class="response">
		<div class="soundtitle">
			<span>
				<span class="link-menu-list">
					<a class="link-button" :href="vpk_path + response.mp3">
						<img src="/images/link.svg"/>
					</a>
					<a class="link-button" :href="vpk_path + response.mp3" download>
						<img src="/images/download.svg"/>
					</a>
				</span>
				<span class="speaker" @mouseup="speakerClicked" @touchend="speakerClicked" @touchstart="(e) => e.preventDefault()">
					<svg viewBox="0 0 100 100">
						<path d="M 0,0 L 100,50 0,100 Z">
							<!-- <animate 
								attributeName="d" 
								dur="200ms" 
								fill="freeze"
								begin="indefinite"
								:ref="(element) => { this.animate_element = element }"
								:from="this.state.playStatus == Sound.status.PLAYING ? play_path : pause_path"
								:to="this.state.playStatus != Sound.status.PLAYING ? play_path : pause_path" /> -->
						</path>
					</svg>
<!-- 					<Sound
						:url="vpk_path + response.mp3" 
						:playStatus="this.state.playStatus"
						:onFinishedPlaying="this.audioFinished" /> -->
				</span>
			</span>
			<span>
				<img :src="vpk_path + response.voice_icon" />
				{{criteria_title}}
			</span>
		</div>
		<div>
			{{response.text}}
		</div>
	</div>
</template>

<script>
import dotabase from "../dotabase.js";

export default {
	name: 'Response',
	props: {
		response: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			vpk_path: dotabase.vpk_path
		}
	},
	computed: {
		criteria_title() {
			var lengthLimit = 30;
			var crits = this.response.pretty_criteria.split("|");
			var title = crits[0];
			if (title.length > lengthLimit)
				title = title.substring(0, lengthLimit - 3) + "...";
			return title;
		}
	},
	methods: {
		speakerClicked() {

		}
	}
}
</script>

<style lang="scss" scoped>
div.response {
	max-width: 400px;
	margin: 10px auto;
	text-align: center;
}

div.soundtitle {
	position: relative;
	color: var(--itemtitle-color);
	font-weight: bold;
	font-family: "consolas";
	height: 32px;
	line-height: 24px;
	padding: 4px;

	> span {
		vertical-align: top;
		display: inline-block;
		display: -moz-inline-stack;
		font-size: 17.5px;
		position: relative;
	}

	> span > img {
		margin: 0 5px;
	}

	svg,
	> span > img
	{
		width: 24px;
		height: 24px;
	}
}

.speaker {
	position: relative;

	* {
		user-select: none;
	}
}

.link-button {
	display: inline-block;
	height: 32px;
	width: 32px;
	transition: all 0.5s ease;

	&:hover {
		transform: rotate(360deg) scale(1.1);
	}

	> img {
		display: flex;
		height: 100%;
		width: 100%;
	}
}

img {
	vertical-align: middle;
}

.link-menu-list {
	position: absolute;
	top: 50%;
	transform: translate(-100%, -50%);
	display: flex;
	pointer-events: none;

	a {
		margin-right: 10px;
	}
}

span:hover > .link-menu-list {
	visibility: visible;
	pointer-events: all;
}

span:not(:hover) > .link-menu-list > * {
	width: 0;
	height: 0;
	transform: rotate(180deg) scale(0.0);
	opacity: 0.0;

	&:last-child {
		margin-right: 0;
	}
}
</style>
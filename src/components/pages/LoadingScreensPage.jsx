import React, { Component } from 'react';
import convert from 'color-convert';
import HeroSelect from '../HeroSelect.jsx';
import ColorSelect from '../ColorSelect.jsx';
import LoadingScreen from '../LoadingScreen.jsx';
import dotabase from '../../Dotabase.js';
import '../../styles/loadingscreens.css';

function cleanText(text) {
	text = text.trim();
	text = text.toLowerCase();
	text = text.replace(/[^a-z0-9\s]/, '')
	return text;
}

function createHeroIdWhereClause(hero_id) {
	var parts = [];
	parts.push(`hero_ids LIKE '${hero_id}'`)
	parts.push(`hero_ids LIKE '${hero_id}|%'`)
	parts.push(`hero_ids LIKE '%|${hero_id}'`)
	parts.push(`hero_ids LIKE '%|${hero_id}|%'`)
	return `(${parts.join(" OR ")})`;
}

function createLoadingScreensQuery(vars) {
	var query = `SELECT * FROM loadingscreens`;
	var conditions = [];
	if (vars.text != "") {
		conditions.push(`name like '%${cleanText(vars.text)}%'`);
	}
	if (vars.hero != null) {
		conditions.push(createHeroIdWhereClause(vars.hero));
	}
	if (conditions.length > 0){
		query += ` WHERE ${conditions.join(" AND ")}`;
	}

	if (vars.color != null) {
		var hsv = convert.hex.hsv(vars.color);
		console.log(hsv);
		var hue = hsv[0] * (256.0 / 360.0);
		var sat = hsv[1] * (256.0 / 100.0);
		var val = hsv[2] * (256.0 / 100.0);
		if (sat < 20)
			query += ` ORDER BY (ABS(value - ${val}) + saturation)`;
		else
			query += ` ORDER BY ABS(hue - ${hue})`;
	}
	else if (vars.hero != null) {
		query += ` ORDER BY LENGTH(hero_ids), category`
	}
	else {
		query += ` ORDER BY creation_date DESC`;
	}
	query += ` LIMIT 102`;
	return query;
}

class LoadingScreensPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			hero: null,
			color: null,
			loadingscreens: [],
			selected_screen: null,
			selected_screen_index: null
		};
		this.timer_id = null;

		this.updateScreens = this.updateScreens.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeTarget = this.handleChangeTarget.bind(this);
	}
	get nextScreen() {
		// The screen to the right of this one
		if(!this.state.selected_screen || this.state.selected_screen_index + 1 >= this.state.loadingscreens.length)
			return null;
		return this.state.loadingscreens[this.state.selected_screen_index + 1];
	}
	get previousScreen() {
		// The screen to the left of this one
		if(!this.state.selected_screen || this.state.selected_screen_index - 1 < 0)
			return null;
		return this.state.loadingscreens[this.state.selected_screen_index - 1];
	}
	componentDidMount() {
		this.updateScreens();
	}
	handleChange(key, value) {
		this.setState({[key]: value});
		this.startDelayedUpdate();
	}
	handleChangeTarget(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.handleChange(name, value);
	}
	onSubmit(event){
		event.preventDefault();
		this.updateScreens();
	}
	updateScreens() {
		const self = this;
		dotabase.query(createLoadingScreensQuery(this.state)).then(response => {
			self.setState({ loadingscreens: response.rows })
		})
	}
	startDelayedUpdate() {
		const self = this;
		clearTimeout(this.timer_id);
		this.timer_id = setTimeout(() => self.updateScreens(), 300);
	}
	selectScreen(screen) {
		this.setState({ 
			selected_screen: screen,
			selected_screen_index: screen ? this.state.loadingscreens.indexOf(screen) : null
		})
	}
	render() {
		return (
			<div>
				<div id={"title"}>
					<h1>
						Loading Screens
					</h1>
				</div>
				<form onSubmit={this.onSubmit}>
					<fieldset>
						<input
							name="text"
							type="text"
							value={this.state.text}
							onChange={this.handleChangeTarget} />
						<HeroSelect
							name="hero"
							value={this.state.hero}
							onChange={this.handleChange} />
						<ColorSelect
							name="color"
							value={this.state.color}
							onChange={this.handleChange} />
					</fieldset>
				</form>
				<div id="screensbox">
					{this.state.loadingscreens.map(screen => (
						<span key={screen.id} onClick={() => this.selectScreen(screen)}>
							<img src={dotabase.vpk_path + screen.thumbnail} />
						</span>
					))}
				</div>
				{
					this.state.selected_screen ? (
						<span id="selectedscreen">
							<h2>{this.state.selected_screen.name}</h2>
							<LoadingScreen screen={this.state.selected_screen} />
							{this.previousScreen ? (
								<svg id="arrowleft" viewBox="0 0 1000 1000" onClick={() => this.selectScreen(this.previousScreen)}>
									<path d="M965.1 360.2l-400 401c-17.9 17.9-41.7 25.4-65.2 24-23.4 1.4-47.2-6.1-65.1-24l-400-401c-33.2-33.3-33.2-87.4 0-120.7s87.1-33.3 120.4 0L500 585.2l344.8-345.7c33.2-33.3 87.1-33.3 120.4 0s33.1 87.4-.1 120.7z"/>
								</svg>
							) : null}
							{this.nextScreen ? (
								<svg id="arrowright" viewBox="0 0 1000 1000" onClick={() => this.selectScreen(this.nextScreen)}>
									<path d="M965.1 360.2l-400 401c-17.9 17.9-41.7 25.4-65.2 24-23.4 1.4-47.2-6.1-65.1-24l-400-401c-33.2-33.3-33.2-87.4 0-120.7s87.1-33.3 120.4 0L500 585.2l344.8-345.7c33.2-33.3 87.1-33.3 120.4 0s33.1 87.4-.1 120.7z"/>
								</svg>
							) : null}
							<svg id="closebutton" viewBox="0 0 96 96" onClick={() => this.selectScreen(null)}>
								<path d="M96 14L82 0 48 34 14 0 0 14l34 34L0 82l14 14 34-34 34 34 14-14-34-34z"/>
							</svg>
						</span>
					) : null
				}
			</div>
		);
	}
}

export default LoadingScreensPage;

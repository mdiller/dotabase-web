import React, { Component } from 'react';
import HeroSelect from '../HeroSelect.jsx';
import dotabase from '../../Dotabase.js';
import '../../styles/loadingscreens.css';


function cleanText(text) {
	text = text.trim();
	text = text.toLowerCase();
	text = text.replace(/[^a-z0-9\s]/, '')
	return text;
}

function createLoadingScreensQuery(vars) {
	var query = `SELECT * FROM loadingscreens`;
	var conditions = [];
	if (vars.text != "") {
		conditions.push(`name like '%${cleanText(vars.text)}%'`);
	}
	if (vars.hero != null) {
		conditions.push(`hero_id == ${vars.hero}`);
	}
	if (conditions.length > 0){
		query += ` WHERE ${conditions.join(" AND ")}`;
	}

	query += ` ORDER BY creation_date`;
	query += ` LIMIT 102`;
	return query;
}

class ResponsesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			hero: null,
			loadingscreens: [],
			selectedscreen: null
		};
		this.timer_id = null;

		this.updateScreens = this.updateScreens.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeTarget = this.handleChangeTarget.bind(this);
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
			console.log(response.query);
			self.setState({ loadingscreens: response.rows })
		})
	}
	startDelayedUpdate() {
		const self = this;
		clearTimeout(this.timer_id);
		this.timer_id = setTimeout(() => self.updateScreens(), 300);
	}
	selectScreen(screen) {
		this.setState({ selectedscreen: screen })
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
					this.state.selectedscreen ? (
						<span id="selectedscreen" onClick={() => this.selectScreen(null)}>
							<img src={dotabase.vpk_path + this.state.selectedscreen.image} />
						</span>
					) : null
				}
			</div>
		);
	}
}

export default ResponsesPage;

import React, { Component } from 'react';
import VoiceSelect from './VoiceSelect.jsx';
import dotabase from '../Dotabase.js';
import Response from './Response.jsx';
import Header from './Header.jsx';
import '../styles/responses.css';


function cleanText(text) {
	text = text.trim();
	text = text.toLowerCase();
	text = text.replace(/[^a-z0-9\s]/, '')
	return text;
}

function createResponseQuery(vars) {
	var fields = "r.name, r.mp3, r.text, r.text_simple, r.criteria, r.pretty_criteria, v.icon as voice_icon";
	var query = `SELECT ${fields} FROM responses r JOIN voices v ON r.voice_id = v.id`;
	var conditions = [ "text != ''" ];
	if (vars.text != "") {
		conditions.push(`text_simple like '% ${cleanText(vars.text)} %'`);
	}
	if (vars.voice != null) {
		conditions.push(`voice_id == ${vars.voice}`)
	}
	query += ` WHERE ${conditions.join(" AND ")}`

	query += ` LIMIT 50`;
	return query;
}

class ResponsesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			voice: null,
			responses: []
		};
		this.timer_id = null;

		this.updateResponses = this.updateResponses.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeTarget = this.handleChangeTarget.bind(this);
	}
	componentDidMount() {
		this.updateResponses();
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
		this.updateResponses();
	}
	updateResponses() {
		const self = this;
		dotabase.query(createResponseQuery(this.state)).then(response => {
			console.log(response.query);
			self.setState({ responses: response.rows })
		})
	}
	startDelayedUpdate() {
		const self = this;
		clearTimeout(this.timer_id);
		this.timer_id = setTimeout(() => self.updateResponses(), 300);
	}
	render() {
		return (
			<div>
				<Header />
				<div id={"title"}>
					<h1>
						Dota 2 Voice Lines
					</h1>
				</div>
				<form onSubmit={this.onSubmit}>
					<fieldset>
						<input
							name="text"
							type="text"
							value={this.state.text}
							onChange={this.handleChangeTarget} />
						<VoiceSelect
							name="voice"
							value={this.state.voice}
							onChange={this.handleChange} />
					</fieldset>
				</form>
				<div>
					{this.state.responses.map(response => (<Response key={response.fullname} response={response}/>))}
				</div>
			</div>
		);
	}
}

export default ResponsesPage;

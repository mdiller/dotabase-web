import React, { Component } from 'react';
import Select from 'react-select';
import VoiceSelect from '../VoiceSelect.jsx';
import dotabase from '../../Dotabase.js';
import Response from '../Response.jsx';
import '../../styles/responses.scss';


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
		conditions.push(`voice_id == ${vars.voice}`);
	}
	if (vars.criteria != null) {
		conditions.push(`(criteria LIKE '${vars.criteria}%' OR criteria LIKE '%|${vars.criteria}%')`);
	}
	query += ` WHERE ${conditions.join(" AND ")}`;

	if (vars.text != "") {
		query += ` ORDER BY LENGTH(text)`;
	}
	else {
		query += ` ORDER BY RANDOM()`;
	}
	query += ` LIMIT 50`;
	return query;
}

class ResponsesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			voice: null,
			criteria: null,
			criteria_options: null,
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
		const self = this;
		dotabase.query("SELECT * FROM criteria WHERE matchkey = 'Concept'").then(rows => {
			self.setState({ criteria_options: 
				rows.map(crit => ({
					value: crit.name,
					label: crit.pretty
				}))
			});
		});
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
		dotabase.query(createResponseQuery(this.state)).then(rows => {
			// console.log(response.query);
			self.setState({ responses: rows })
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
						<Select
							name="criteria"
							placeholder="Select a criteria..."
							value={this.state.criteria}
							onChange={(value) => this.handleChange("criteria", value && value.value)}
							options={this.state.criteria_options || []}
						/>
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

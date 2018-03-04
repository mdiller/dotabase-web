import React, { Component } from 'react';
import Select from 'react-select';
import dotabase from '../Dotabase.js';
import SelectIconOption from './SelectIconOption.jsx';
import SelectIconValue from './SelectIconValue.jsx';


function sortVoices(voices) {
	return voices.sort((a, b) => {
		if ((a.hero_id && b.hero_id) || !(a.hero_id || b.hero_id)) {
			return a.name > b.name;
		}
		else {
			return b.hero_id ? 1 : -1;
		}
	});
}


class VoiceSelect extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this)
	}
	componentDidMount() {
		const self = this;
		dotabase.query("SELECT * FROM voices").then(response => {
			self.setState({ options: 
				sortVoices(response.rows).map(voice => ({
					value: parseInt(voice.id),
					label: voice.name,
					icon: dotabase.vpk_path + voice.icon
				}))
			});
		});
	}
	get name() {
		return this.props.name || "voice"
	}
	handleChange(value) {
		this.props.onChange(this.name, value && value.value);
	}
	render() {
		return (
			<Select
				name={this.name}
				placeholder="Select a hero / announcer..."
				value={this.props.value}
				onChange={this.handleChange}
				optionComponent={SelectIconOption}
				valueComponent={SelectIconValue}
				options={this.state && this.state.options || []}
			/>
		);
	}
}

export default VoiceSelect;

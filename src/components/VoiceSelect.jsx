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
		this.state = { selectedOption: null };
	}
	componentDidMount() {
		const self = this;
		dotabase.query("SELECT * FROM voices").then(response => {
			self.setState({ options: 
				sortVoices(response.rows).map(voice => ({
					value: voice.id,
					label: voice.name,
					icon: dotabase.vpk_path + voice.icon
				}))
			});
		});
	}
	handleChange(option) {
		this.setState({ selectedOption: option });
	}
	render() {
		const { selectedOption } = this.state;
		const value = selectedOption && selectedOption.value;

		return (
			<Select
				name="form-field-name"
				placeholder="Select a hero / announcer..."
				value={value}
				onChange={this.handleChange}
				optionComponent={SelectIconOption}
				valueComponent={SelectIconValue}
				options={this.state && this.state.options || []}
			/>
		);
	}
}

export default VoiceSelect;

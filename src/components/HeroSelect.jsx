import React, { Component } from 'react';
import Select from 'react-select';
import dotabase from '../Dotabase.js';
import SelectIconOption from './SelectIconOption.jsx';
import SelectIconValue from './SelectIconValue.jsx';


function sortHeroes(heroes) {
	return heroes.sort((a, b) => (a.localized_name > b.localized_name));
}

class HeroSelect extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this)
		this.state = { selectedOption: null };
	}
	componentDidMount() {
		const self = this;
		dotabase.query("SELECT * FROM heroes").then(response => {
			self.setState({ options: 
				sortHeroes(response.rows).map(voice => ({
					value: voice.id,
					label: voice.localized_name,
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
				placeholder="Select a hero..."
				value={value}
				onChange={this.handleChange}
				optionComponent={SelectIconOption}
				valueComponent={SelectIconValue}
				options={this.state && this.state.options || []}
			/>
		);
	}
}

export default HeroSelect;

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
		this.state = {
			options: null
		};
		this.handleChange = this.handleChange.bind(this)
		this.getPropsValue = this.getPropsValue.bind(this)
	}
	componentDidMount() {
		const self = this;
		dotabase.query("SELECT * FROM heroes").then(response => {
			self.setState({ options: 
				sortHeroes(response.rows).map(hero => ({
					id: parseInt(hero.id),
					value: hero.aliases,
					label: hero.localized_name,
					icon: dotabase.vpk_path + hero.icon
				}))
			});
		});
	}
	get name() {
		return this.props.name || "hero";
	}
	getPropsValue() {
		if (this.props.value == null || !this.state.options)
			return null;
		return this.state.options.find(op => op.id == this.props.value).value
	}
	handleChange(value) {
		this.props.onChange(this.name, value && value.id);
	}
	render() {
		return (
			<Select
				name={this.name}
				placeholder="Select a hero..."
				value={this.getPropsValue()}
				onChange={this.handleChange}
				optionComponent={SelectIconOption}
				valueComponent={SelectIconValue}
				options={this.state && this.state.options || []}
			/>
		);
	}
}

export default HeroSelect;

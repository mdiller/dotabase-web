import React, { Component } from 'react';

class ColorSelect extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this)
		this.clearColor = this.clearColor.bind(this)
	}
	get name() {
		return this.props.name || "color";
	}
	handleChange(event) {
		const target = event.target;
		console.log("hi");
		this.props.onChange(this.name, target && target.value);
	}
	clearColor() {
		this.props.onChange(this.name, null);
	}
	render() {
		return (
			<div className="input-color-wrapper" style={{backgroundColor: this.props.value ? this.props.value : "#ffffff"}}>
				{!this.props.value ? (
					<span className="placeholder">
						Select a color...
					</span>
				) : null}
				<input 
					name={this.name}
					value={this.props.value ? this.props.value : "#e42727"}
					onChange={this.handleChange}
					type="color" />
				{this.props.value ? (
					<span className="clearbutton" onClick={this.clearColor}>
						×
					</span>
				) : null}
			</div>
		);
	}
}

export default ColorSelect;
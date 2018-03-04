import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';


class SelectIconOption extends Component {
	constructor(props){
		super(props);
		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleMouseEnter = this.handleMouseEnter.bind(this)
		this.handleMouseMove = this.handleMouseMove.bind(this)
	}
	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	}
	handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
	}
	handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	}
	render() {
		return (
			<div className={this.props.className}
			onMouseDown={this.handleMouseDown}
			onMouseEnter={this.handleMouseEnter}
			onMouseMove={this.handleMouseMove}
			title={this.props.option.title}>
				<img src={this.props.option.icon} />
				{this.props.children}
			</div>
		);
	}
}

SelectIconOption.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	isFocused: PropTypes.bool,
	isSelected: PropTypes.bool,
	onFocus: PropTypes.func,
	onSelect: PropTypes.func,
	option: PropTypes.object.isRequired,
};

export default SelectIconOption;

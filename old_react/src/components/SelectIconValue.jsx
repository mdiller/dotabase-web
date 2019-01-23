import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';


const stringOrNode = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.node,
]);

class SelectIconValue extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					<img src={this.props.value.icon} />
					{this.props.children}
				</span>
			</div>
		);
	}
}

SelectIconValue.propTypes = {
	children: PropTypes.node,
	placeholder: stringOrNode,
	value: PropTypes.object
};

export default SelectIconValue;

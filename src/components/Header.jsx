import React, { Component } from 'react';
import '../styles/header.css';

var transition_time = 0.5;

var trap1_style = {
	transition: `transform ${transition_time}s ease`,
	transform: `translateY(-95%)`
};

var trap2_style = {
	transition: `transform ${transition_time}s ${transition_time}s ease`,
	transform: `translateY(-95%)`
};

var img_style = {
	width: `66px`,
	height: `66px`,
	margin: `auto`,
	position: `absolute`,
	top: `47%`,
	left: `50%`,
	transition: `transform ${transition_time}s ${transition_time * 2}s ease`,
	transform: `translate(-50%, -200%)`
};

class Response extends Component {
	componentDidMount() {
		trap1_style.transform = "translateY(0)";
		trap2_style.transform = "translateY(0)";
		img_style.transform = "translate(-50%, -50%)";
	}
	render() {
		var { response } = this.props;
		return (
			<div id="header">
				<div id="logobox">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174 61">
						<path fill="url(#grad1)" style={trap1_style} d="M 0,0 L 14,54 160,54 174,0 Z"/>
						<path fill="url(#grad2)" style={trap2_style} d="M 22,0 L 28,60 146,60 152,0 Z"/>
						<defs>
							<linearGradient id="grad1" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stopColor="#151313"/>
								<stop offset="100%" stopColor="#232123"/>
							</linearGradient>
							<radialGradient id="grad2">
								<stop offset="0%" stopColor="#413b3b"/>
								<stop offset="100%" stopColor="#232020"/>
							</radialGradient>
						</defs>
					</svg>
					<img style={img_style} src="images/dota.png" />
				</div>
			</div>
		);
	}
}

export default Response;
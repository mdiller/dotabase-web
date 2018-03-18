import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

class Header extends Component {
	render() {
		return (
			<div id="header">
				<div id="logobox">
					<svg xmlns="http://www.w3.org/2000/svg" width="195" height="68" viewBox="0 0 174 61">
						<path
							id="placeholder"
							fill="transparent"
							d="M 0,0 L 0,61 174,61 174,0 Z" />
						<path 
							id="trap1" 
							fill="url(#grad1)"  
							d="M 0,0 L 14,54 160,54 174,0 Z" />
						<path 
							id="trap2" 
							fill="url(#grad2)" 
							d="M 22,0 L 28,60 146,60 152,0 Z" />

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
					<Link to='/'>
						<img src="images/dota.svg" />
					</Link>
				</div>
			</div>
		);
	}
}

export default Header;
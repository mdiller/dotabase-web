import React, { Component } from 'react';
import VoiceSelect from '../VoiceSelect.jsx';
import dotabase from '../../Dotabase.js';
import '../../styles/responses.css';

class HomePage extends Component {
	render() {
		return (
			<div>
				<div id={"title"}>
					<h1>
						Dotabase
					</h1>
				</div>
			</div>
		);
	}
}

export default HomePage;

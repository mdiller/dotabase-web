import React, { Component } from 'react';
import VoiceSelect from './VoiceSelect.jsx';
import dotabase from '../Dotabase.js';

console.time("query table");
var res = dotabase.query("SELECT * FROM responses LIMIT 50");
console.timeEnd("query table");


class HomePage extends Component {
	render() {
		return (
			<div>
				<div id={"header"}>
					<h1>
						Dotabase
					</h1>
				</div>
				<VoiceSelect />
			</div>
		);
	}
}

export default HomePage;

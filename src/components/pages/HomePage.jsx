import React, { Component } from 'react';
import VoiceSelect from '../VoiceSelect.jsx';
import dotabase from '../../Dotabase.js';
import '../../styles/homepage.css';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingscreen: null
		};
	}
	componentDidMount() {
		const self = this;
		dotabase.query("SELECT * FROM loadingscreens ORDER BY RANDOM() LIMIT 1").then(response => {
			self.setState({ loadingscreen: response.rows[0] });
		});
	}
	render() {
		return (
			<div>
				<div id={"title"}>
					<h1>
						Dotabase
					</h1>
				</div>
				<img 
					id="backgroundimage" 
					src={this.state.loadingscreen ? dotabase.vpk_path + this.state.loadingscreen.image : ""} />
			</div>
		);
	}
}

export default HomePage;

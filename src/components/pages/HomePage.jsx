import React, { Component } from 'react';
import VoiceSelect from '../VoiceSelect.jsx';
import dotabase from '../../Dotabase.js';
import LoadingScreen from '../LoadingScreen.jsx';
import '../../styles/homepage.scss';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingscreen: null
		};
	}
	componentDidMount() {
		const self = this;
		dotabase.query("SELECT * FROM loadingscreens WHERE hero_ids IS NOT NULL ORDER BY RANDOM() LIMIT 1").then(rows => {
			self.setState({ loadingscreen: rows[0] });
		});
	}
	render() {
		return (
			<div>
				<div id={"maintitle"}>
					<h1>
						Dotabase
					</h1>
				</div>
				{this.state.loadingscreen ? (
					<LoadingScreen screen={this.state.loadingscreen} />
				) : null}
			</div>
		);
	}
}

export default HomePage;

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
		dotabase.query("SELECT * FROM loadingscreens ORDER BY RANDOM() LIMIT 1").then(response => {
			self.setState({ loadingscreen: response.rows[0] });
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

import React, { Component } from 'react';
import dotabase from '../Dotabase.js';

class LoadingScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show_image: false
		};
		this.loadImageSoon = this.loadImageSoon.bind(this);
	}
	componentDidMount() {
		this.loadImageSoon();
	}
	componentWillReceiveProps(nextProps) {
		this.loadImageSoon();
	}
	loadImageSoon() {
		const self = this;
		this.setState({ show_image: false });
		setTimeout(() => self.setState({ show_image: true }), 100);
	}
	render() {
		var { screen } = this.props;
		return (
			<div className="loadingscreen-box">
				<img src={dotabase.vpk_path + screen.thumbnail}/>
				{this.state.show_image ? (<img src={dotabase.vpk_path + screen.image}/>) : null}
			</div>
		);
	}
}

export default LoadingScreen;
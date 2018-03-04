import React, { Component } from 'react';
import HomePage from './components/HomePage.jsx';
import dotabase from './Dotabase.js';
import './styles/base.css';

class App extends Component {
	render() {
		return (
			<div>
				<HomePage />
			</div>
		);
	}
}

export default App;

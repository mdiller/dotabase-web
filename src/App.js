import React, { Component } from 'react';
import ResponsesPage from './components/ResponsesPage.jsx';
import dotabase from './Dotabase.js';
import './styles/base.css';

class App extends Component {
	render() {
		return (
			<div>
				<ResponsesPage />
			</div>
		);
	}
}

export default App;

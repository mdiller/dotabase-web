import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './components/pages/HomePage.jsx';
import ResponsesPage from './components/pages/ResponsesPage.jsx';
import Header from './components/Header.jsx';

import './styles/base.css';

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/responses' component={ResponsesPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
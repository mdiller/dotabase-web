import React, { Component } from 'react';


class Response extends Component {
	render() {
		var { response } = this.props;
		return (<div>{response.text}</div>);
	}
}

export default Response;
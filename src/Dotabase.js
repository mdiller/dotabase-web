class Dotabase {
	constructor() {
		this.vpk_path = "https://dotabase.dillerm.io/vpk";
	}

	// Executes a query and converts the result to json
	query(query) {
		console.log(query);
		query = encodeURIComponent(query);
		return fetch(`https://dotabase.dillerm.io/api/sql?q=${query}`).then(response => {
			return response.json();
		}).catch(error => {
			console.error(error);
			console.log(`response: ${responseText}`);
		});
	}
}

const dotabase = new Dotabase();

export default dotabase;
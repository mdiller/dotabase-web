class Dotabase {
	constructor() {
		this.vpk_path = "http://dotabase.dillerm.io/dota-vpk";
	}

	// Executes a query and converts the result to json
	query(query) {
		console.log(query);
		query = encodeURIComponent(query);
		return fetch(`./dotabase.php?q=${query}`).then(response => {
			return response.json();
		}).catch(error => {
			console.error(error);
			console.log(`response: ${responseText}`);
		});
	}
}

const dotabase = new Dotabase();

export default dotabase;
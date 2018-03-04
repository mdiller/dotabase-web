class Dotabase {
	constructor() {
		this.vpk_path = "http://dotabase.dillerm.io/dota-vpk";
	}

	// Executes a query and converts the result to json
	query(query) {
		return fetch(`./dotabase.php?q=${query}`).then(response => {
			return response.json();
		});
	}
}

const dotabase = new Dotabase();

export default dotabase;
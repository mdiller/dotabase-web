// const apiLocation = ".";
const apiLocation = "http://localhost:82";

class Dotabase {
	constructor() {
		this.vpk_path = "http://dotabase.dillerm.io/dota-vpk";
	}

	// Executes a query and converts the result to json
	query(query) {
		query = encodeURIComponent(query);
		return fetch(`${apiLocation}/dotabase.php?q=${query}`).then(response => {
			return response.json();
		}).catch(error => {
			console.log(`error: ${error}`);
			console.log(error)
		});
	}
}

const dotabase = new Dotabase();

export default dotabase;
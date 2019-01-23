<?php
header("Content-type: application/json");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if(isset($_GET["q"])) {
	$query = $_GET["q"];
}
else{
	$query = "SELECT * FROM heroes";
}

$database = new PDO("sqlite:dotabase.db");

$statement = $database->query($query);
$success = True;

$results = array();
if ($statement == False) {
	$success = False;
	$error = $database->errorInfo()[2];
}
else {
	while($row=$statement->fetch(PDO::FETCH_ASSOC)){
		$results[] = $row;
	}
}


$result = array(
	"query" => $query,
	"success" => $success,
	"count" => count($results),
	"rows" => $results
);
if (!$success) {
	$result["error"] = $error;
}
echo json_encode($result);

?>
<?php
header("Content-type: application/json");

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
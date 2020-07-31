<?php
session_start();
if (!isset($_SESSION['loggedin'])) {
	header("Location: index.php");
	exit();
}
$DATABASE_HOST = "localhost";
$DATABASE_USER = "wpirtle2";
$DATABASE_PASS = "wpirtle2";
$DATABASE_NAME = "wpirtle2";
$conn = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if ($conn->connect_error) {
    exit("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT save FROM accounts WHERE username=?");
$stmt->bind_param("s", $_SESSION['name']);
$stmt->execute();
$result = $stmt->get_result();
$resultarray = $result->fetch_array(MYSQLI_ASSOC);
echo $resultarray['save'];
$stmt->close();
$conn->close();
?>
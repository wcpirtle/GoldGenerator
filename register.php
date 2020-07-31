<?php
session_start();
if (isset($_SESSION['loggedin'])) {
	header("Location: home.php");
	exit();
}
$DATABASE_HOST = "localhost";
$DATABASE_USER = "wpirtle2";
$DATABASE_PASS = "wpirtle2";
$DATABASE_NAME = "wpirtle2";
$conn = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_1PASS, $DATABASE_NAME);
if ($conn->connect_error) {
   exit("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT id, password FROM accounts WHERE username = ?");
$stmt->bind_param("s", $_POST['username']);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
	header("Location: registration.php?registrationFailed=true");
} else {
    $stmt2 = $conn->prepare("INSERT INTO accounts (username, password, email, save) VALUES (?, ?, ?, ?)");
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $defaultSave = "";
    $stmt2->bind_param("ssss", $_POST['username'], $password, $_POST['email'], $defaultSave);
    $stmt2->execute();
	header("Location: index.php?registrationSuccess=true");
	$stmt2->close();
}
$stmt->close();
$conn->close();
?>
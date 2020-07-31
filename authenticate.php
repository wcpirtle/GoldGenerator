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
$conn = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if ($conn->connect_error) {
    exit("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT id, password FROM accounts WHERE username = ?");
$stmt->bind_param("s", $_POST['username']);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    $stmt->bind_result($id, $password);
    $stmt->fetch();
    if (password_verify($_POST['password'], $password)) {
        session_regenerate_id();
        $_SESSION['loggedin'] = true;
        $_SESSION['name'] = $_POST['username'];
        $_SESSION['id'] = $id;
        header("Location: home.php");
    } else {
        header("Location: index.php?loginFailed=true");
    }
} else {
    header("Location: index.php?loginFailed=true");
}
$stmt->close();
$conn->close();
?>
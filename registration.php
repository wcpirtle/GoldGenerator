<?php
session_start();
if (isset($_SESSION['loggedin'])) {
	header("Location: home.php");
	exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Gold Generator Registration</title>
</head>

<body>
    <h1>Register</h1>
    <form action="register.php" method="post" autocomplete="off">
        <input type="text" name="username" placeholder="Username" id="username" required>
        <input type="password" name="password" placeholder="Password" id="password" required>
        <input type="email" name="email" placeholder="Email" id="email" required>
        <input type="submit" value="Register">
        <?php 
        if (isset($_GET["registrationFailed"])) {
            echo "Username already exists. Please choose another.";
        }
        ?>
    </form>
</body>

</html>
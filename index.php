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
    <title>Gold Generator Login</title>
</head>

<body>
    <?php 
    if (isset($_GET["registrationSuccess"])) {
        echo "You may now login.";
    }
    ?>
    <h1>Login</h1>
    <form action="authenticate.php" method="post" autocomplete="off">
        <input type="text" name="username" placeholder="Username" id="username" required>
        <input type="password" name="password" placeholder="Password" id="password" required>
        <input type="submit" value="Login">    
        <?php 
        if (isset($_GET["loginFailed"])) {
            echo "Wrong Username or password.";
        }
        ?>
    </form>
    <a href="registration.php">Register</a>
</body>

</html>
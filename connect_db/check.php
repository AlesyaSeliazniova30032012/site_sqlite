<?php
    $login = filter_var(trim($_POST ['username']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST ['username']), FILTER_SANITIZE_STRING);
    $password = filter_var(trim($_POST ['username']), FILTER_SANITIZE_STRING);

    /* кэширование для пароля */
    $password = md5($password.qazwsxedv);

    $conn = new mysqli('localhost', 'root', 'root', 'users.db');
    if ($conn -> connect_error) {
      die ("Ошибка подключения: ".$conn -> connect_error);
    }

    $conn -> query ("INSERT INTO `users` (`login`, `email`, `password`) VALUES ('login', 'email', 'password')");
    $conn -> close();

    $url = '../reg_valid.php';
    header ('Location: '.$url);
    exit();
 ?>

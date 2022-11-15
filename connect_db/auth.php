<?php
    $login = filter_var(trim($_POST ['username']), FILTER_SANITIZE_STRING);
    $password = filter_var(trim($_POST ['username']), FILTER_SANITIZE_STRING);

    /* кэширование для пароля */
    $password = md5($password.qazwsxedv);

    $conn = new mysqli('localhost', 'root', 'root', 'users.db');
    if ($conn -> connect_error) {
      die ("Ошибка подключения: ".$conn -> connect_error);
    }

    $result -> query ("SELECT * FROM `users` WHERE `login`='$login' AND `password`='$password'");
    $user = $result -> fetch_assoc();

    if (count($users) == 0) {
        echo "Такой пользователь не найден";
    }

    $url = '../reg_valid.php';
    header ('Location: '.$url);
    exit();
 ?>

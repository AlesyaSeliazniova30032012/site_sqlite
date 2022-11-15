<?php
    /* создание соединения */
    $conn = new mysqli('localhost', 'root', 'root', 'users.db');
    /* проверка соединения */
    if ($conn -> connect_error) {
      die ("Ошибка подключения: ".$conn -> connect_error);
    }

    /* создание базы данных */
    CREATE DATABASE IF NOT EXISTS 'registration.db' DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
    USE 'registration.db';

    /* создание таблицы 'users' в базе данных */
    $sql = "CREATE TABLE IF NOT EXISTS `users` (
      `id` int NOT NULL UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      `username` int(16) NOT NULL,
      `email` varchar(45) NOT NULL,
      `password` varchar(60) NOT NULL,
      `verified` enum('N', 'Y') NOT NULL DEFAULT 'N',
      `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      `confirmaton_token` varchar(100) DEFAULT NULL
    ) DEFAULT CHARACTER SET utf8";

    /* проверка создания таблицы */
    $db -> query ($sql);
    $db = new mysqli('localhost', 'root', 'root', 'users.db');
    if (!$db) {
      die ("Ошибка создания таблицы: ".$db -> connect_errno);
    }
    mysqli_query ($db, 'SET NAMES utf8')

    $db -> close();
 ?>

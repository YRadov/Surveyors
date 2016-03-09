<?php

defined('LES') or die('Access denied');

// модель
define('MODEL', 'model/model.php');

// контроллер
//define('CONTROLLER', 'controller/controller.php');

// функции
define('FUNCTIONS', 'functions/functions.php');

// сервер БД
define('HOST', 'localhost');

// пользователь
define('USER', 'root');

// пароль
define('PASS', '');

// БД
define('DB', 'les2');

// соль
define('SOLT', '');

// email администратора
define('ADMIN_EMAIL', '');


//подключение к базе данных
$mysqli = new mysqli(HOST, USER, PASS, DB);
if ($mysqli->connect_errno)
{
    echo "Не удалось подключиться к БД: " . $mysqli->connect_error;
}

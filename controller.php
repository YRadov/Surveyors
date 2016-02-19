<?php
session_start();
//unset ($_SESSION['data']);
//session_destroy();
$num = $_POST['log_num'];
$_SESSION['data'][$num] = [
    'len'=>$_POST['log_len'],
    'diam'=>$_POST['log_diam'],
    'val'=>$_POST['log_val']
];

$message = "Данные приняты на сервере";
$res = [];
$res = [
    "message" => $message,
];
echo json_encode($res);
exit;

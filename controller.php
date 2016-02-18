<?php
$message = "Данные приняты на сервере";
$res = [];
$res = [
    "message" => $message,
    "n" => $_POST['n'],
    "v" => $_POST['v']
];
echo json_encode($res);
exit;

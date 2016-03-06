<?php
defined('LES') or die('Access denied');

function print_arr($arr)
{
    echo '<pre>';
    print_r($arr);
    echo '</pre>';
}

function sendRespons($data = '')
{
    header('Access-Control-Allow-Origin:*');
    $message = "ДАННЫЕ ПОЛУЧЕНЫ";
    $res = [];
    $res = [
        "message"    => $message,
        "loading_id" => $data
    ];
    echo json_encode($res);
    exit;

}

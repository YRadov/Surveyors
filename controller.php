<?php
session_start();
// запрет прямого обращения
define('LES', TRUE);
//session_destroy();
//unset ($_SESSION);

include_once 'config.php';
include_once FUNCTIONS;
include_once MODEL;

//данные всей загрузки
if($_POST['save_loading'] == 'yes')
{
    //$_SESSION = $_POST['DATA'];
    $LOADING = [];
    $LOADING = $_POST['DATA'];
    saveLoading($LOADING);


    //ответ с сервера на ajax запрос
    sendRespons();
}//данные всей загрузки

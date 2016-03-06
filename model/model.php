<?php
defined('LES') or die('Access denied');
//**********************************************************************************
/**
 * Пример использования MySQLi
 */
//$res = $mysqli->query("SELECT 'choices to please everybody.' AS _msg FROM DUAL");
//$row = $res->fetch_assoc();
//echo $row['_msg'];
/**
 * Подготовленные запросы
 */
//$sql = "INSERT INTO users(name, email, age) VALUES(?, ?, ?)";
//// Уважаемый сервер, вот запрос - разбери его
//$stmt = mysqli_prepare($link, $sql);
//// Уважаемый сервер, вот параметры для запроса
//mysqli_stmt_bind_param($stmt, "ssi", $name, $email, $age);
//// А теперь, исполни подготовленный запрос с переданными
//параметрами
//mysqli_stmt_execute($stmt);
//mysqli_stmt_close($stmt);
//$query = "INSERT INTO yuradov_orders (`customer_id`, `date`,`total_sum`, `dostavka_id`, `coment`)
//                VALUES ($customer_id, NOW(),$total_sum, $dostavka_id, '$coment')";
//**********************************************************************************

/**
 * Сохранение данных загруженного контейнера в бд
 * @param $LOADING []
 *
 */
function saveLoading($LOADING)
{
    //сохранение данных текущего контейнера
    //(вернуть id)
    $number         = $LOADING['contNum'];
    $gross_weight   = $LOADING['contGross'];
    $tare_weight    = $LOADING['contTare'];
    $payload_weight = $LOADING['contPay'];
    $line           = $LOADING['contLine'];
    $employer       = $LOADING['Employer'];

    $sql = "INSERT INTO containers(
                            number,
                            gross_weight,
                            tare_weight,
                            payload_weight,
                            line,
                            employer
                            )
             VALUES(?, ?, ?, ?, ?, ?)";



    $_SESSION = $LOADING;

    //сохранение массива бревен
//    $partia = [];
//    $partia = $LOADING['Partia'];
}
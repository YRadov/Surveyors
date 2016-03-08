<?php
defined('LES') or die('Access denied');

/**
 * Сохранение данных загруженного контейнера в бд
 * @param $LOADING []
 *
 */
function saveLoading($LOADING)
{
    //тестовый показ данных
    $_SESSION = $LOADING;

    global $mysqli;

    //сохранение данных текущего контейнера
    //(вернуть id)
    $number         = $LOADING['contNum'];
    $gross_weight   = $LOADING['contGross'];
    $tare_weight    = $LOADING['contTare'];
    $payload_weight = $LOADING['contPay'];
    $line           = $LOADING['contLine'];
    $employer       = $LOADING['Employer'];


    $query = "INSERT INTO containers(
                            number,
                            gross_weight,
                            tare_weight,
                            payload_weight,
                            line,
                            employer_id
                            )
             VALUES (?, ?, ?, ?, ?, ?)";


    /* создаем подготавливаемый запрос */
    $stmt = $mysqli->prepare($query);

    $stmt->bind_param(
        'siiisi',
            $number,
            $gross_weight,
            $tare_weight,
            $payload_weight,
            $line,
            $employer
    );

    $_SESSION['container_id'] = 5;

      /* выполнение подготовленного выражения  */
      $stmt->execute();

      $container_id = $stmt->insert_id;
      $_SESSION['container_id'] = $container_id;

    /* закрываем запрос */
    $stmt->close();
 //*************************************************************************************
     //СОХРАНЕНИЕ ВСЕЙ ПАРТИИ БРЕВЕН
     $sql = "INSERT INTO logs(
                             container_id,
                             num,
                             diam,
                             val,
                             len
                             )
              VALUES(?, ?, ?, ?, ?)";

     /* создаем подготавливаемый запрос */
     $stmt = $mysqli->prepare($sql);
     $stmt->bind_param(
         'siiid',
         $cont_id,
         $num,
         $diam,
         $val,
         $len
     );
     $i = 0;
     foreach($LOADING['Partia'] as $key)
     {
         //нулевой элемент пропускаем
         if($key == 0)
         {
             $i++;
             continue;
         }
         $cont_id = $container_id;
         $num  = $i;
         $diam = $key['Diam'];
         $val  = $key['Val'];
         $len  = $key['L'];
         /* выполнение подготовленного выражения  */
         $stmt->execute();
         $i++;
     }

     /* закрываем запрос */
     $stmt->close();

     /* закрываем соединение */
     $mysqli->close();

}
//**********************************************************************************************************************
/**
 * НАЧАЛО ПОЛУЧЕНИЕ ТЕКУЩИХ ЗАГРУЖЕННЫХ КОНТЕЙНЕРОВ
 * @return $current_loadings []
*/
function getCurrentLoadings()
{
    global $mysqli;

    //текущая дата - 1 день
    $yesterday_date = date("Y-m-d", time()-24*60*60);
    $query = "SELECT c.id, c.number, c.line, c.date, e.name
              FROM containers c, emploers e
              WHERE e.id = c.employer_id
              AND c.date > '{$yesterday_date}'
              ORDER BY c.date DESC ";

    $result = $mysqli->query($query);

    $current_loadings = [];
    /* извлечение ассоциативного массива */
    while ($row = $result->fetch_assoc()) {
        $current_loadings[] = $row;
    }

    /* удаление выборки */
    $result->free_result();

    return $current_loadings;
}//КОНЕЦ ПОЛУЧЕНИЕ ТЕКУЩИХ ЗАГРУЖЕННЫХ КОНТЕЙНЕРОВ
//**********************************************************************************************************************
/**
 * НАЧАЛО ПОЛУЧЕНИЕ ВСЕХ ЗАГРУЖЕННЫХ КОНТЕЙНЕРОВ
 * @return $current_loadings []
*/
function getAllLoadings()
{
    global $mysqli;

    $query = "SELECT c.id, c.number, c.line, c.date, e.name
              FROM containers c, emploers e
              WHERE e.id = c.employer_id
              ORDER BY c.date DESC ";

    $result = $mysqli->query($query);

    $all_loadings = [];
    /* извлечение ассоциативного массива */
    while ($row = $result->fetch_assoc()) {
        $all_loadings[] = $row;
    }

    /* удаление выборки */
    $result->free();

    return $all_loadings;
}//КОНЕЦ ПОЛУЧЕНИЕ ВСЕХ ЗАГРУЖЕННЫХ КОНТЕЙНЕРОВ
//**********************************************************************************************************************
/**
 * НАЧАЛО ПОЛУЧЕНИЕ ДАННЫХ КОНТЕЙНЕРА ПО id
 */
function getOneLoading($id)
{
    global $mysqli;
    //данные контейнера
    $query = "SELECT c.id, c.number, c.gross_weight,
                      c.tare_weight, c.payload_weight,
                      c.line, c.date, e.name
              FROM containers c, emploers e
              WHERE c.id = $id
              AND e.id = c.employer_id";

    //echo $query;

    $result = $mysqli->query($query);

    $one_loadings = [];
    $one_loadings[] = $result->fetch_assoc();

    /* удаление выборки */
    $result->free();

    //данные по грузу в контейнере
    $query = "SELECT num, diam, val, len
              FROM logs
              WHERE container_id = $id
              ORDER BY num ASC ";
    $result = $mysqli->query($query);

    /* извлечение ассоциативного массива */
    while ($row = $result->fetch_assoc()) {
        $one_loadings[] = $row;
    }

    /* удаление выборки */
    $result->free();

    return $one_loadings;
}
//КОНЕЦ ПОЛУЧЕНИЕ ДАННЫХ КОНТЕЙНЕРА ПО id
//**********************************************************************************************************************

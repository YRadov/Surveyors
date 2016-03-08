<?php
require_once 'controller.php';
echo '$_SESSION:<br>';
print_arr($_SESSION);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>АДМИН</title>
    <!-- [favicon] begin -->
    <link rel="shortcut icon" type="image/x-icon" href="img/el.jpg" />
    <link rel="icon" type="image/x-icon" href="img/el.jpg" />
    <!-- [favicon] end -->


    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href="css/drova.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<h1>АДМИН-ПАНЕЛЬ<h1>
<h3>Текущие загруженные контейнеры<h3>
<table class="table table-res table-striped table-bordered">
    <tr class="tab-header">
        <th>№</th>
        <th>№ Контейнера</th>
        <th>Линия</th>
        <th>Дата загрузки</th>
        <th>Фамилия</th>
        <th>id в БД</th>
    </tr>

    <?php
    $i=0;
        foreach($_SESSION['current_loadings'] as $key):
            $i++;?>

            <tr>
                <td><?=$i;?></td>
                <td><?=$key['number'];?></td>
                <td><?=$key['line'];?></td>
                <td><?=$key['date'];?></td>
                <td><?=$key['name'];?></td>
                <td><?=$key['id'];?></td>
            </tr>
        <?php endforeach;?>

</table>
<h3>Данные загрузки<h3>
        <!--НАЧАЛО ДАННЫЕ КОНТЕЙНЕРА-->
        <div class="table-responsive container-data container-one-admin">
            <table class="table table-bordered table-container-data">
                <tr>
                    <td>Дата</td>
                    <td>
                        <?=$_SESSION['one_loading'][0]['date'];?>
                    </td>
                </tr>
                <tr>
                    <td>№</td>
                    <td>
                        <?=$_SESSION['one_loading'][0]['number'];?>
                    </td>
                </tr>
                <tr>
                    <td>Линия</td>
                    <td>
                        <?=$_SESSION['one_loading'][0]['line'];?>
                    </td>
                </tr>
                <tr>
                    <td>GROSS WT.</td>
                    <td>
                        <?=$_SESSION['one_loading'][0]['gross_weight'];?>
                    </td>
                </tr>
                <tr>
                    <td>TARE WT.</td>
                    <td>
                        <?=$_SESSION['one_loading'][0]['tare_weight'];?>
                    </td>
                </tr>
                <tr>
                    <td>PAYLOAD</td>
                    <td>
                        <?=$_SESSION['one_loading'][0]['payload_weight'];?>
                    </td>
                </tr>
                <tr>
                    <td>Грузил</td>
                    <td>
                        <?=$_SESSION['one_loading'][0]['name'];?>
                    </td>
                </tr>
            </table>
        </div><!-- .container-data -->
        <!--КОНЕЦ ДАННЫЕ КОНТЕЙНЕРА-->
<table class="table table-res table-striped table-bordered">
    <tr class="tab-header">
        <th>№</th>
        <th>Длина, м</th>
        <th>Диаметр, см</th>
        <th>Объем бревна, см3</th>
        <th>Общий объем, см3</th>
    </tr>

    <?php
    $totalV = 0;
    $i = 0;
    foreach($_SESSION['one_loading'] as $key):?>
        <?php //пропускаем первую строку с данными контейнера
        if(!$i){
            $i++;
            continue;
        }?>
        <tr>
            <td><?=$key['num'];?></td>
            <td><?=$key['len'];?></td>
            <td><?=$key['diam'];?></td>
            <td><?=$key['val'];?></td>
            <td><?=$totalV += $key['val'];?></td>
        </tr>
    <?php $i++; endforeach;?>

    <tr>
        <td><b>Всего бревен</b></td>
        <td><b><?=$i-1;?> шт.</b></td>
        <td colspan="2"><b>Общий объем</b></td>
        <td><b><?=$totalV;?> см3</b></td>
    </tr>

</table>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>-->
    <script src="js/jquery-1.12.0.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script>


    </script>

</body>
</html>
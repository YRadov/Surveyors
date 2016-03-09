<?php
require_once 'controller.php';
//echo '$_SESSION:<br>';
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
<div class="container">
<h1>АДМИН-ПАНЕЛЬ<h1>
<h2>Все загруженные контейнеры</h2>
<table class="table table-res table-striped table-bordered">
    <tr class="tab-header">
        <th>№</th>
        <th>№ Контейнера</th>
        <th>Линия</th>
        <th>Дата загрузки</th>
        <th>Фамилия</th>
        <th>Подробно</th>
    </tr>

    <?php
    $i=0;
        foreach($_SESSION['all_loadings'] as $key):
            $i++;?>

            <tr>
                <td><?=$i;?></td>
                <td><?=$key['number'];?></td>
                <td><?=$key['line'];?></td>
                <td><?=$key['date'];?></td>
                <td><?=$key['name'];?></td>
                <td>
                    <button id="<?=$key['id'];?>" class="btn btn-primary btn-view">
                        ПОКАЗАТЬ
                    </button>
                </td>
            </tr>
        <?php endforeach;?>

</table>

<?php if($_SESSION['one_loading'][0]['number']):?>
<div class="container one-cont">
        <h2>Подробно контейнер № <?=$_SESSION['one_loading'][0]['number'];?></h2>
        <!--НАЧАЛО ДАННЫЕ КОНТЕЙНЕРА-->

            <div class="table-responsive container-data container-one-admin">
            <table class="table table-bordered table-container-data">
                <tr>
                    <td colspan="2">
                        <button class="btn btn-success reset-cont">
                            ЗАКРЫТЬ
                        </button>
                    </td>
                </tr>
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
                    <td>ПОРОДА</td>
                    <td>
                        <?=$_SESSION['one_loading'][0]['poroda'];?>
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
        <?php if($key['len']):?>
        <tr>
            <td><?=$key['num'];?></td>
            <td><?=$key['len'];?> м</td>
            <td><?=$key['diam'];?> см</td>
            <td><?=$key['val'];?> см3</td>
            <td><?=$totalV += $key['val'];?> см3</td>
        </tr>
    <?php $i++; endif; endforeach;?>

    <tr>
        <td><b>Всего бревен</b></td>
        <td><b><?=$i-1;?> шт.</b></td>
        <td>
            <button class="btn btn-success reset-cont">
                ЗАКРЫТЬ
            </button>
        </td>
        <td><b>Общий объем</b></td>
        <td><b><?=$totalV;?> см3</b></td>
    </tr>

</table>
</div><!-- .container-->
<?php endif;?>

</div><!-- .container -->
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<!--    <script src="js/jquery-1.12.0.min.js"></script>-->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/admin.js"></script>
    <script>
    </script>

</body>
</html>
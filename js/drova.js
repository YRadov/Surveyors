//************************************************
//*******ПЕРЕМЕННЫЕ*******************************
//************************************************
//очистка памяти
//localStorage.clear();
//showWebStoreData();

//ДАННЫЕ ПО КОНТЕЙНЕРУ
var contNum   = '';
var contLine  = '';
var contGross = '';
var contTare  = '';
var contPay   = '';

//ПОРОДА ДЕРЕВА
var contPoroda = '';

//ДАННЫЕ ПО РАБОТНИКУ(ФИО)
var Employer = '';

//Длина загружаемого леса
var Len = 0;

//Номер бревна попорядку
var N = 1;

//Номер последнего бревна в стыке
var Styk = [];
var styk_i = 0;
//Диаметр бревна
var D = 0;

//Объем бревна заданного диаметра
var V = 0;

//Общий массив загрузки
var Partia = [];

//WEB ХРАНИЛИЩЕ
var WebStore = [];
var storeNum =  0;
var storeLen =  0;
var storeDiam = 0;
var storeVal =  0;

//Общий объем загруженных бревен
var totalV = 0;
$('#total_val').val(0);
$('#total_val_top').val(0);

//Для таблицы объем загруженных бревен
var tempTotalVal = 0;

//Максимальный объем
var maxV = 0;
$('#max-val').val(0);
//старое
//var maxV = 36200;
//$('#max-val').val(36200);

//Осталось загрузить
var restVal = 0;
$('#max-val-rest').val($('#max-val').val());

//Когда предупреждать о близком конце загрузки
var attention = 2000;//cm3

/**
 * Если есть данные в хранилище, инициализируем
 * все переменные сохраненными данными
 */
//if( localStorage.getItem("storeN")
//&& parseInt(localStorage.getItem("storeN")) !== 0)
if( localStorage.getItem("storeN"))
{
    errorMessages('Данные восстановлены');
    console.log('!!!В ХРАНЛИЩЕ ЕСТЬ СОХРАНЕННЫЕ ДАННЫЕ!!!');

    //сохраненные данные контейнера
    contNum = localStorage.getItem('contNum');
    contLine = localStorage.getItem('contLine');
    contGross = localStorage.getItem('contGross');
    contTare = localStorage.getItem('contTare');
    contPay = localStorage.getItem('contPay');
    contPoroda = localStorage.getItem('contPoroda');
    Employer = localStorage.getItem('Employer');
    $('#cont-num').val(contNum);
    $('#cont-line').val(contLine);
    $('#gross-wt').val(contGross);
    $('#tare-wt').val(contTare);
    $('#pay-wt').val(contPay);
    $('#cont-poroda').val(contPoroda);
    $('#emp-name').val(Employer);

    //заполнение из хранилища массива загрузки
    //console.log('В массиве: '+localStorage.getItem("storeN"));
    var loaded_size = parseInt(localStorage.getItem("storeN"));
    for(var i = 1; i <= loaded_size; i++)
    {
        storeNum =  'Num'  + i;
        storeLen =  'Len'  + i;
        storeDiam = 'Diam' + i;
        storeVal =  'Val'  + i;

        //восстанавливаем данные из хранилища
        Partia[i]= {
            "L"   : parseFloat(localStorage.getItem(storeLen)),
            "Diam": parseInt(localStorage.getItem(storeDiam)),
            "Val" : parseInt(localStorage.getItem(storeVal))
        };

        totalV += parseInt(localStorage.getItem(storeVal));

        N++;

    }//for

    //вывод номера следующего бревна
    $('.num').text('№ ' + N );

    //вывод общего объема
    $('#total_val').val(totalV.toLocaleString());
    $('#total_val_top').val(totalV.toLocaleString());

    //вывод максимального объема и остатка
    $('#max-val').val(localStorage.getItem('maxVal'));
    totalRest();

    //вывод таблицы результатов
    //showDataAfterSave();
}
else
{
    console.log('!!!В ХРАНЛИЩЕ НЕТ ДАННЫХ!!!');

    //КОЛИЧЕСТВО БРЕВЕН В WEB-ХРАНИЛИЩЕ
    localStorage.setItem("storeN",0);

}

//Массивы соответствий D:V для разных длин
var L_3_8 = [];
var L_5_8 = [];
var LM_2_9 = [];
var LM_3_7 = [];
var LM_3_8 = [];
var LM_3_9 = [];
//ТАБЛИЦЫ СООТВЕТСТВИЙ ДИАМЕТРОВ И ОБЪЕМОВ
LM_2_9 = {
    "12":0,
    "14":50,
    "16":66,
    "18":83,
    "20":103,
    "22":125
};
LM_3_7 = {
    "12":48,
    "14":66,
    "16":87,
    "18":100,
    "20":134,
    "22":164
};
LM_3_8 = {
    "12":50,
    "14":68,
    "16":90,
    "18":113,
    "20":139,
    "22":170
};
LM_3_9 = {
    "12":0,
    "14":70,
    "16":92,
    "18":117,
    "20":143,
    "22":173
};
L_3_8 = {
    "14":68,
    "16":90,
    "18":113,
    "20":139,
    "22":170,
    "24":200,
    "26":240,
    "28":270,
    "30":310,
    "32":360,
    "34":410,
    "36":460,
    "38":510,
    "40":550,
    "42":610,
    "44":670,
    "46":730,
    "48":790,
    "50":860,
    "52":940,
    "54":1020,
    "56":1100,
    "58":1180,
    "60":1270,
    "62":1350,
    "64":1440,
    "66":1530,
    "68":1620,
    "70":1710,
    "72":1810,
    "74":1910,
    "76":2020,
    "78":2120,
    "80":2230,
    "82":2350,
    "84":2460,
    "86":2580,
    "88":2700,
    "90":2830,
    "92":2960,
    "94":3080,
    "96":3220,
    "98":3350,
    "100":3490
};
L_5_8 = {
    "14":118,
    "16":149,
    "18":186,
    "20":220,
    "22":270,
    "24":320,
    "26":380,
    "28":430,
    "30":500,
    "32":570,
    "34":640,
    "36":710,
    "38":790,
    "40":870,
    "42":960,
    "44":1050,
    "46":1150,
    "48":1250,
    "50":1360,
    "52":1470,
    "54":1590,
    "56":1710,
    "58":1840,
    "60":1970,
    "62":2110,
    "64":2240,
    "66":2360,
    "68":2490,
    "70":2630,
    "72":2770,
    "74":2920,
    "76":3080,
    "78":3260,
    "80":3430,
    "82":3610,
    "84":3780,
    "86":3970,
    "88":4170,
    "90":4370,
    "92":4580,
    "94":4790,
    "96":5010,
    "98":5230,
    "100":5450
};


//Набор диаметра с собственной клавиатуры
var Diam = '';
//Набор диаметра с клавиатуры телефона
var temp_diam;

//************************************************
//*******ФУНКЦИИ**********************************
//************************************************

//Вывод всех параметров
function showParam(){
    console.log (
        'N = ' + N  + '\n' +
        'Len = ' + Len + '\n' +
        'D = ' + D + '\n' +
        'V = ' + V + '\n' +
        'totalV = ' + totalV  + '\n'
    );
}

//Вывод данных web-хранилища
function showWebStoreData()
{
    var storeLoopN = parseInt(localStorage.getItem("storeN"));
    for(var i = 1; i < storeLoopN + 1; i++)
    {
        console.log(localStorage.getItem('Num'+i));
        console.log(localStorage.getItem('Len'+i));
        console.log(localStorage.getItem('Diam'+i));
        console.log(localStorage.getItem('Val'+i));
    }

}

//Показ сообщений
function errorMessages(message){
    $('.error').text(message).fadeIn().delay(2000).fadeOut();
}

//Сброс всех параметров
function allReset()
{
    Len = 0;

    N = 1;
    $('.num').text('№ ' + N );

    D = 0;
    V = 0;
    totalV = 0;
    $('#total_val').val(0);
    $('#total_val_top').val(0);

    //старое
    //maxV = 36200;
    //$('#max-val').val(36200);
    localStorage.removeItem('maxVal');
    maxV = 0;
    $('#max-val').val(0);
    restVal = 0;
    $('#max-val-rest').val($('#max-val').val())
                      .css("backgroundColor","white");


    $('.aver-diam').text('0');
    $('#aver-persent-4,#aver-persent-6,#aver-qty-4,#aver-qty-6,#aver-val-4,#aver-val-6,#aver-val').val('0');
    localStorage.removeItem('Styk');
    resetContainerData();
    //убираем таблицу общей загрузки
    removeDataTable();

}

//Сброс всех параметров
function allMelcodrevReset() {
    $('#diam12').val('0');
    $('#val12').val('0');
    $('#diam14').val('0');
    $('#val14').val('0');
    $('#diam16').val('0');
    $('#val16').val('0');
    $('#diam18').val('0');
    $('#val18').val('0');
    $('#diam_total').val('0');
    $('#val_total').val('0');

}

//Вывод результатов в таблицу(DESC)
function showData() {
    //console.log('N = ' + N);
    //console.log('Partia.length = ' + Partia.length);

    //for(var i=Partia.length; i > 0; i--)
    //{
    //    console.log(Partia[i]);
    //}

    for(var i=N-1; i > 0; i--)
    {
        if(i == N-1)//для первого элемента
            tempTotalVal = totalV;
        else
            tempTotalVal -= Partia[i+1]['Val'];

        if (Partia[i]['Diam'] > 0)
        {
            $('.table-res').append(
                '<tr>' +
                '<td><b>' + i + '</b></td>' +
                '<td>' + localStorage.getItem('Len'+i).toLocaleString() + '</td>' +
                '<td><b>' + localStorage.getItem('Diam'+i).toLocaleString()+ '</b></td>' +
                '<td>' + localStorage.getItem('Val'+i).toLocaleString() + '</td>' +
                '<td><b>' + tempTotalVal.toLocaleString() + '</b></td>' +
                '<td>' + i + '</td>' +
                '</tr>'
            );
        }
    }//for
}


//убрать таблицу всей загрузки
function removeDataTable()
{
    $('#show_loading').text('ПОКАЗАТЬ');
    $('.table-res tr td').remove();
    flag = true;
}

//Вывод результатов в таблицу(DESC) после восстановления
function showDataAfterSave()
{
    N--;
    showData();
    N++;
}

//Печать таблицы результатов(ASC)
function showDataASC()
{
    $('.table-res').append(
        '<tr>' +
        '<td>' + N + '</td>' +
        '<td>' + Len / 10 + '</td>' +
        '<td>' + D + '</td>' +
        '<td>' + V + '</td>' +
        '<td>' + totalV + '</td>' +
        '<td><i class="fa fa-minus-square del"></i></td>' +
        '</tr>'
    );
}

//Подсчет остатка
function totalRest()
{
    //maxV = $('#max-val').val();
    maxV = localStorage.getItem('maxVal');
    restVal = maxV - totalV;
    $('#max-val-rest').val(restVal.toLocaleString());
    if(restVal < attention)
    {
        $('#max-val-rest').css({
            "backgroundColor":"red",
            "color":"white"
        });
    }
    else
    {
        $('#max-val-rest').css({
            "backgroundColor":"white",
            "color":"black"
        });
    }

}

//Сброс данных контейнера
function resetContainerData()
{
    contNum   = $('#cont-num').val('');
    contLine  = $('#cont-line').val('');
    contGross = $('#gross-wt').val('');
    contTare  = $('#tare-wt').val('');
    contPay   = $('#pay-wt').val('');
    contPoroda   = $('#cont-poroda').val('');
    Employer  = $('#emp-name').val('');
    localStorage.setItem('contNum',  0);
    localStorage.setItem('contLine', 0);
    localStorage.setItem('contGross',0);
    localStorage.setItem('contTare', 0);
    localStorage.setItem('contPay',  0);
    localStorage.setItem('contPoroda',0);
    localStorage.setItem('Employer', 0);

}

//Получение среднего диаметра
function getAverageDiam()
{
   //средний диаметр
    var average_diam = 0;
    //средний объем
    var average_val = 0;
    //объем 4х метрового леса,%
    var val_percent_4 = 0;
    //кол-во 4х метрового леса,шт
    var qty_4 = 0;
    //объем 6ти метрового леса,%
    var val_percent_6 = 0;
    //кол-во 6ти метрового леса,шт
    var qty_6 = 0;

    for(var i=1; i <= N; i++)
    {
        average_diam += parseInt(Partia[i].Diam);
        average_val  += parseInt(Partia[i].Val);
        //кол-во бревен каждой длины
        if(parseInt(Partia[i].L) == 3)
        {
            qty_4++;
            val_percent_4 += parseInt(Partia[i].Val)
        }
        else if(parseInt(Partia[i].L) == 5)
        {
            qty_6++;
            val_percent_6 += parseInt(Partia[i].Val)
        }
        //console.log('Partia.Val = '+parseInt(Partia[i].Val));
        //console.log('Partia.L = '+parseInt(Partia[i].L));
        //console.log('val_percent_4 = '+ val_percent_4);
        //console.log(' val_percent_6 = '+ val_percent_6);

    }
    //вывод среднего диаметра
    average_diam /= N;
    average_diam = Math.round(average_diam*100)/100;
    $('.aver-diam').text(average_diam.toLocaleString());

    //вывод среднего объема
    average_val /= N;
    average_val = Math.round(average_val*100)/100;
    $('#aver-val').val(average_val.toLocaleString()+' см3');

    //вывод кол-ва бревен разной длины
    $('#aver-qty-4').val(qty_4.toLocaleString()+' шт');
    $('#aver-qty-6').val(qty_6.toLocaleString()+' шт');

    //вывод общего объема бревен разной длины
    $('#aver-val-4').val(val_percent_4.toLocaleString()+' см3');
    $('#aver-val-6').val(val_percent_6.toLocaleString()+' см3');

    //вывод процентного соотношения бревен разной длины
    val_percent_4 = val_percent_4*100/totalV;
    val_percent_4 = Math.round(val_percent_4*100)/100;
    val_percent_6 = val_percent_6*100/totalV;
    val_percent_6 = Math.round(val_percent_6*100)/100;

    $('#aver-persent-4').val(val_percent_4.toLocaleString()+' %');
    $('#aver-persent-6').val(val_percent_6.toLocaleString()+' %');
    //console.log ('average_diam = ' + average_diam);
}
//************************************************
//*******ПРОГРАММА********************************
//************************************************
//Отметить стык
$('#enter-styk').click(function(){
    result = confirm('Отметить стык?');
    if(result)
    {
        if(localStorage.getItem('Styk'))
        {
            Styk = localStorage.getItem('Styk') + ',' + (N - 1);
            localStorage.setItem('Styk',  Styk);
            errorMessages('Стык добавлен');

        }
        else
        {
            Styk = N - 1;
            if(Styk != 0)
            {
                localStorage.setItem('Styk',  Styk);
                errorMessages('Первый стык');
            }
        }
    }

    //for(var i=0; i<Styk.length; i++)
    //{
    //    console.log(localStorage.getItem('Styk'));
    //}

});

//ПОКАЗАТЬ/СКРЫТЬ ДАННЫЕ КОНТЕЙНЕРА
$('#show_cont').click(function(){
    $( ".table-container-data" ).slideToggle() ;
    return false;
});

//Сброс введенных данных контейнера
$('#reset_cont').click(function(){
    resetContainerData();
    return false;
});

//ДАННЫЕ КОНТЕЙНЕРА СОХРАНИТЬ
$('#save_cont').click(function() {
    //получение
    localStorage.setItem('contNum',$('#cont-num').val());
    localStorage.setItem('contLine',$('#cont-line').val());
    localStorage.setItem('contGross',$('#gross-wt').val());
    localStorage.setItem('contTare',$('#tare-wt').val());
    localStorage.setItem('contPay',$('#pay-wt').val());
    localStorage.setItem('contPoroda',$('#cont-poroda').val());
    localStorage.setItem('Employer',$('#emp-name').val());

    //verification

    contNum   = localStorage.getItem('contNum');
    contLine  = localStorage.getItem('contLine');
    contGross = localStorage.getItem('contGross');
    contTare  = localStorage.getItem('contTare');
    contPay   = localStorage.getItem('contPay');
    contPoroda = localStorage.getItem('contPoroda');
    Employer  = localStorage.getItem('Employer');

    //alert (contNum);

    errorMessages('Данные сохранены');

});

//******************************************************

//Выбор длины загружаемого леса
$('.choose-len-btn').click(function(){
    $('.fa-check').css('opacity','0');
    $(this).prev('i').css('opacity','1');
    Len = $(this).attr('len');

    //Обнуление диаметра и объема для ввода с новой длиной
    $('#diam').val('');
    $('#val').val('');
    D = 0;
    V = 0;
    Diam = '';

    //showParam();
});
//******************************************************

//Изменение максимального объема
$('#max-val').keyup(function(){
    localStorage.setItem('maxVal',$(this).val());
    totalRest();
});
//******************************************************

//ВВОД ДИАМЕТРА СЛЕДУЮЩЕГО БРЕВНА
//вывод клавиатуры
$('#diam').focus(function(){
    $('.numbers').show();
    //убираем всю загрузку
    removeDataTable();
});
//ВВОД С КЛАВИАТУРЫ УСТРОЙСТВА
$('#diam').keyup(function(){

    temp_diam = $(this).val();

    //Пропускаем только четные значения
    if( !(temp_diam%2) )
    {
        D = $(this).val();
        //Расчет объема текущего бревна
        switch (Len)
        {
            case '38':
                V = L_3_8[D];
                break;
            case '58':
                V = L_5_8[D];
                break;
        }

        //Выводим объем текущего бревна
        if(V)
        {
            $('#val').val(V+'cм3');
        }
        else if(D < 0 || D > 9)
        {
            errorMessages('НЕТ ДАННЫХ ДЛЯ ДИАМЕТРА');
        }
    }


    //showParam();

});

//******************************************************
//нахождение объема по диаметру
function getValue() {
    temp_diam = $('#diam').val();

    //Пропускаем только четные значения
    if (!(temp_diam % 2)) {
        D = $('#diam').val();
        //Расчет объема текущего бревна
        switch (Len) {
            case '38':
                V = L_3_8[D];
                break;
            case '58':
                V = L_5_8[D];
                break;
        }

        //Выводим объем текущего бревна
        if (V) {
            $('#val').val(V + 'cм3');
        }
        else if (D < 0 || D > 9) {
            errorMessages('НЕТ ДАННЫХ ДЛЯ ДИАМЕТРА');
        }

    }
}

function TestKeyBoard(mess)
{
    console.log(
        '***********************************\n'+
        mess+
        '\n значение в поле(Diam) = '+Diam+
        '\n диаметр бревна(D) = '+D+
        '\n объем бревна(V) = '+V+
        '\n нажали кнопку(diam_temp) = '+diam_temp+
        '\n новое значение диаметра(temp_diam) = '+temp_diam
    );
}
//-------------------------------------
//ВВОД ДАННЫХ С  ВИРТУАЛЬНОЙ КЛАВИАТУРЫ
$(".numbers td").click(function(){

    if( $(this).attr('val') != 'del' &&
        $(this).attr('val') != 'ok' )
    {
        //нажатая кнопка
        diam_temp = $(this).attr('val');

        Diam += diam_temp;

        //заполнение поля "диаметр"
        $('#diam').val(Diam);

        temp_diam = $('#diam').val();

        //Пропускаем только четные значения
        if (!(temp_diam % 2) && temp_diam <= 100) {
            D = $('#diam').val();
            //Расчет объема текущего бревна
            switch (Len) {
                case '38':
                    V = L_3_8[D];
                    break;
                case '58':
                    V = L_5_8[D];
                    break;
            }

            //Выводим объем текущего бревна
            if (V) {
                $('#val').val(V + 'cм3');
            }
            else if (D < 0 || D > 9) {
                errorMessages('НЕТ ДАННЫХ ДЛЯ ДИАМЕТРА');
            }

        }
        else if (temp_diam > 100) {
            errorMessages('СЛИШКОМ БОЛЬШОЙ ДИАМЕТР');
            var str = $('#diam').val();
            Diam = str.substring(0, str.length - 1);
            $('#diam').val(Diam);
            temp_diam = $('#diam').val();
            //TestKeyBoard('СЛИШКОМ БОЛЬШОЙ ДИАМЕТР');
        }
        else if ((temp_diam % 2) > 0 && (temp_diam < 0 || temp_diam > 9))
        {
            errorMessages('НЕЧЕТНЫЙ ДИАМЕТР');
            //D = $('#diam').val();
        }
        //TestKeyBoard('НАЖАТИЕ КНОПКИ');
    }
    //----------------------------------------------
    else if($(this).attr('val') == 'ok')
    {
        //убрать клавиатуру
        $('.numbers').hide();
    }
    //----------------------------------------------
    else if($(this).attr('val') == 'del')
    {
        diam_temp = $(this).attr('val');
        //старое
        //if(Diam != '')
        //    Diam = '';
        //$('#diam').val('');
        //$('#val').val('');

        //НОВОЕ удаление по одной цифре
        //значение поля
        var str = $('#diam').val();
        /**
         * если удаляем последнее число,
         * значение элемента в "0"
         */
        if(str.length > 1)
        {
            //минус последний символ
            var mines_symbol = str.substring(0, str.length - 1);
            //console.log('текст минус последний символ - '+ mines_symbol);
            //новое значение поля
            $('#diam').val(mines_symbol);//.trigger('focus');
            //общие расчеты после
            // каждого изменения поля
            //новое значение диаметра(используется при нажатии клавиатуры)
            Diam = $('#diam').val();


            //заполнение поля "диаметр"
            $('#diam').val(Diam);

            temp_diam = $('#diam').val();

            //Пропускаем только четные значения
            if (!(temp_diam % 2) && temp_diam <= 100) {
                D = $('#diam').val();
                //Расчет объема текущего бревна
                switch (Len) {
                    case '38':
                        V = L_3_8[D];
                        break;
                    case '58':
                        V = L_5_8[D];
                        break;
                }

                //Выводим объем текущего бревна
                if (V) {
                    $('#val').val(V + 'cм3');
                }
                else{
                    errorMessages('НЕТ ДАННЫХ ДЛЯ ДИАМЕТРА');
                    $('#val').val(0);
                }

            }
            //TestKeyBoard('СТЕРЕТЬ >1');
        }
        else
        {
            $('#diam').val(0).trigger('focus');
            $('#val').val(0+'cм3');
            //обнуляем значение диаметра
            Diam = '';
            D = '';
            temp_diam = $('#diam').val();
            //TestKeyBoard('СТЕРЕТЬ <1');
        }
        getValue();
    //--------------------------------------------------------
    }
});
//******************************************************

//Ввод данных следующего бревна
$('#enter-diam').click(function(){

    //showWebStoreData();

    //Сброс суммы клавиатуры
    Diam = '';

    //при пустом диаметре не срабатывает
    if(D >= 12 && Len > 0 && typeof V != "undefined")
    {

        //Расчет общего объема
        totalV += V;
        $('#total_val').val(totalV.toLocaleString() + ' cм3');
        $('#total_val_top').val(totalV.toLocaleString() + ' cм3');


        //Осталось загрузить
        //maxV = $('#max-val').val();
        maxV = localStorage.getItem('maxVal');
        restVal = maxV - totalV;
        $('#max-val-rest').val(restVal.toLocaleString());
        if(restVal < attention)
        {
            $('#max-val-rest').css({
                "backgroundColor":"red",
                "color":"white"
            });
        }
        else
        {
            $('#max-val-rest').css({
                "backgroundColor":"white",
                "color":"black"
                });
        }

        //добавляем данные по текущему бревну в массив
        Partia[N]= {
            "L": Len/10,
            "Diam": D,
            "Val": V
        };

        //********************************
        //начало отправки данных на сервер
        var log_len = Len/10;
        var log_diam = D;
        var log_val = V;


        //********************************
        //WEB ХРАНИЛИЩЕ
        storeNum =  'Num'+N;
        storeLen =  'Len'+N;
        storeDiam = 'Diam'+N;
        storeVal =  'Val'+N;
        localStorage.setItem(storeNum,N);
        localStorage.setItem(storeLen,log_len);
        localStorage.setItem(storeDiam,log_diam);
        localStorage.setItem(storeVal,log_val);

        //сохраняем количество бревен(для восстановления)
        localStorage.setItem("storeN",N);


        //********************************


        removeDataTable();
        //Вывод результатов в таблицу(DESC)
        //showData();

        //Получаем средний диаметр
        getAverageDiam();

        //Номер бревна по порядку
        N++;
        $('.num').text('№ ' + N );

        //Обнуление диаметра и объема для следующего ввода
        $('#diam').val('');
        $('#val').val('');
        D = 0;
        V = 0;

        //фокус на поле ввода
        $('#diam').focus();
    }
    else
    {
        D = 0;
        V = 0;

        if(Len == 0)
            errorMessages('НЕ ВЫБРАНА ДЛИНА');
        else
            errorMessages('НЕПРАВИЛЬНЫЙ ДИАМЕТР');
    }

    //showParam();

});
//******************************************************
//ПОКАЗ/СКРЫТИЕ ОБЩЕЙ ЗАГРУЗКИ
var flag = true;
$('#show_loading').click(function(){
    //$( ".table-container-data" ).slideToggle() ;
    if(flag)
    {
        $(this).text('СКРЫТЬ');
        showData();
        flag = false;
        //скрыть клавиатуру
        $('.numbers').hide();
    }
    else
    {
        removeDataTable();
    }
});


//******************************************************
//Удаление последней строки
$('#delete').click(function() {

    //только если есть данные в таблице
    if(totalV)
    {
        result = confirm('Строка будет удалена. Продолжить?');

        if(result)
        {
            //пересчет общего объема
            totalV -= Partia[N-1]['Val'];
            $('#total_val').val(totalV.toLocaleString());
            $('#total_val_top').val(totalV.toLocaleString());

            //вывод нового остатка
            totalRest();
            //Счетчик на шаг назад
            //находим последний элемент и обнуляем его
            N--;

            Partia[N]['L']    = 0;
            Partia[N]['Diam'] = 0;
            Partia[N]['Val']  = 0;
            //очищаем WEB ХРАНИЛИЩЕ
            storeNum =  'Num'+N;
            storeLen =  'Len'+N;
            storeDiam = 'Diam'+N;
            storeVal =  'Val'+N;
            localStorage.setItem(storeNum,'');
            localStorage.setItem(storeLen,'');
            localStorage.setItem(storeDiam,'');
            localStorage.setItem(storeVal,'');
            //сдвиг назад счетчика web-хранилища
            localStorage.setItem("storeN",N-1);
            console.log(localStorage.getItem("storeN"));
            //выводим новый номер бревна
            $('.num').text('№ ' + N );

            //очищаем и переписываем таблицу
            $('.table-res tr td').remove();
            showData();

            //showParam();
        }
    }
    else
    {
        errorMessages('НЕТ ДАННЫХ ДЛЯ УДАЛЕНИЯ');
    }

    return false;
});
//******************************************************

//ВОЗОБНОВЛЕНИЕ РАБОТЫ ПОСЛЕ СБОЯ
//включить меню
$('.show-sos').click(function(){

    $('.sos-wrapper').css('display','block');


    return false;
});

//убрать меню
$('.sos-btn').click(function(){

    //очистка массива
    Partia.length = 0;

    //очистка таблицы
    $('.table-res tr td').remove();

    N = parseInt($('#last-N').val());

    N++;
    $('.num').text('№ ' + N);

    //заполнение несуществующих элементов массива до N
    for(var i = 0; i < N; i++)
    {
        Partia[i]= {
            "L"   : 0,
            "Diam": 0,
            "Val" : 0
        };
    }

    totalV = parseInt($('#last-totalV').val());

    $('#total_val').val(totalV);
    $('#total_val_top').val(totalV);

    showParam();


    //скрыть панель
    $('.sos-wrapper').hide();
    return false;
});


//******************************************************

//Новый контейнер
$('#next-cont').click(function(){
    result = confirm('Все данные будут удалены!!!\n' +
        'Не забудьте синхронизироваться!\n' +
        'Продолжить?');
    if(result)
    {

        //очистка таблицы
        $('.table-res tr td').remove();

        //очистка массива
        Partia.length = 0;

        //очистка всех параметров
        $('.fa-check').css('opacity','0');
        allReset();

        //N = localStorage.getItem('storeN');

        //очистка памяти
        localStorage.clear();

    }
});
//******************************************************

//МЕЛКОДРЕВ
//включить
$('#switch-on-melcodrev').click(function(){
    $('.melcodrev').show();
    //обнуляем все данные
    allMelcodrevReset();
    //скролл вверх
    $('body,html').animate({
        scrollTop: 0
    }, 600);

});

//выключить
$('#switch-of-melcodrev').click(function(){
    //allMelcodrevReset();
    $('.melcodrev').hide();
});

//сбросить все параметры
$('#reset-melcodrev').click(function(){
    allMelcodrevReset();
});

//сброс при изменении длины
$('#Lmd').change(function(){
    allMelcodrevReset();
});

//очистка поля при наведении
$('#diam12, #diam14, #diam16, #diam18').focus(function(){
    var temp = $(this).val();
    (temp > 0)?$(this).val(temp):$(this).val('');
});

//ноль в пустом поле после потери фокуса
$('#diam12, #diam14, #diam16, #diam18').blur(function(){
    var temp = $(this).val();
    (temp > 0)?$(this).val(temp):$(this).val('0');
});

//ввод значений
$('#diam12, #diam14, #diam16, #diam18').keyup(function(){

    //выбор длины
    Lmd = $('#Lmd').val();
    console.log('Lmd = '+Lmd);
    D = $(this).attr('diam');
    //console.log('\nD = '+D);

    //Расчет объема текущего бревна
    switch (Lmd)
    {
        case 'LM_2_9':
            V = LM_2_9[D];
            break;
        case 'LM_3_7':
            V = LM_3_7[D];
            break;
        case 'LM_3_8':
            V = LM_3_8[D];
            break;
        case 'LM_3_9':
            V = LM_3_9[D];
            break;
    }

    //console.log('V = '+V);
    //получаем текущий id
    var diam_temp = '#diam' + D;
    var val_temp = '#val' + D;

    $(val_temp).val($(diam_temp).val() * V);

    //общие данные
    $('#diam_total').val(
        parseInt($('#diam12').val())+
        parseInt($('#diam14').val())+
        parseInt($('#diam16').val())+
        parseInt($('#diam18').val())
    );

    $('#val_total').val(
        parseInt( $('#val12').val())+
        parseInt( $('#val14').val())+
        parseInt( $('#val16').val())+
        parseInt( $('#val18').val())
    );

});
//******************************************************
//СИНХРОНИЗАЦИЯ
$('#sinhro').click(function() {
    result = confirm('Данные будут отправлены в хранилище. Продолжить?');
    if(result)
    {
        contNum   = localStorage.getItem('contNum');
        contLine  = localStorage.getItem('contLine');
        contGross = localStorage.getItem('contGross');
        contTare  = localStorage.getItem('contTare');
        contPay   = localStorage.getItem('contPay');
        contPoroda = localStorage.getItem('contPoroda');
        Employer  = localStorage.getItem('Employer');
        Styk      = localStorage.getItem('Styk');
        //Отправка данных только с заполненным контейнером
        if(
            contNum    &&
            contLine   &&
            contGross  &&
            contTare   &&
            contPay    &&
            contPoroda &&
            Employer
        )
        {

            var DATA = {
                "contNum"  : contNum,
                "contLine" : contLine,
                "contGross": contGross,
                "contTare" : contTare,
                "contPay"  : contPay,
                "contPoroda" : contPoroda,
                "Employer" : Employer,
                "Partia"   : Partia,
                "Styk"     : Styk
            };

            //изменен ключ входа
            $.ajax({
                //удаленный сервер
                "url": "http://les2.radov.xyz/controller.php",
                "type": "post",
                "data": {
                    "save_loading": "yes",
                    "DATA": DATA
                },
                "dataType": 'json',
                "success": function (data) {
                    errorMessages(data.message);
                    alert ('Данные успешно отправлены.');
                }
            });
            //конец отправки данных на сервер
        }
        else
        {
            errorMessages('Введены не все данные контейнера');
        }

    }

    return false;
});

//************************************************
//*******РАЗНОЕ***********************************
//************************************************

//запрет перезагрузки страницы
// location.reload(function(){
// 	return false;
// }); 
// windows.onload(function(){
// 	return false;
// }); 

//отключение двойного клика
$(".numbers td").dblclick(function(){
    $(this).trigger('click');
});


//Скролл вверх
$('.to-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);
    return false;
});

//************************************************
//ввод в поле без фокуса
/*
$("input[type='text']").live('click', function () {
    $("input[type='text']").removeClass("focusElement");
    $(this).addClass("focusElement").focus();
});
*/
//************************************************


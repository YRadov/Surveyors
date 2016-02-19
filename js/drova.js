//************************************************
//*******ПЕРЕМЕННЫЕ*******************************
//************************************************
//Длина загружаемого леса
var Len = 0;
//Номер бревна попорядку
var N = 1;
//Диаметр бревна
var D = 0;
//Объем бревна заданного диаметра
var V = 0;
//Общий объем загруженных бревен
var totalV = 0;
$('#total_val').val(0);
$('#total_val_top').val(0);
//Для таблицы объем загруженных бревен
var tempTotalVal = 0;
//Максимальный объем
var maxV = 36600;
$('#max-val').val(36600);
//Осталось загрузить
var restVal = 0;
$('#max-val-rest').val($('#max-val').val());
//Когда предупреждать о близком конце загрузки
var attention = 2000;//cm3
//Общий массив загрузки
var Partia = [];
//Массивы соответствий D:V для разных длин
var L_3_8 = [];
var L_5_8 = [];
var LM_2_9 = [];
var LM_3_7 = [];
var LM_3_8 = [];
var LM_3_9 = [];
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
    maxV = 36600;
    $('#max-val').val(36600);
    restVal = 0;
    $('#max-val-rest').val($('#max-val').val())
                      .css("backgroundColor","white");
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
function showData()
{
    for(var i=N; i > 0; i--)
    {
        if(i == N)//для первого элемента
            tempTotalVal = totalV;
        else
            tempTotalVal -= Partia[i+1]['Val'];


        if (Partia[i]['Diam'] > 0)
        {
            $('.table-res').append(
                '<tr>' +
                '<td><b>' + i + '</b></td>' +
                '<td>' + Partia[i]['L'] + '</td>' +
                '<td><b>' + Partia[i]['Diam'] + '</b></td>' +
                '<td>' + Partia[i]['Val'] + '</td>' +
                '<td><b>' + tempTotalVal + '</b></td>' +
                '<td>' + i + '</td>' +
                '</tr>'
            );
        }
    }//for
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
    maxV = $('#max-val').val();
    restVal = maxV - totalV;
    $('#max-val-rest').val(restVal);
}
//************************************************
//*******ПРОГРАММА********************************
//************************************************

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

//ВВОД ДИАМЕТРА СЛЕДУЮЩЕГО БРЕВНА
//вывод клавиатуры
$('#diam').focus(function(){
    $('.numbers').show();
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

//Ввод данных следующего бревна
$('#enter-diam').click(function(){

    //Сброс суммы клавиатуры
    Diam = '';

    //при пустом диаметре не срабатывает
    if(D >= 12 && Len > 0 && typeof V != "undefined")
    {

        //Расчет общего объема
        totalV += V;
        $('#total_val').val(totalV + ' cм3');
        $('#total_val_top').val(totalV + ' cм3');


        //Осталось загрузить
        maxV = $('#max-val').val();
        restVal = maxV - totalV;
        $('#max-val-rest').val(restVal);
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
        var log_len = Len/10;
        var log_diam = D;
        var log_val = V;
        //********************************
        //начало отправки данных на сервер

        $.ajax({
            "type":"post",
            "url":"controller.php",
            "data":{
                "log_num": N,
                "log_len": log_diam,
                "log_diam": log_diam,
                "log_val": log_val
            },
            "dataType":'json',
            "success":function(data){
                //alert(data.message);


            }
        });
        //конец отправки данных на сервер
        //********************************

        $('.table-res tr td').remove();

        //Вывод результатов в таблицу(DESC)
        showData();

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

//Изменение максимального объема
$('#max-val').keyup(function(){
    totalRest();
});
//******************************************************

//Новый контейнер
$('#next-cont').click(function(){
    result = confirm('Все данные будут удалены. Продолжить?');
    if(result)
    {
        //очистка таблицы
        $('.table-res tr td').remove();
        //очистка всех параметров
        $('.fa-check').css('opacity','0');
        allReset();
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
            $('#total_val').val(totalV);

            //вывод нового остатка
            totalRest();
            //Счетчик на шаг назад
            //находим последний элемент и обнуляем его
            N--;
            Partia[N]['L'] = 0;
            Partia[N]['Diam'] = 0;
            Partia[N]['Val'] = 0;

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
//ВВОД ДАННЫХ С КЛАВИАТУРЫ
$(".numbers td").click(function(){

    if( $(this).attr('val') != 'del' &&
        $(this).attr('val') != 'ok' )
    {
        diam_temp = $(this).attr('val');

        Diam += diam_temp;

        //заполнение поля "диаметр"
        $('#diam').val(Diam);

        temp_diam = $('#diam').val();

        //Пропускаем только четные значения
        if( !(temp_diam%2) )
        {
            D = $('#diam').val();
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
    }
    else if($(this).attr('val') == 'ok')
    {
        //убрать клавиатуру
        $('.numbers').hide();
    }
    else if($(this).attr('val') == 'del')
    {
        if(Diam != '')
        Diam = '';
        $('#diam').val('');
        $('#val').val('');

    }
});
//******************************************************
//МЕЛКОДРЕВ
//включить
$('#switch-on-melcodrev').click(function(){
    $('.melcodrev').show();
    //обнуляем все данные
    allMelcodrevReset();
});
//выключить
$('#switch-of-melcodrev').click(function(){
    //allMelcodrevReset();
    //llReset();
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
    $(this).val('');
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
//ВОЗОБНОВЛЕНИЕ РАБОТЫ ПОСЛЕ СБОЯ
//включить меню
$('.show-sos').click(function(){

    $('.sos-wrapper').css('display','block');

    //var wrap = $('.sos-wrapper').height();
    var wrap = Wi.document.height();
    console.log ('wrap = '+ wrap);
    var sos = $('.sos').height();
    console.log ('sos = '+ sos);

    return false;
});
//убрать меню
$('.sos-btn').click(function(){

    $('.sos-wrapper').hide();
    return false;
});

//выровнять меню по вертикали
var wrap = $('.sos-wrapper').height();
console.log ('wrap = '+ wrap);
//var sos = $('.sos').height();//высота слайдера
//console.log ('sos = '+ sos);
//var sos_offset = wrap/2 - slide/2;// - 30;
//console.log ('slide_offset = '+ slide_offset);
//$('.sos').css('top',slide_offset);
//var internal_main = $('.main').height();//высота слайдера
//var main_offset = (main - internal_main)/2 - 70;
//$('.main').css('top',main_offset);


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


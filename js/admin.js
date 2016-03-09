//показать подробно контейнер
$('.btn-view').click(function(){
    var id = $(this).attr('id');
    $.ajax({
        "type": "get",
        //"url":"http://les.radov.xyz/controller.php",
        "url": "controller.php",
        "data": {
            "one_loading": "yes",
            "id": id
        },
        "dataType": 'json',
        "success": function (data) {
            //перезагрузка только с сервера
            location.reload(true);
        }
    });

    return false;
});

//убрать подробный показ
$('.reset-cont').click(function(){
    $('.one-cont').remove();
});



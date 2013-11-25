/// Стартовая функция
$(document).ready(function(){
    // Пробегаемся по всем счетчикам
    $('#counter.counter input').each(function(i,elem){
        // Разрешаем вводит значение через поле
        $(elem).bind('keyup',function () { 
            this.value = this.value.replace(/[^0-9\.]/g,'');
            verify(this.id,this.value);      // Проверяем
            countresult(this.id,this.value); // Считаем конечный результат
        });
        // Если не было нажатия, все равно выполнить
        verify(this.id,this.value);      // Проверяем
        countresult(this.id,this.value); // Считаем конечный результат
    });
    // Вешаем событие клик на стрелочки. Внутри передаем ID нажатой
    $('span.dec.active').bind('click',function(){change(this.id,'dec');});
    $('span.inc.active').bind('click',function(){change(this.id,'inc');});
});
/// Проверяем мин/макс значения и запрещаем выходить за рамки.
function verify(id,count){
    // Проверяем наличия класса active
    if($('span#'+id+'.dec').hasClass('active')){ dec='true'; }else{ dec='false'; }
    if($('span#'+id+'.inc').hasClass('active')){ inc='true'; }else{ inc='false'; }
    // Проверяем значение и загоняем в рамки
    switch(true){
        case(count<=1 && dec==='false'):
            $('input#'+id+'.count').val(1);
            break;
        case(count<=1 && dec==='true'):
            $('span#'+id+'.dec').removeClass('active').unbind('click');
            $('input#'+id+'.count').val(1);
            break;
        case(count>1 && dec==='false'):
            $('span#'+id+'.dec').addClass('active').bind('click',function(){change(this.id,'dec');});
            break;
        case(count>=999 && inc==='true'):
            $('span#'+id+'.inc').removeClass('active').unbind('click');
            $('input#'+id+'.count').val(999);
            break;
        case(count<999 && inc==='false'):
            $('span#'+id+'.inc').addClass('active').bind('click',function(){change(this.id,'inc');});
            break;
        default:'';
    }
}
/// Увеличение/уменьшения счетчика
function change(id,change){
    // Получаем значение счетчика
    var count = Number($('input#'+id+'.count').val());
    // Увеличиваем/уменьшаем значение
    switch(change){
        case 'inc': count++; break;
        case 'dec': count--; break;
        default: alert('error: indefinitely change');
    }
    $('input#'+id+'.count').val(count); // Устанавливаем значение
    verify(id,count);                   // Проверяем
    countresult(id,count);              // Считаем конечный результат
}
/// Считаем результат
function countresult(id,count){
    if(id>0){ 
        var totalrow = Number($('#'+id+'.totalrow').text());
        var totalcount = totalrow*count;
        // Так как у меня все через сессии добавляю значение count к заказу через AJAX
        // countresult конечная функция для всех, поэтому изменения можно отправить от сюда
        $('#'+id+'.totalcount').text(totalcount);
        changeCount(id,count);
        // Если у вас будет POST то можно воспользоваться input-ом
        //$('#'+id+'.totalcount').html(totalcount+'<input type="hidden" name="counter'+id+'" value="'+totalcount+'">');
    }else alert('error: indefinitely id');
}
/// Обновляем значение count в сессии
function changeCount(id,count){
    $.post("/jcounter/changeCount",{order:id,count:count},changeCountr);
}
function changeCountr(data){
    if(data==='error'){ alert('Ощибка. Свяжитесь с разработчиком.'); }
    //else{  }
}
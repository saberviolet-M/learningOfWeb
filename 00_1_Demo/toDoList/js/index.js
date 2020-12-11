$(function() {

    //增加事项
    $('#title').on('keyup', function(e) {
        if (e.keyCode === 13) {
            if ($(this).val() === '') {
                alert('噗噗噗，请输入内容哦！！！')
            } else {
                $(`<li><input type="checkbox"><p>${$(this).val()}</p><a href="javascript:;"></a></li>`).prependTo('#todolist');
                $('#todocount').html($('#todolist li').length);
            }
            $(this).val('');
        }
    })

    function cntShow() {
        $('#todocount').html($('#todolist li').length);
        $('#donecount').html($('#donelist li').length);
    }
    //删除事项
    $('#todolist').on('click', 'a', function() {
        $(this).parent().remove();
        cntShow();
    })
    $('#donelist').on('click', 'a', function() {
        $(this).parent().remove();
        cntShow();
    })


    //勾选移动
    $('#todolist').on('click', 'input', function() {
        $($(this).parent().clone(true)).prependTo('#donelist');
        $(this).parent().remove();
        cntShow();
    })
    $('#donelist').on('click', 'input', function() {
        $($(this).parent().clone(true)).prependTo('#todolist');
        $(this).parent().remove();
        cntShow();
    })
})
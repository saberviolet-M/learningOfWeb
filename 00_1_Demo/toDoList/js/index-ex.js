$(function() {
    localStorage.setItem('toDoList', [{
        title: 'toDoList本地存储',
        done: false
    }, {
        title: '左框完成，右点删除',
        done: false
    }, {
        title: '圆点计数',
        done: false
    }])
    load();
    //读取本地读取
    function getLocalStorage() {
        let data = localStorage.getItem('toDoList');
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    //保存本地存储
    function saveLocalStorage(data) {
        localStorage.setItem('toDoList', JSON.stringify(data));
    }

    //渲染页面
    function load() {
        //渲染之前先清空数据
        $('ol').empty();
        $('ul').empty();
        let toDoCnt = 0;
        let doneCnt = 0;
        let data = getLocalStorage();
        $.each(data, function(index, item) {
            if (item.done) {
                $('ul').prepend(`<li><input type="checkbox" checked><p>${item.title}</p><a href="javascript:;" id="${index}"></a></li>`)
                doneCnt++;
            } else {
                $('ol').prepend(`<li><input type="checkbox"><p>${item.title}</p><a href="javascript:;" id="${index}"></a></li>`)
                toDoCnt++;
            }
        })
        $('#todocount').text(toDoCnt);
        $('#donecount').text(doneCnt);
    }

    //添加事件
    $('#title').on('keydown', function(e) {
        if (e.keyCode === 13) {
            if ($(this).val() !== '') {
                let localData = getLocalStorage();
                //更新localData数据
                localData.push({
                    title: $(this).val(),
                    done: false
                });
                saveLocalStorage(localData);
                $(this).val('');
            } else {
                alert('请输入内容');
            }
        }
        load();
    })

    //删除事件
    $('ol,ul').on('click', 'a', function() {
        let data = getLocalStorage();
        let index = $(this).attr('id');
        data.splice(index, 1);
        saveLocalStorage(data);
        load();
    })

    //正在进行，已完成
    $('ol,ul').on('click', 'input', function() {
        let data = getLocalStorage();
        let index = $(this).siblings('a').attr('id');
        data[index].done = $(this).prop('checked');
        saveLocalStorage(data);
        load();
    })
})
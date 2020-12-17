// 本地存储&页面渲染
load();
// 节流阀
let flag = true;
// 正则-姓名修改规则
let reg = /^[a-z0-9_-]{3,16}$/;
let regC = /^[\u2E80-\u9FFF]+$/;
//读取本地读取
function getLocalStorage() {
    let data = localStorage.getItem('infoList');
    if (data !== null) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

//保存本地存储
function setLocalStorage(data) {
    localStorage.setItem('infoList', JSON.stringify(data));
}

// 页面渲染
function load() {
    //渲染之前先清空数据
    $('#list').empty();
    let data = getLocalStorage();

    $(data).each((index, item) => {
        $('#list').prepend(`<div class="one" index="${index}">
            <span class="item">
                <span class="info">${item.name}</span>
            <input type="text" class="ipt" value="${item.name}">
            </span>
            <span class="item">
                <span class="info">${item.rank}</span>
            <input type="number" class="ipt" value="${item.rank}">
            </span>
            <span class="item">
                <span class="info">${item.pay}</span>
            <input type="number" class="ipt" value="${item.pay}">
            </span>
            <span class="item">
                <i class="upd"></i>
                <i class="del"></i>
                <i class="yes"></i>
                <i class="no"></i>
            </span>
            </div>`)
    })
    upChart(data);
    downChart(data);
}

//图表
function xAxisName(data) {
    return data.map(item => item.name);
}

function upChart(data) {
    let name = xAxisName(data);
    let rank = data.map(item => item.rank);
    let myChart = echarts.init($('#up')[0]);
    let option = {
        title: {
            text: '评分图示',
            textStyle: {
                color: '#fff',
            }
        },
        color: ['#1E90FF'],
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '20%',
            show: true,
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: name,
            axisTick: {
                alignWithLabel: false
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                color: '#fff'
            }
        }],
        yAxis: [{
            type: 'value',
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        }],
        series: [{
            name: '评分图示',
            type: 'bar',
            barWidth: '60%',
            data: rank
        }]
    };
    myChart.setOption(option);
}

function downChart(data) {
    let name = xAxisName(data);
    let pay = data.map(item => item.pay);
    let myChart = echarts.init($('#down')[0]);
    let option = {
        title: {
            text: '薪资图示',
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            show: true,
            containLabel: true,
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '20%',
        },
        color: ['#1E90FF'],
        xAxis: {
            type: 'category',
            data: name,
            axisTick: {
                alignWithLabel: false
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                },
            },
            axisLabel: {
                color: '#fff'
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                color: '#fff'
            }
        },
        series: [{
            data: pay,
            type: 'line'
        }]
    };
    myChart.setOption(option);
}
//添加事项
$(function() {
    $('#add').on('click', function() {
        if (flag) {
            if ((reg.test($('#name').val()) || regC.test($('#name').val())) && $('#score').val() && $('#money').val()) {
                let data = getLocalStorage();
                data.push({
                    name: $('#name').val(),
                    rank: $('#score').val(),
                    pay: $('#money').val()
                })
                setLocalStorage(data);
                load();
                $('.iptBox input').val('');
            } else {
                alert('请输入完整(正确)信息！！！');
            }
        } else {
            alert('请完成编辑！！！');
        }
    })
    $('.iptBox').on('keyup', (e) => {
        if (flag) {
            if (e.keyCode === 13) {
                $('#add').click();
            }
        } else {
            alert('请完成编辑！！！');
        }
    })
})

//删除事项
$(function() {
    $('.listBox').on('click', '.del', function() {
        if (flag) {

            let data = getLocalStorage();
            let index = $(this).parents('.one').attr('index');
            data.splice(index, 1);
            setLocalStorage(data);
            load();
        } else {
            alert('请完成编辑！！！');
        }
    })

})

//修改事项
$(function() {
    $('.listBox').on('click', '.upd', function() {
        if (flag) {
            $(this).parents('.one').addClass('editMode').siblings();
            flag = false;
            let index = $(this).parents('.one').attr('index');
            // 确认修改
            $('.listBox').on('click', '.yes', function() {
                let data = getLocalStorage();
                let tempObj = {
                    name: $('.editMode .ipt').eq(0).val(),
                    rank: $('.editMode .ipt').eq(1).val(),
                    pay: $('.editMode .ipt').eq(2).val()
                }
                if (tempObj.name === undefined || tempObj.rank === undefined || tempObj.pay === undefined) {
                    return;
                } else {
                    if ((reg.test(tempObj.name) || regC.test(tempObj.name))) {
                        data[index] = tempObj;
                        setLocalStorage(data);
                        load();
                        $(this).parents('.one').removeClass('editMode').siblings();
                        flag = true;
                    } else {
                        alert('请输入完整(正确)信息！！！');
                    }
                }
            })

            // 取消修改
            $('.listBox').on('click', '.no', function() {
                $(this).parents('.one').removeClass('editMode').siblings();
                flag = true;
            })
        } else {
            alert('请完成编辑！！！');
        }
    })
})
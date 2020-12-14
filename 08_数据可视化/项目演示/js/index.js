// 完成rem适配（动态根据页面宽度设置rem的基准值-->html标签font-size）
(function() {
    // 1. 页面初始化 获取当前页面的宽度  约定页面宽度除以80  计算rem的基准值  设置html标签
    var setFont = function() {
        // 3. 适配区间  1024-1920 之间
        var width = window.innerWidth;
        if (width < 1024) {
            width = 1024;
        }
        if (width > 1920) {
            width = 1920;
        }
        var fontSize = width / 80 + "px";
        document.documentElement.style.fontSize = fontSize;
    };
    setFont();
    // 2. 在页面尺寸改变的时候 同上
    window.onresize = function() {
        setFont();
    };
})();

// 监控区域效果
// 1. tab切换
// 2. 列表无限滚动
(function() {
    // tab切换
    // 1. 监听点击事件
    // 2. 给当前点击的tab加上激活样式  其他的tab去除激活样式
    // 3. 内容需要按照点击的tab的索引去进行显示 其他隐藏
    $(".monitor").on("click", ".tabs a", function() {
        $(this).addClass("active").siblings().removeClass("active");
        // $(this).attr('data-index') 获取对应的索引  jquery获取属性值
        // this.dataset.index 获取对应索引  H5的方式
        // $(this).data('index')  data-* 使用这个方式 jquery获取数据值
        $(".monitor .content")
            .eq(this.dataset.index)
            .show()
            .siblings(".content")
            .hide();
    });
    // 列表无限滚动
    // 1. 克隆10条row 追加在后面
    // 获取需要追加row的容器 有两个容器   Array forEach()  jquery对象  each()
    $(".monitor .marquee").each(function() {
        // 给当前遍历的 容器追加10条row  克隆产生一个和原来一样的jquery对象但是是新的
        var $row = $(this).children().clone();
        $(this).append($row);
    });
    // 2. 写css动画（匀速 15s 无限执行） 效果：容器往上位移50%
})();

// 点位区域-饼图
(function() {
    // 配置
    var option = {
        // 工具提示
        tooltip: {
            // 触发提示的条件  item放到图形触发  axis放到轴触发
            trigger: "item",
            // {a} 使用series选项中的name
            // {b} 使用series选项中data中每一项数据的name
            // {c} 使用series选项中data中每一项数据的value
            // {d} 当前数据比上所有数据总和
            formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // 图表数据和类型
        series: [{
            // 图表的名称
            name: "面积模式",
            // 图表类型
            type: "pie",
            // 图表半径  内圆 10%  外圆 70%
            radius: ["10%", "70%"],
            // 图表中心位置
            center: ["50%", "50%"],
            // 数据表现类型  使用的半径
            roseType: "radius",
            // 图标数据
            data: [
                { value: 20, name: "云南" },
                { value: 26, name: "北京" },
                { value: 24, name: "山东" },
                { value: 25, name: "河北" },
                { value: 20, name: "江苏" },
                { value: 25, name: "浙江" },
                { value: 30, name: "四川" },
                { value: 42, name: "湖北" },
            ],
            // 文字样式
            label: {
                fontSize: 10,
            },
            // 引导线
            labelLine: {
                // 连接图形
                length: 8,
                // 连接文字
                length2: 10,
            },
        }, ],
        // 设置颜色
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff",
        ],
    };
    // 1. 初始化
    var myChart = echarts.init($(".pie")[0]);
    // 2. 使用配置
    myChart.setOption(option);
    $(window).on("reszie", () => {
        myChart.resize();
    });
    window.myChart = myChart;
})();

(function() {
    // 申明 省略柱子的数据
    var item = {
        value: 1200,
        tooltip: { extraCssText: "opacity:0" },
        itemStyle: {
            color: "#254065",
        },
        emphasis: {
            itemStyle: {
                color: "#254065",
            },
        },
    };
    // 用户统计-柱状图
    var option = {
        // 工具提示
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: "item",
            // 轴触发提示才有效
            // axisPointer: {
            //   // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果
            //   type: 'shadow'
            // }
        },
        // 图表边界控制
        grid: {
            show: true,
            borderColor: "rgba(0, 240, 255, 0.3)",
            // 距离 上右下左 的距离
            top: "3%",
            right: "3%",
            bottom: "3%",
            left: "0%",
            // 是否包含文本
            containLabel: true,
        },
        // 控制x轴
        xAxis: [{
            // 使用类目，必须有data属性
            type: "category",
            // 使用 data 中的数据设为刻度文字
            data: [
                "上海",
                "广州",
                "北京",
                "深圳",
                "合肥",
                "",
                "......",
                "",
                "杭州",
                "厦门",
                "济南",
                "成都",
                "重庆",
            ],
            // 刻度设置
            axisTick: {
                // true意思：图形在刻度中间
                // false意思：图形在刻度之间
                alignWithLabel: false,
                show: false,
            },
            // 刻度文字
            axisLabel: {
                color: "#4c9bfd",
            },
        }, ],
        // 控制y轴
        yAxis: [{
            // 使用数据的值设为刻度文字
            type: "value",
            // 刻度设置
            axisTick: {
                show: false,
            },
            // 刻度文字
            axisLabel: {
                color: "#4c9bfd",
            },
            // 分割线
            splitLine: {
                lineStyle: {
                    color: "rgba(0, 240, 255, 0.3)",
                },
            },
        }, ],
        // 图形数据和描述
        series: [{
            // 图表数据名称
            name: "用户统计",
            // 图表类型
            type: "bar",
            // 柱子宽度
            barWidth: "60%",
            // 数据 {value:2100}
            data: [
                2100,
                1900,
                1700,
                1560,
                1400,
                item,
                item,
                item,
                900,
                750,
                600,
                480,
                240,
            ],
            // 控制柱子样式
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                    0,
                    0,
                    0,
                    1,
                    [
                        { offset: 0, color: "#00fffb" }, // 0 起始颜色
                        { offset: 1, color: "#0061ce" }, // 1 结束颜色
                    ]
                ),
            },
        }, ],
    };
    var myChart = echarts.init($(".bar")[0]);
    myChart.setOption(option);
    $(window).on("reszie", () => {
        myChart.resize();
    });
})();

(function() {
    // 订单切换效果
    // 1. 准备数据
    var data = {
        day365: { orders: "20,301,987", amount: "99834" },
        day90: { orders: "301,987", amount: "9834" },
        day30: { orders: "1,987", amount: "3834" },
        day1: { orders: "987", amount: "834" },
    };
    // 2. 点击的时候 切换样式
    // 3. 点击的时候 切换数据
    var $h4Order = $(".order h4:eq(0)");
    var $h4Amount = $(".order h4:eq(1)");
    $(".order").on("click", ".filter a", function() {
        // 切换样式
        $(this).addClass("active").siblings().removeClass("active");
        // 切换数据
        // 1. 获取当前点击的 data-key属性值 【day365,day90,day30,day1】
        var key = $(this).data("key");
        // 2. 获取到对应的数据
        var currData = data[key];
        // 3. 使用html()方法把数据渲染进去
        $h4Order.html(currData.orders);
        $h4Amount.html(currData.amount);
    });
    // 4. 开启定时切换
    var index = 0;
    var $allA = $(".order .filter a");
    setInterval(function() {
        index++;
        if (index >= 4) {
            index = 0;
        }
        // 根据索引去：切换样式和切换数据
        // 根据索引找到对应的A容器，触发其点击事件，自然执行切换样式和切换数据
        $allA.eq(index).trigger("click"); // 触发事件，执行一个回调函数
    }, 5000);
})();

(function() {
    // 1. 准备数据
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34],
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98],
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24],
        ],
    };
    // 销售统计-线形图
    var option = {
        xAxis: {
            type: "category",
            data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
            ],
            // 剔除刻度
            axisTick: {
                show: false,
            },
            // 文字颜色
            axisLabel: {
                color: "#4c9bfd",
            },
            // 隐藏轴线
            axisLine: {
                show: false,
            },
            // 去除轴两端间距 留白
            boundaryGap: false,
        },
        yAxis: {
            type: "value",
            // 剔除刻度
            axisTick: {
                show: false,
            },
            // 文字颜色
            axisLabel: {
                color: "#4c9bfd",
            },
            // 分割线颜色
            splitLine: {
                lineStyle: {
                    color: "#012f4a",
                },
            },
        },
        series: [{
                name: "预期销售额",
                data: data.year[0],
                type: "line",
                smooth: true,
                itemStyle: {
                    color: "#00f2f1", // 线颜色
                },
            },
            {
                name: "实际销售额",
                data: data.year[1],
                type: "line",
                smooth: true,
                itemStyle: {
                    color: "#ed3f35", // 线颜色
                },
            },
        ],
        // 网格设置
        grid: {
            show: true,
            top: "20%",
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
            borderColor: "#012f4a",
        },
        // 工具提示
        tooltip: {
            trigger: "axis",
        },
        // 图例组件
        legend: {
            right: "10%",
            textStyle: {
                color: "#4c9bfd",
            },
        },
    };
    // 初始化echart
    var myChart = echarts.init($(".line").get(0));
    // 使用配置
    myChart.setOption(option);
    $(window).on("reszie", () => {
        myChart.resize();
    });

    // 切换功能
    // 2. 绑定点击事件（切换样式，切换图表数据）
    $(".sales").on("click", ".caption a", function() {
        $(this).addClass("active").siblings().removeClass("active");
        // 修改数据
        var currData = data[this.dataset.type];
        // currData 是数组  第一项 是第一条线的数据  第二项 是是第二条线的数据
        option.series[0].data = currData[0];
        option.series[1].data = currData[1];
        // 重新渲染 echarts图表
        myChart.setOption(option);
    });
    // 3. 开启定时器
    var $allA = $(".sales .caption a");
    var index = 0;
    var timer = setInterval(function() {
        index++;
        if (index >= 4) {
            index = 0;
        }
        // 切换图表
        $allA.eq(index).click();
    }, 1000);

    // 鼠标进入图表区域 清除定时器
    // 鼠标离开图表区域 重新开启定时器
    // mouseover 如果绑定事件的容器，有子容器一定会触发多次
    // mouseenter 不管有没有子容器 进入后移动 只会触发一次
    $(".sales")
        .on("mouseenter", function() {
            clearInterval(timer);
        })
        .on("mouseleave", function() {
            timer = setInterval(function() {
                index++;
                if (index >= 4) {
                    index = 0;
                }
                // 切换图表
                $allA.eq(index).click();
            }, 1000);
        });
    // hover 中两个函数  函数触发：mouseenter  mouseleave
    // $('.sales').hover(function(){
    //   console.log('ok')
    // },function(){})
})();

(function() {
    // 销售进度-饼状图
    var option = {
        series: [{
            name: "",
            type: "pie",
            radius: ["130%", "150%"],
            center: ["48%", "80%"],
            label: {
                show: false,
            },
            // 起始的角度
            startAngle: 180,
            // 鼠标经过没有 变大
            hoverOffset: 0,
            data: [{
                    value: 100,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "#00fffb" }, // 0 起始颜色
                                { offset: 1, color: "#0061ce" }, // 1 结束颜色
                            ]
                        ),
                    },
                },
                { value: 100, itemStyle: { color: "#12274d" } },
                { value: 200, itemStyle: { color: "transparent" } },
            ],
        }, ],
    };
    var myChart = echarts.init($(".gauge")[0]);
    myChart.setOption(option);
    $(window).on("reszie", () => {
        myChart.resize();
    });
})();

(function() {
    var data = {
        beijing: [
            { name: "可爱多", num: "9,086" },
            { name: "娃哈哈", num: "8,341" },
            { name: "喜之郎", num: "7,407" },
            { name: "八喜", num: "6,080" },
            { name: "小洋人", num: "6,024" },
            { name: "好多鱼", num: "2,170" },
        ],
        hebei: [
            { name: "喜之郎", num: "7,407" },
            { name: "可爱多", num: "7,086" },
            { name: "好多鱼", num: "6,475" },
            { name: "小洋人", num: "6,121" },
            { name: "娃哈哈", num: "3,142" },
            { name: "八喜", num: "2,060" },
        ],
        shanghai: [
            { name: "娃哈哈", num: "6,941" },
            { name: "八喜", num: "9,980" },
            { name: "好多鱼", num: "9,175" },
            { name: "可爱多", num: "8,326" },
            { name: "喜之郎", num: "7,907" },
            { name: "小洋人", num: "7,796" },
        ],
        jiangsu: [
            { name: "小洋人", num: "6,724" },
            { name: "八喜", num: "5,980" },
            { name: "娃哈哈", num: "5,391" },
            { name: "喜之郎", num: "4,417" },
            { name: "好多鱼", num: "3,170" },
            { name: "可爱多", num: "2,086" },
        ],
        shandong: [
            { name: "好多鱼", num: "5,770" },
            { name: "喜之郎", num: "5,407" },
            { name: "娃哈哈", num: "5,341" },
            { name: "小洋人", num: "3,794" },
            { name: "可爱多", num: "2,016" },
            { name: "八喜", num: "1,089" },
        ],
    };

    // 绑定事件
    $(".top").on("mouseenter", ".sup li", function() {
        $(this).addClass("active").siblings().removeClass("active");
        
        // 拼接字符串
        var html = '';
        var typeArr = data[$(this).data("city")];
        for(var i = 0; i < typeArr.length; i++){
            html += `<li><span>${typeArr[i].name}</span><span>${typeArr[i].num} <s class="icon-up"></s></span></li>`;
        }
        // 3. 渲染内容
        $(".sub").html(html);
    });
    // 默认触发一次事件
    var $lis = $(".top .sup li");
    $lis.eq(0).mouseenter();
    // 开启定时器
    var index = 0;
    setInterval(function() {
        index++;
        if (index >= 5) {
            index = 0;
        }
        $lis.eq(index).mouseenter();
    }, 2000);
})();

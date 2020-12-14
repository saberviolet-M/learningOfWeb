# 可视化项目

## 订单区域-布局

### html结构：

```html
<!-- 订单 -->
<div class="order panel">
    <div class="inner">
        <!-- 筛选 -->
        <div class="filter">
            <a href="javascript:;" class="active">365天</a>
            <a href="javascript:;">90天</a>
            <a href="javascript:;">30天</a>
            <a href="javascript:;">24小时</a>
        </div>
        <!-- 数据 -->
        <div class="data">
            <div class="item">
                <h4>20,301,987</h4>
                <span>
                    <i class="icon-dot" style="color: #ed3f35;"></i>
                    订单量
                </span>
            </div>
            <div class="item">
                <h4>99834</h4>
                <span>
                    <i class="icon-dot" style="color: #eacf19;"></i>
                    销售额(万元)
                </span>
            </div>
        </div>
    </div>
</div>
```

### css样式：

```css
/* 订单 */
.order {
  height: 6.167rem;
}
.order .filter {
  display: flex;
}
.order .filter a {
  display: block;
  height: 0.75rem;
  line-height: 1;
  padding: 0 0.75rem;
  color: #1950c4;
  font-size: 0.75rem;
  border-right: 0.083rem solid #00f2f1;
}
.order .filter a:first-child {
  padding-left: 0;
}
.order .filter a:last-child {
  border-right: none;
}
.order .filter a.active {
  color: #fff;
  font-size: 0.833rem;
}
.order .data {
  display: flex;
  margin-top: 0.833rem;
}
.order .item {
  width: 50%;
}
.order h4 {
  font-size: 1.167rem;
  color: #fff;
  margin-bottom: 0.417rem;
}
.order span {
  display: block;
  color: #4c9bfd;
  font-size: 0.667rem;
}
```

## 订单区域-效果

### 实现步骤：

- 提前准备数据
- 点击后切tab激活样式
- 点击后切换数据内容
- 开启定时器动态切换数据

```js
// 订单功能
(function(){
  // 1. 准备数据
  var data = [
   { orders: '20,301,987', amount: '99834' },
   { orders: '301,987', amount: '9834' },
   { orders: '1,987', amount: '3834' },
   { orders: '987', amount: '834' }
  ]
  
  // 获取显示 订单数量 容器
  var $h4Orders = $('.order h4:eq(0)')
  // 获取显示 金额数量 容器
  var $h4Amount = $('.order h4:eq(1)')
  
  $('.order').on('click', '.filter a', function(){
    // 2. 点击切换激活样式
    $(this).addClass('active').siblings().removeClass('active')
    // 3. 点击切换数据
    var currdata = data[$(this).index()];
    $h4Orders.text(currdata.orders)
    $h4Amount.text(currdata.amount)
      
    // 同步定时器中使用的index的值
    index = $(this).index();
  })
    
  // 4. 开启定时器切换数据
  var index = 0
  var $allTab = $('.order .filter a')
  setInterval(function(){
    index++ 
    if (index >= 4) index = 0
    $allTab.eq(index).click()
  },5000)
})();
```

## 销售统计-布局

### html结构：

```html
<!-- 销售额 -->
<div class="sales panel">
    <div class="inner">
        <div class="caption">
            <h3>销售额统计</h3>
            <a href="javascript:;" class="active" data-type="year">年</a>
            <a href="javascript:;" data-type="quarter">季</a>
            <a href="javascript:;" data-type="month">月</a>
            <a href="javascript:;" data-type="week">周</a>
        </div>
        <div class="chart">
            <div class="label">单位:万</div>
            <div class="line"></div>
        </div>
    </div>
</div>
```

### css样式：

```css
/* 销售区域 */
.sales {
  height: 10.333rem;
}
.sales .caption {
  display: flex;
  line-height: 1;
}
.sales h3 {
  height: 0.75rem;
  padding-right: 0.75rem;
  border-right: 0.083rem solid #00f2f1;
}
.sales a {
  padding: 0.167rem;
  font-size: 0.667rem;
  margin: -0.125rem 0 0 0.875rem;
  border-radius: 0.125rem;
  color: #0bace6;
}
.sales a.active {
  background-color: #4c9bfd;
  color: #fff;
}
.sales .inner {
  display: flex;
  flex-direction: column;
}
.sales .chart {
  flex: 1;
  padding-top: 0.6rem;
  position: relative;
}
.sales .label {
  position: absolute;
  left: 1.75rem;
  top: 0.75rem;
  color: #4996f5;
  font-size: 0.583rem;
}
.sales .line {
  width: 100%;
  height: 100%;
}
```

## 销售统计-线形图

### 实现步骤：

- 寻找官方的类似示例，给予分析。
  - [官方参考示例-在线链接](https://echarts.apache.org/examples/zh/editor.html?c=line-smooth)
- 在项目中使用起来。
- 按照需求来定制它。

### **第一步：**寻找官方的类似示例，给予分析。

```js
var option = {
    xAxis: {
        // 类目类型                                  
        type: 'category',
        // x轴刻度文字                                  
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        // 数据作为刻度文字                                  
        type: 'value'
    },
    series: [{
        // 数据                                  
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        // 图表类型                                  
        type: 'line',
        // 圆滑连接                                  
        smooth: true
    }]
};
```

### **第二步：**在项目中使用起来。

```js
(function () {
  var myChart = echarts.init($('.line')[0])
  
  // 上面配置项代码 ... 
  
  myChart.setOption(option)
})();
```

### **第三步：**按照需求来定制它。

定制需求：

- 设置自己的图表大小，

- 显示边框设置颜色：`#012f4a`，

- 包含刻度文字在内。

  ```js
  // 设置网格样式
  grid: {
    show: true,// 显示边框
    top: '20%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    borderColor: '#012f4a',// 边框颜色
    containLabel: true // 包含刻度文字在内
  },
  ```

- x轴的刻度去除，

- 隐藏坐标轴轴线[xAxis.axisLine. show](https://echarts.apache.org/zh/option.html#xAxis.axisLine.show)

- 刻度文字颜色：`#4c9bfd`，

- 轴两端是不需要内间距[boundaryGap](https://echarts.apache.org/zh/option.html#xAxis.boundaryGap)。

  ```diff
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  +      axisTick: {
  +        show: false // 去除刻度线
  +      },
  +      axisLabel: {
  +        color: '#4c9bfd' // 文本颜色
  +      },
  +      axisLine: {
  +	     show: false // 隐藏坐标轴轴线
  +	   },
  +      boundaryGap: false  // 去除轴内间距
      },
  ```

- y轴的刻度去除，

- 刻度文字颜色：`#4c9bfd`，

- y轴分割线颜色：`#012f4a`

  ```diff
      yAxis: {
        type: 'value',
  +      axisTick: {
  +        show: false  // 去除刻度
  +      },
  +      axisLabel: {
  +        color: '#4c9bfd' // 文字颜色
  +      },
  +      splitLine: {
  +        lineStyle: {
  +          color: '#012f4a' // 分割线颜色
  +        }
  +      }
      },
  ```

  ```diff
      series: [{
  +      name:'预期销售额',
  ```

- 显示图例组件（对图表的说明）, series数据必须有名称。

  ```js
  // 图例组件
  legend: {
      textStyle: {
          color: '#4c9bfd' // 图例文字颜色
      },
  	right: '10%' // 距离右边10%
  },
  ```

- 鼠标经过需要工具提示

  ```js
  // 工具提示
  tooltip:{
      trigger: 'axis'
  },
  ```

- 两条线形图颜色分别：`#00f2f1`  `#ed3f35`

  ```js
  series: [{
      name:'预期销售额',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      itemStyle: {
          color: '#00f2f1'  // 线颜色
      }
  },{
      name:'实际销售额',
      data: [100, 331, 200, 123, 233, 543, 400],
      type: 'line',
      smooth: true,
      itemStyle: {
          color: '#ed3f35'  // 线颜色
      }
  }]
  ```

- 套入数据

  ```js
  // x轴的文字
  xAxis: {
    type: 'category',
  - data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] 
  + data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  ```

  ```js
  // 图标数据
  series: [{
      name:'预期销售额',
      -      data: [820, 932, 901, 934, 1290, 1330, 1320],
      +      [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
  type: 'line',
      smooth: true,
      itemStyle: {
          color: '#00f2f1'  // 线颜色
      }
  },{
      name:'实际销售额',
          -      data: [100, 331, 200, 123, 233, 543, 400],
          +      [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
      type: 'line',
      smooth: true,
      itemStyle: {
          color: '#ed3f35'  // 线颜色
      }
  }]
  ```

总结：现在给的是年份数据，还需要切换效果。

## 销售统计-切换效果

### 实现步骤：

- 准备切换需要依赖的数据
- 绑定点击事件
  - 切换激活  tab  的样式
  - 切换图表依赖的数据
- 开启定时器，进行切换。

### 第一步：准备数据，使用数据

```js
var data = {
    year: [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
    ],
    quarter: [
        [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
        [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
    ],
    month: [
        [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
        [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
    ],
    week: [
        [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
        [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
    ]
}
```

```diff
    series: [{
      name:'预期销售额',
+      data: data.year[0],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#00f2f1'
      }
    },{
      name:'实际销售额',
+      data: data.year[1],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#ed3f35'
      }
    }]
```

### 第二步：点击后切换

```js
// 切换
$('.sales').on('click', '.caption a', function(){
    // 样式
    $(this).addClass('active').siblings().removeClass('active')

    // currData 当前对应的数据
    var currData = data[$(this).data("type")];
    // 修改图表1的数据
    option.series[0].data = currData[0]
    // 修改图表2的数据                  
    option.series[1].data = currData[1]
    // 重新设置数据  让图标重新渲染                  
    myChart.setOption(option)
    
    // 有个坑：
    // 同步定时器中使用的index的值, 当前点击的a下标有问题，结构导致的，下标从1开始的
    // 解决方案：
    	// 1. 优化结构
   		// 2. 在现有下标基础上 - 1;
})
```

### 第三步：自动切换

```js
// tab索引
var index = 0;
// 所有tab
var allTab = $('.sales .caption a')
setInterval(function () {
    index++
    // 大于等于4索引切换到0索引
    if (index >= 4) index = 0
    // 选中对应tab触发点击
    allTab.eq(index).click()
}, 1000)
```



## 渠道区域&销售进度-布局

### html结构：

```html
<!-- 渠道 季度 -->
<div class="wrap">
    <div class="channel panel">
        <div class="inner">
            <h3>渠道分布</h3>
            <div class="data">
                <div class="item">
                    <h4>39 <small>%</small></h4>
                    <span>
                        <i class="icon-plane"></i>
                        机场
                    </span>
                </div>
                <div class="item">
                    <h4>28 <small>%</small></h4>
                    <span>
                        <i class="icon-bag"></i>
                        商场
                    </span>
                </div>
            </div>
            <div class="data">
                <div class="item">
                    <h4>20 <small>%</small></h4>
                    <span>
                        <i class="icon-train"></i>
                        地铁
                    </span>
                </div>
                <div class="item">
                    <h4>13 <small>%</small></h4>
                    <span>
                        <i class="icon-bus"></i>
                        火车站
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="quarter panel">
        <div class="inner">
            <h3>一季度销售进度</h3>
            <div class="chart">
                <div class="box">
                    <div class="gauge"></div>
                    <div class="label">50<small> %</small></div>
                </div>
                <div class="data">
                    <div class="item">
                        <h4>1,321</h4>
                        <span>
                            <i class="icon-dot" style="color: #6acca3"></i>
                            销售额(万元)
                        </span>
                    </div>
                    <div class="item">
                        <h4>150%</h4>
                        <span>
                            <i class="icon-dot" style="color: #ed3f35"></i>
                            同比增长
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>   
```

### css样式：

```css
/* 渠道区块 */
.wrap {
  display: flex;
}
.channel,
.quarter {
  flex: 1;
  height: 9.667rem;
}
.channel {
  margin-right: 0.833rem;
}
.channel .data {
  overflow: hidden;
}
.channel .item {
  margin-top: 0.85rem;
}
.channel .item:first-child {
  float: left;
}
.channel .item:last-child {
  float: right;
}
.channel h4 {
  color: #fff;
  font-size: 1.333rem;
  margin-bottom: 0.2rem;
}
.channel small {
  font-size: 50%;
}
.channel span {
  display: block;
  color: #4c9bfd;
  font-size: 0.583rem;
}
/* 季度区块 */
.quarter .inner {
  display: flex;
  flex-direction: column;
  margin: 0 -0.25rem;
}
.quarter .chart {
  flex: 1;
  padding-top: 0.75rem;
}
.quarter .box {
  position: relative;
}
.quarter .label {
  transform: translate(-50%, -30%);
  color: #fff;
  font-size: 1.25rem;
  position: absolute;
  left: 50%;
  top: 50%;
}
.quarter .label small {
  font-size: 50%;
}
.quarter .gauge {
  height: 3.5rem;
}
.quarter .data {
  display: flex;
  justify-content: space-between;
}
.quarter .item {
  width: 50%;
}
.quarter h4 {
  color: #fff;
  font-size: 1rem;
  margin-bottom: 0.4rem;
}
.quarter span {
  display: block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #4c9bfd;
  font-size: 0.583rem;
}
```

### 销售进度-饼状图

### 实现步骤：

- 寻找官方的类似示例，给予分析。
  - [参考官方示例](https://echarts.apache.org/examples/zh/editor.html?c=pie-doughnut)
- 在项目中使用起来。
- 按照需求来定制它。

```js
var option = {
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
       		// 文本标签    
            label: {
                show: false,
            },
            data:[
                {value:100, name:'直接访问'},
                {value:100, name:'邮件营销'},
                {value:200, name:'联盟广告'}
            ]
        }
    ]
};
```

### **第二步**：使用起来

```js
// 销量进度-饼状图
(function () {
    var myChart = echarts.init($('.gauge')[0]);
	
    // 使用上面的配置项 ... 
    
    myChart.setOption(option)
})();
```

### **第三步**：进行定制

需求：改成半圆，大一些，让`75%`文字在中心。

```diff
  var option = {
    series: [
      {
        type: 'pie',
-        radius: ['50%', '70%'],
+        radius: ['130%', '150%'],  // 放大图形
+        center: ['48%', '80%'],    // 往下移动  套住75%文字
        label: {
          show: false,
        },
        startAngle: 180, // 起始角度，支持范围[0, 360]。
        data: [
-          { value: 100, name: '直接访问' },
-          { value: 100, name: '邮件营销' },
-          { value: 200, name: '联盟广告' }
+          { value: 100 }, // 不需要名称
+          { value: 100,}, // 不需要名称
+          { value: 200, itemStyle: { color: 'transparent' } } // 透明隐藏第三块区域
        ]
      }
    ]
  }
```

需求：

- 鼠标经过无需变大[hoverOffset](https://echarts.apache.org/zh/option.html#series-pie.hoverOffset)，
- 第一段颜色渐变 `#00c9e0` -> `#005fc1`，
- 第二段颜色`#12274d`。

```diff
+       hoverOffset: 0,  // 鼠标经过不变大
        data: [
          {
            value: 100,
+            itemStyle: { // 颜色渐变#00c9e0->#005fc1
+              color: {
+                type: 'linear',
+                x: 0,
+                y: 0,
+                x2: 0,
+                y2: 1,
+                colorStops: [
+                  { offset: 0, color: '#00c9e0' },
+                  { offset: 1, color: '#005fc1' }
+                ]
+              }
+            }
+          },  
+          { value: 100, itemStyle: { color: '#12274d' } }, // 颜色#12274d
```

总结：实现一个需求，需要去推导，具备推导的能力需要练习，时间问题。

## 热销排行-布局

### html结构：

```html
<!-- 排行榜 -->
<div class="top panel">
    <div class="inner">
        <div class="all">
            <h3>全国热榜</h3>
            <ul>
                <li>
                    <i class="icon-cup1" style="color: #d93f36;"></i>
                    可爱多
                </li>
                <li>
                    <i class="icon-cup2" style="color: #68d8fe;"></i>
                    娃哈啥
                </li>
                <li>
                    <i class="icon-cup3" style="color: #4c9bfd;"></i>
                    喜之郎
                </li>
            </ul>
        </div>
        <div class="province">
            <h3>各省热销 <i class="date">// 近30日 //</i></h3>
            <div class="data">
                <ul class="sup">
                    <li data-city="beijing">
                        <span>北京</span>
                        <span>25,179 <s class="icon-up"></s></span>
                    </li>
                    <li data-city="hebei">
                        <span>河北</span>
                        <span>23,252 <s class="icon-down"></s></span>
                    </li>
                    <li data-city="shanghai">
                        <span>上海</span>
                        <span>20,760 <s class="icon-up"></s></span>
                    </li>
                    <li data-city="jiangsu">
                        <span>江苏</span>
                        <span>23,252 <s class="icon-down"></s></span>
                    </li>
                    <li data-city="shandong">
                        <span>山东</span>
                        <span>20,760 <s class="icon-up"></s></span>
                    </li>
                </ul>
                <ul class="sub">
                    <!-- 动态内容 -->
                    <!-- <li><span></span><span> <s class="icon-up"></s></span></li> -->
                </ul>
            </div>
        </div>
    </div>
</div>
```

### css样式：

```css
/* 排行榜 */
.top {
  height: 11.8rem;
}
.top .inner {
  display: flex;
}
.top .all {
  display: flex;
  flex-direction: column;
  width: 7rem;
  color: #4c9bfd;
  font-size: 0.6rem;
  vertical-align: middle;
}
.top .all ul {
  padding-left: 0.5rem;
  margin-top: 0.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.top .all li {
  overflow: hidden;
}
.top .all [class^="icon-"] {
  font-size: 1.5rem;
  vertical-align: middle;
  margin-right: 0.5rem;
}
.top .province {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #fff;
}
.top .province i {
  padding: 0 0.5rem;
  margin-top: 0.208rem;
  float: right;
  font-style: normal;
  font-size: 0.583rem;
  color: #0bace6;
}
.top .province s {
  display: inline-block;
  transform: scale(0.8);
  text-decoration: none;
}
.top .province .icon-up {
  color: #dc3c33;
}
.top .province .icon-down {
  color: #36be90;
}
.top .province .data {
  flex: 1;
  display: flex;
  margin-top: 0.6rem;
}
.top .province ul {
  flex: 1;
  line-height: 1;
  margin-bottom: 0.25rem;
}
.top .province ul li {
  display: flex;
  justify-content: space-between;
}
.top .province ul span {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.top .province ul.sup {
  font-size: 0.583rem;
}
.top .province ul.sup li {
  color: #4995f4;
  padding: 0.5rem;
}
.top .province ul.sup li.active {
  color: #a3c6f2;
  background-color: rgba(10, 67, 188, 0.2);
}
.top .province ul.sub {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 0.5rem;
  background-color: rgba(10, 67, 188, 0.2);
}
.top .province ul.sub li {
  color: #52ffff;
  padding: 0.417rem 0.6rem;
}
.clock {
  position: absolute;
  top: -1.5rem;
  right: 1.667rem;
  font-size: 0.833rem;
  color: #0bace6;
}
.clock i {
  margin-right: 5px;
  font-size: 0.833rem;
}
@media screen and (max-width: 1600px) {
  .top span {
    transform: scale(0.9);
  }
  .top .province ul.sup li {
    padding: 0.4rem 0.5rem;
  }
  .top .province ul.sub li {
    padding: 0.23rem 0.5rem;
  }
  .quarter span {
    transform: scale(0.9);
  }
}
```

## 热销排行-效果

### **实现思路**：

- 准备假数据
- 当数据进入 tab 的时候
  - 激活当前的tab样式，删除其他tab的样式
  - 根据新数据拼接html格式字符串，进行渲染
- 默认激活第一个tab的效果
- 开启定时器，按顺便切换

### **开始实现**：

第一步：数据

```js
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
```

第二步：绑定鼠标经过事件，激活样式，根据随机数据渲染内容。

```js
$('.province').on('mouseenter', '.sup li', function(){
    // 样式
    $(this).addClass('active').siblings().removeClass('active')
    
    // 拼接字符串
    var html = '';
    var typeArr = data[$(this).data("city")];
    for(var i = 0; i < typeArr.length; i++){
    	html += `<li><span>${typeArr[i].name}</span><span>${typeArr[i].num} <s class="icon-up"></s></span></li>`;
    }
    
    // 渲染
    $('.sub').html(html)
})
```

第三步：默认激活第一个tab

```js
// 所有的li
var $lis = $('.province .sup li');

// 第一个默认激活
$lis.eq(0).mouseenter()
```

第四步：开启定时切换

```js
// 开启定时器 切换
var index = 0
setInterval(function () {
    index++
    // 大于等于5索引切换到0索引
    if (index >= 5) index = 0
    // 选中对应tab触发点击
    $lis.eq(index).mouseenter()
}, 1000)
```

## Echarts-社区介绍

> [社区](https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all)就是一些活跃的echart使用者，交流和贡献定制好的图表的地方。

![03](./media/03.png)

- 在这里可以找到一些基于echart的高度定制好的图表，相当于基于jquery开发的插件，这里是基于echarts开发的第三方的图表。

## Echarts-map使用（扩展）

参考社区的例子：https://gallery.echartsjs.com/editor.html?c=x2Ei_JbHZb

实现步骤：

- 第一需要下载[china.js提供中国地图的js文件](https://gallery.echartsjs.com/dep/echarts/map/js/china.js) ==> 在社区例子脚本下载
- 导入后，使用社区提供的配置即可。

```js
(function () {
    // 使用社区例子配置即可...
    var myecharts = echarts.init($('.map .geo')[0])
    myecharts.setOption(option)
})()
```

### 需要修改：

```diff
    geo: {
      map: 'china',
+      zoom: 1.2, // 放大地图
      label: {
        emphasis: {
          show: false
        }
      },
      roam: false,
      itemStyle: {
        normal: {
+          areaColor: '#142957', // 修改颜色
          borderColor: '#0692a4'
        },
        emphasis: {
          areaColor: '#0b1c2d'
        }
      }
    },
```






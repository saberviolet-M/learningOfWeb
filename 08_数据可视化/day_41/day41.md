# day41

## 数据可视化技术栈

- **C3**
  - 动画
  - 边框图片
- **原生JS+JQuery使用**
- **rem适配**
- **echarts基础**
  - 饼图
  - 柱状图
  - 线形图
  - 地图

## Echarts

> 开源可视化库（JS插件），底层依赖矢量图库**ZRender**

- **1、**`echarts.init(DOM对象)`创建实例对象，在该DOM对象中生成图表

  - PS：DOM对象必须具备**宽&高**

- ```js
  /*2、 指定图表的配置&数据 */
  let option = {
      title:{
          text:'标题内容',
          textStyle:{
          	/* 文本样式key-value */
      	}
      },
      tooltip:{/* 提示框组件(空对象为默认样式) */},
      legend:{
          /* 图例 */
          data:['图例']
      },
      xAxis:{
          /* x轴 */
          data:['x轴数据','x轴数据',……]
      },
      yAxis:{/* x轴 */}，
      series:[{
      	/* 系列图标(可生成多个图标) */
      	name: '同legend',
      	type: '图标类型',
      	data:['每点数据',……]
  	}]
  }
  ```

- **3、**`实例对象.setOption(option)`用**配置&数据**渲染图表

## rem适配（review）

> 相对单位，相对于html的fontSize		1rem === html的fontSize

- **方案一：**媒体查询+rem适配
- **方案二：**JS实现rem适配
  - 获取当前屏幕尺寸
  - 给html设置相对相应的fontSize

## C3边框图片

> ```css
> /* 合写 */
> border-image:source slice/width repeat;
> /* 有border才能设置边框图片 */
> ```

- **图片地址**

  ```css
  border-image-source:url();
  ```

- **图片切分**

  ```css
  border-image-slice:上 右 下 左;
  /* 不要带单位,可以是百分比，设置同margin、pading */
  ```

- **图片是否平铺**

  ```css
  border-image-repeat:stretch(默认-拉伸);
  /* round--平铺(平铺图片完整) repeat--平铺(会出现不完整图片)*/
  ```

- **图片宽度**

  ```css
  border-image-width:;
  /* 默认沾满边框，超过border大小会往容器中心扩展，类似背景图不影响内容，要带单位 */
  ```


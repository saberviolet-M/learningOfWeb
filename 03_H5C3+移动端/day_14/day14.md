# day14

## 2D转换

- ### 缩放（scale）

  - **scale()**指定对象的2D scale（2D缩放）。

    - 第**一**个参数（纯数字，表示倍数，没有单位，数值大于0）对应**X轴**，第二个参数（纯数字，表示倍数，没有单位，数值大于0）对应**Y轴**。
    - 如果第二个参数未提供，则默认取第一个参数的值（进行**等比例缩放**）
    - 默认转换原点为**中心点**

  - **scalex()** 

    - 指定对象X轴的（水平方向）缩放 

  - **scaley()**

    - 指定对象Y轴的（垂直方向）缩放 

  - ps：缩放时**不影响**(不会挤开)其他盒子

    ![scale](./media/scale.jpg)

- ### 平移（translate）

  - **translate()** 指定对象的2D translation（2D平移）。
    - 第一个参数（“数字”+px、百分比、百分比参照自身做出变化）对应**X轴**，第二个参数（“数字”+px、百分比、百分比参照自身做出变化）对应Y轴。
    - 如果第二个参数未提供，则默认值为0 
  - **translatex()**
    - 指定对象X轴（水平方向）的平移 
  - **translatey()**
    - 指定对象Y轴（垂直方向）的平移 
  - ps：平移时**不影响**(不会挤开)其他盒子

- ### 旋转（rotate）

  - **rotate()**指定对象的2D rotation（2D旋转）。

    - 参数为“数字”+deg（角度）

    - 正值表示顺时针

      ```css
      transform: rotate(360deg);
      ```

      ![rotate](./media/rotate.gif)

    - 负值表示逆时针

      ```css
      transform: rotate(-360deg);
      ```

      ![rotate逆](./media/rotate逆.gif)

  - ps：旋转时**不影响**(不会挤开)其他盒子

- ###transform连写

  - 以第一个属性为主要转换属性

    ```css
    transform: translate(200px) rotate(-360deg);
    ```

    ![tr](./media/tr.gif)

    ```css
     transform: rotate(-360deg) translate(200px);
    ```

    ![rt](./media/rt.gif)

- ###转换原点（transform-origin）

  - 可用百分比指定坐标值。可以为负值。 

  - 可用长度值指定坐标值。可以为负值。 

  - x轴

    - left： 指定原点的横坐标为left 
    - center①： 指定原点的横坐标为center 
    - right： 指定原点的横坐标为right 

  - y轴

    - top： 指定原点的纵坐标为top 

    - center②： 指定原点的纵坐标为center 

    - bottom： 指定原点的纵坐标为bottom 

    - ```css
      “相册”倒下时是transform-origin:bottom center;
      “相册”翻页时是transform-origin:left center;
      ```

    ![3d相册](./media/3d相册.gif)

## 3D转换

- ### 视距（perspective）

  - `perspective` 属性给父元素设置，可以让其子元素有近大远小的效果。

- ### 子元素空间内定位（transform-style）

  - flat：指定子元素位于此元素所在平面内 
  - preserve-3d：指定子元素定位在三维空间内 

- ### 3D旋转（rotate）

- ### 3D平移（translate）

## 动画效果

- ### 动画定义

- ### 动画调用

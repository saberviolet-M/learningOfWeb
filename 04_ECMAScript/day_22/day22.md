# day22

## 数组（Array）

> 作用：用来储存大量的数据
> 概念：一组**有序**的值的集合

### 数组の创建

- 字面量（直接量）

  > 值固定不变，浏览器可以直接识别的量

  ```js
  var arr = [];---空数组
  var arr = [数据, 数据, 数据……];---创建数组并赋值
  ```

  ![数组创建](D:\1_2020Web\Note\04_ECMAScript\day_22\media\数组创建.jpg)

- 构造函数的方法

  ```js
  var arr = new Array();---空数组
  var arr = new Array(数据, 数据, 数据……);---创建数组并赋值
  
  //构造函数的坑
  var arr = new Array(数字值);---表示数组中存储了`数字值`个`空`数据
  ```
  
  ![数组创建_构造函数](D:\1_2020Web\Note\04_ECMAScript\day_22\media\数组创建_构造函数.jpg)

### 数组の数据

- 长度

  > 当前数组的数据个数

  ```js
  数组名.length---数组长度
  var arr = new Array(100);
  console.log(arr.length);
  ```

  ![数组长度](D:\1_2020Web\Note\04_ECMAScript\day_22\media\数组长度.jpg)

- 索引（下标）

  > 对于数组中的每一个数据**有且只有唯一个**下标数字与数组数据对应

  - 数组索引:

    - 最小值(min)---0;
    - 最大值(max)---length-1（数组长度-1）;

    ![数组下标](D:\1_2020Web\Note\04_ECMAScript\day_22\media\数组下标.jpg)

  

- 取值

  > 可以根据索引值取数

  - ps：如果下标**存在**，返回存在值；如果下标**不存在**，返回undefined。

    ```js
    var arr = ['red', 'blue', 'yellow', 'green', 'violet'];
    console.log(arr[4]);
    console.log(arr[5]);
    ```

    ![数组索引](D:\1_2020Web\Note\04_ECMAScript\day_22\media\数组索引.jpg)

- 存值

  > 数组名[下标] = 值;

  - ps：如果下标**存在**，赋值时会覆盖原有的数据；如果下标**不存在**，则会创建新项。

    ```js
    var arr = ['red', 'blue', 'yellow', 'green', 'violet'];
    console.log('存值之前' + arr[4]);
    console.log('存值之前' + arr[5]);
    arr[4] = 'tomato';
    arr[5] = 'skyblue';
    console.log('存值之后' + arr[4]);
    console.log('存值之后' + arr[5]);
    ```

    ![存值](D:\1_2020Web\Note\04_ECMAScript\day_22\media\存值.jpg)

  - ps：存储在数组**末尾**时候可以`数组名[数组名.length] = 值;`

    ```js
    var arr = ['red', 'blue'];
    console.log(arr);
    arr[arr.length] = 'tomato';
    console.log(arr);
    arr[arr.length] = 'skyblue';
    console.log(arr);
    ```

    ![数组赋值](D:\1_2020Web\Note\04_ECMAScript\day_22\media\数组赋值.jpg)

  - 往数组最后添加数据的方法

    ```js
    数组名.push(数据);---在数组末尾添加数据
        var arr = ['green', 'yellow'];
        console.log(arr);
        arr.push('purple');
        console.log(arr);
        arr.push('limegreen');
        console.log(arr);
    ```
    
    ![push](D:\1_2020Web\Note\04_ECMAScript\day_22\media\push.jpg)

- 遍历

  > 访问数组中的**所有**项数据

  ```js
  //正序(正向)遍历
  for(var i = 0; i < 数组.length; i++){
      console.log(数组[i]);
  }
  //-----------------------------------------
  var arr = [1, 2, 3, 4, 5, 6];
  for (var i = 0; i < arr.length; i++) {
      console.log(arr[i]);
  }
  ```

  ![正向](D:\1_2020Web\Note\04_ECMAScript\day_22\media\正向.jpg)

  ```js
  //倒序(反向)遍历
  for(var i = 数组.length; i >= 0; i--){
      console.log(数组[i]);
  }
  //------------------------------------------
  var arr = [1, 2, 3, 4, 5, 6];
  for (var i = arr.length - 1; i >= 0; i--) {
      console.log(arr[i]);
  }
  ```

  ![反向](D:\1_2020Web\Note\04_ECMAScript\day_22\media\反向.jpg)

- 数组取最大值

  ```js
  var max = 数组名[0];
  for(var i = 0; i < 数组名.length; i++){
      if(数组名[i] > max){
          max = 数组名[i];
      }
  }
  //------------------------------------------
  var arr = [1, 3, 4, 2];
  var max = arr[0];
  for (var i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
          max = arr[i];
      }
  }
  console.log(max);
  ```

  ![max](D:\1_2020Web\Note\04_ECMAScript\day_22\media\max.jpg)

- 数组取最小值&位置

  ```js
  var min = 数组名[0];---取最小值
  var min_index = 0;---存储下标(位置)
  for(var i = 0; i < 数组名.length; i++){
      if(数组名[i] < min){
          min = 数组名[i];
          min_index = i;
      }
  }
  //----------------------------------------------
  var arr = [3, 1, 4, 2];
  var min = arr[0];
  var min_index = 0;
  for (var i = 0; i < arr.length; i++) {
      if (arr[i] < min) {
          min = arr[i];
          min_index = i;
      }
  }
  console.log(min);
  console.log('数组中的下标' + min_index);
  ```
  
  ![min-index](D:\1_2020Web\Note\04_ECMAScript\day_22\media\min-index.jpg)

### 冒泡排序

- 排序：让一组没有顺序的数字，经过排列，排成一组有顺序的数字

  > `[3,2,4,1,5,7,9,8,6]`——》`[1,2,3,4,5,6,7,8,9]` ——》从小到大排序（升序）

- 冒泡：指的是排序的方式，小的在前面，大的在后面

  > 思路：两两比较，让较大的放到后面，一趟下来可以求出一个最大值。

  ![Bubble-sort](D:\1_2020Web\Note\04_ECMAScript\day_22\media\Bubble-sort.gif)

- 冒泡排序法的铺垫

  > 冒泡排序原理：两两比较，让大的数往后沉

  - 交换两个变量的值

    ```js
    var num1 = 11;
    var num2 = 22;
    console.log('变化前' + num1);
    console.log('变化前' + num2);
    var temp = num1;
    num1 = num2;
    num2 = temp;
    console.log('变化后' + num1);
    console.log('变化后' + num2);
    ```

    ![交换数值](D:\1_2020Web\Note\04_ECMAScript\day_22\media\交换数值.jpg)

  - 让数组中的最大值排到最后

    > 两两比较，让大的数往后沉，数组从前往后执行一趟，得到一个最大值在最后

    1. 遍历数组

    2. 让 arr[i] 和 arr[i+1] 比较

       > 让当前元素与后一个比较

    3. 如果 arr[i] > arr[i+1]，表示前面的比后面的大，此时交换位置（往后沉）

    ```js
    //     1、遍历数组
    //     2、让 arr[i] 和 arr[i+1] 比较
    //     3、如果 arr[i] > arr[i+1], 表示前面的比后面的大，此时交换位置
    var arr = [7, 6, 5, 4, 3, 2, 1];
    
    for (var i = 0; i < arr.length - 1; i++) {
        // 让 arr[i] 和 arr[i+1] 比较
        if (arr[i] > arr[i + 1]) {
            // 交换位置
            var temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }
    console.log(arr);
    ```

  ##### ------------------------

  ##### 冒泡排序初级版本

  > 两两比较，让大的数往后沉，数组从前往后执行一趟，得到一个最大值在最后
  >
  > 执行几趟（0~arr.length-1趟），就得到了很多最大值，排列就完成了

  ```js
  var arr = [7, 6, 5, 4, 3, 2, 1];
  // 外层for控制趟数, 7个数, 只需要比6趟即可
  for (var j = 0; j < arr.length - 1; j++) {
      // 一趟下来, 比出一个最大值, 7个数, 两两比较, 比6次即可
      for (var i = 0; i < arr.length - 1; i++) {
          // 让 arr[i] 和 arr[i+1] 比较
          if (arr[i] > arr[i + 1]) {
              // 交换位置
              var temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
          }
      }
  }
  console.log(arr);
  ```

  ##### 冒泡排序的中级版本

  > 优化点：每一趟比较之后，都可以比上一趟少比较一次

  ```js
  var arr = [7, 6, 5, 4, 3, 2, 1];
  for (var j = 0; j < arr.length - 1; j++) {
      // 每趟下来, 比上一趟少一次，累计每一趟可以少比较j次
      for (var i = 0; i < arr.length - 1 - j; i++) {
          if (arr[i] > arr[i + 1]) {
              var temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
          }
      }
  }
  console.log(arr);
  ```

  

  ##### 假设成立法

  > 对于某一些问题来说，可以先假设结果成立，然后找**反例**的情况

  ```js
  // 1.判断数组是否全是偶数
  //   思路：先假设数组中全是偶数true，如果发现有奇数，那么假设错误为false，就不全是偶数
  // 2.判断数组, 是否已经从小到大排好的
  //   思路：先假设已经排好了true，如果一趟比较下来进行了交换，则此时知道还没比好
  ```

  ##### ------------------------

  ##### 冒泡排序法的高级版本

  > 优化点：以下特殊情况
  >
  > - 如果数组本身排好序的，那么不需要排很多次
  > - 如果数组第一趟下来就排好了，后面的不需要排了
  >
  > 假设成立法：假设这一趟已经排好了（那么一趟下来不会交换），设置变量flag=true，当交换的时候设置flag=false。
  >
  > - 如果真的排好了，一趟下来flag还是true，此时结束循环break
  > - 如果还没排好，一趟下来flag会改成false，此时不执行break

  ```js
  var arr = [7, 6, 5, 4, 3, 2, 1];
  for (var j = 0; j < arr.length - 1; j++) {
      var flag = true;// 假设这一趟已经排好的，true
      for (var i = 0; i < arr.length - 1 - j; i++) {
          if (arr[i] > arr[i + 1]) {
              var temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
              flag = false; // 只要交换位置，表示这一趟还没排好，下一次继续
          }
      }
      if(flag) {
          break;// 如果flag在这一趟下来没有改变，还是true，说明已经排好，此时结束循环
      }
  }
  console.log(arr);
  ```

  
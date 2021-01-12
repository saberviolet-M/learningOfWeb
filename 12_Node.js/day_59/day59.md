# day59

## SQL语句

> SQL(英文全称:Structured Query Language)是**结构化查询语言**，专门用来访问和处理数据库的编程语言

- SQL 是一门数据库编程语言
- 使用 SQL 语言编写出来的代码，叫做 SQL 语句
- SQL 语言只能在关系型数据库(例如 MySQL、Oracle、SQL Server)中使用
- 非关系型数据库(例如 Mongodb) 不支持 SQL 语言

### 数据查询

#### 语法

- `-- 注释`注释（横杠和注释之间有空格）

- SQL语句，**不区分**大小写

- **字符串类型**需要引号包裹

  ```sql
  -- 基本的查询语法
  SELECT 字段1,字段2,... FROM 表名
  select 字段1,字段2,.... from 表名
  
  -- 查询所有的字段
  SELECT * FROM 表名
  
  -- 带条件的查询
  SELECT * FROM 表名 [WHERE 条件] [ORDER BY 排序字段[, 排序字段]] LIMIT [开始位置,]长度
  
  ```

  ![where](./media/where.jpg)

  ```sql
  -- 查询id小于10的英雄
  select * from heroes where 条件
  select * from heroes where id<10
  
  -- 查询id小于20的女英雄
  select * from heroes where id<20 and sex='女'
  
  -- 查询年龄大于等于20小于等于30的英雄
  select * from heroes where age>=20 and age<=30
  select * from heroes where age between 20 and 30
  ```

#### 模糊查询

通配符:

- %: 代表任意长度(包括0)的任意字符

- _:  代表1位长度的任意字符

- like: 用**like**匹配模糊查询（字符串）

  ```sql
  -- 查询名字中带有 “斯” 的英雄
  select * from heroes where name like '%斯%'
  
  -- 查询名字的最后一个字是 “斯” 的英雄
  select * from heroes where name like '%斯'
  
  -- 查询名字中带有 “斯” ，并且要求 “斯”前面只能有一个字的英雄
  select * from heroes where name like '_斯%'
  ```

#### 统计查询

- max  查询最大值 `select max(age) from heroes`
- min  查询最小值 `select min(age) from heroes`
- avg  查询平均值 `select avg(age) from heroes`
- sum 查询总和（查询所有英雄的年龄之和） `select sum(age) from heroes`
- count 查询总记录数（查询共计有多少个英雄） `select count(*) cc【count(*)列表别名】 from heroes`

#### 查询结果排序

> order by 可以对查询结果按某个字段进行升序或者降序排列
>
> 可进行排序的字段通常是  整型  英文字符串型  日期型  (中文字符串也行,但一般不用)
>
> **注意：如果SQL语句中，有where和order by，where一定要放到order by之前**

- 升序 asc （默认值）

- 降序 desc 

  ```sql
  -- select * from heroes order by 排序字段 asc/desc
  -- asc 默认值，可以省略，表示升序
  -- desc，表示降序
  
  -- 查询所有的英雄，按年龄升序排序
  select * from heroes order by age asc
  select * from heroes order by age
  
  -- 查询所有的英雄，按年龄降序排序
  select * from heroes order by age desc
  
  -- 查询所有的英雄，先按年龄降序排序；如果年龄相同的，再按id降序排序
  select * from heroes order by age desc, id desc
  
  -- 查询年龄大于50岁的英雄，并按年龄降序排序
  select * from heroes where age>50 order by age desc
  ```

#### 限制查询结果

> limit 用来限制查询结果的起始点和长度
>
> **注意：where、order by、limit如果一起使用，是有顺序的，where在最前面、其次是order by、limit要放到最后**
>
> **另外三者之间没有and之类的**

**格式：**limit  start, length

- start: 起始点

  - 查询结果的索引，从0开始
  - 0代表第一条数据， 如果省略start，则默认表示从0

- length: 长度

  ```sql
  -- 查询所有英雄中前5个英雄
  -- select * from heroes limit 起始位置, 长度
  select * from heroes limit 0, 5
  select * from heroes limit 5
  
  -- 查询所有英雄中，第6到10个英雄
  select * from heroes limit 5, 5
  
  -- 查询年龄最大的3个英雄
  select * from heroes order by age desc limit 3
  
  -- 查询年龄最大的3个女英雄
  select * from heroes where sex='女' order by age desc limit 3
  ```

#### 连接查询

> 当一张表中的数据不能满足我们查询数据的需求时，我们要考虑多个表进行连接查询

```sql
-- MySQL中的连接查询
-- 能够连接查询的两张或多张表，必须有关系才行

-- 语法
select 字段 from 表1 join 表2 on 两表的关系 [where ... order by .... limit ...]

select 字段 from 表1 join 表2 on 两表的关系 join 表3 on 表的关系 .... [where ... order by .... limit ...] 

select * from student join teacher on student.teacher_id=teacher.Id

-- 给表名定义别名，简化SQL
select * from student s join teacher t on s.teacher_id=t.Id 

-- 指定字段查询
select s.id, s.name, s.age, s.sex, t.name teacher_name from student s join teacher t on s.teacher_id=t.Id 
```

#### 添加数据

> 基本的格式： insert  into  表名 .....

- **方式一**：指定字段和值，只要字段和值对应即可，和顺序无关

  ```sql
  insert into heroes (字段, 字段, ...) values (值, 值, ...)
  insert into heroes (nickname, age, name) values ('虚空恐惧', 98, '科加斯')
  ```

- **方式二**：和顺序有关，因为没指定字段，所以值必须是所有的值，而且顺序和表中字段的顺序要一致

  ```sql
  insert into heroes values (null, '拉克丝', '光辉女郎', '女', 28)
  ```

- **方式三**：使用set里设置新数据的值，没有顺序关系

  ```sql
  insert into heroes set 字段=值, 字段=值, ....
  insert into heroes set name='李青', nickname='盲僧'
  ```

#### 修改数据

> 格式:  
>
>   `update  表名   set   字段1=值1, 字段2=值2,...  where  修改条件` 
>
> 修改表中的哪一条（几条）数据的 字段1=值1...
>
> 不指定修改条件会修改所有的数据

```sql
-- 加条件修改
update heroes set age=28, skill='在地上打滚' where id=19
-- 如果不指定条件，则会修改所有的行
update heroes set sex='妖'
```

#### 删除数据

> 格式:  delete  from 表名  where 删除条件
>
> 注意：不指定条件将删除所有数据

```sql
delete from heroes where id=19
-- 不加条件，将删除所有的数据，危险操作
delete from heroes
```

## node中的MySQL模块

> mysql模块是一个第三方模块，专门用来操作MySQL数据库
>
> 可以执行增删改查操作

```shell
# 如果前面没有安装过其他模块，需要先初始化
npm i mysql
```

- curd: 就代表数据库的增删改查

- c: create 就是添加 （增）

- u: update 就是修改 （改）

- r: read 就是查询 （查）

- d: delete 就是删除 （删）

### mysql模块的使用步骤

- 1、加载 MySQL 模块

- 2、创建 MySQL 连接对象

- 3、连接 MySQL 服务器

- 4、执行SQL语句           

- 5、关闭链接  

```js
// 1. 加载mysql模块
const mysql = require('mysql')
// 2. 创建连接对象（设置连接参数）
const conn = mysql.createConnection({
    // 属性：值
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: '【要连接的数据库名】'
})

// 3. 连接到MySQL服务器
conn.connect()

// 4. 完成查询（增删改查）
conn.query(SQL语句, [SQL中占位符的值], (err, result, fields) => {
    err: 错误信息
    result: 查询结果
    fields: 当前查询过程中涉及到的字段信息，一般用不着
})

// 5. 关闭连接，释放资源
conn.end()
```

### 占位符模式的增删改查

#### 什么是占位符

> SQL中的“?” 就是占位符

- `select * from heroes where id > ?`
- `insert into heroes set ?`
- `update heroes set ? where id = ?`
- `delete from heroes where id = ?`

#### 如何为占位符传值

> 当SQL语句中使用了占位符，则query方法需要使用参数2为这些占位符传递实际的值
>
> 并且不同的 "？" 需要的值格式也不同

- SQL中有 1 个占位符，则query方法的第二个参数设置为一个**值**

- SQL中有 多 个占位符，则query方法的第二个参数设置为**数组**，数组中的值**按顺序**分别传递给每个占位符

- SQL中，如果 `字段=值,字段=值...`使用 “?” 站位了，则需为这个 “?” 传递一个对象，例如

  ```js
  let val = {
      // 字段: 值
      name: '压缩',
      nickname: '疾风剑豪',
      // 其他...
  }
  ```

#### 有占位符的增删改查

```js
// 例子一：查询id小于3的英雄
let sql = 'select * from heroes where id < ?'
conn.query(sql, 3, (err, result) => {
    if (err) throw err
    console.log(result)
})
```

```js
// 例子二：查询id小于3的女英雄
let sql = 'select * from heroes where id < ? and sex = ?'
conn.query(sql, [3, '女'], (err, result) => {
    if (err) throw err
    console.log(result)
})
```


```js
// 例子三：SQL中的 "字段=值, 字段=值..."的位置使用了一个占位符，则需为该占位符传递一个对象
// 如果SQL语句中有  字段=值, 字段=值, ....  可以使用一个 ? 表示；并且要为这个问号传递一个对象
let sql = 'insert into heroes set ?'
let values = {
    // 字段: 值
    name: '艾克',
    nickname: '时间刺客',
    age: 34
}
conn.query(sql, values, (err, result) => {
    if (err) throw err
    // console.log(result)
    if (result.affectedRows > 0) {
        console.log('添加成功，最新添加的id为：' + result.insertId)
    } else {
        console.log('添加失败')
    }
})
```

```js
// 例子四：
// SQL中有两个占位符，所以要传递一个数组
// 第1个问号表示 “字段=值, 字段=值...”，所以为这个问号传递一个对象
let sql = 'update heroes set ? where id = ?'
let values = {
    skill: '时光倒流',
    sex: '男'
}
conn.query(sql, [values, 36], (err, result) => {
    if (err) {
        console.log('修改失败')
    } else {
        console.log('修改成功')
    }
})
```


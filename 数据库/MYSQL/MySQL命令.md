## MYSQL登录信息

host：localhost

用户名：root

密码：MYSQL

## 操作数据库

创建一个数据库，名为mydb1；

```sql
create database mydb1;
```

创建一个数据库，名为mydb2，设置他的默认编码为gbk

```sql
create database mydb2 character set gbk;
```

查询当前服务器中的所有数据库；

```sql
show databases;
```

查询已创建的数据库mydb2的定义信息

```sql
show create database mydb2;
```

删除数据库mydb3；

```sql
drop database mydb3;
```

将数据库mydb2的字符编码改为utf8

```sql
alter database mydb2 character set utf8;
```

查询当前正在使用的数据库；

```sql
select database();
```

切换使用数据库为mydb2

```sql
use mydb2;
```



## 操作数据表

创建一个表，名为user，具有三个属性

```sql
create table user(
 name varchar(10),
 age int,
 sex char
)
```

显示当前数据库中所有的表

```sql
show tables;
```

查看表user的字段信息

```sql
desc user;
```

为user表添加一个int类型的id列

```sql
alter table user add id int;
```

将user表上的id列的字段类型改为char

```sql
alter table user modify id char;
```

删除user表上的id列

```sql
alter table user drop id;
```

将user表的表名更改为aaa

```sql
rename table user to aaa;
```

显示表aaa的创建信息

```sql
show create table aaa; 
```

将表aaa的字符编码更改为gbk

```sql
alter table aaa character set gbk;
```

将aaa表中的name列改名为username，字段类型为varchar

```sql
alter table aaa change name username varchar(100)
```

删除当前数据库中的aaa表

```sql
desc aaa;
drop table aaa;
```

## 操作表数据

创建一个表

```sql
create table emp(
   id int,
   name varchar(100),
   gender varchar(100),
   birthday date,
   salary float(10,2),
   entrydate date,
   resume text
)
```

单行插入数据

```sql
insert into emp(id,name,gender,birthday,salary,entrydate,resume) values(1,'zs','n','1995-5-10',10000,'2015-5-5-','good girl');
```

多行插入数据

```sql
insert into emp values

(2,'ls','m','1995-6-10',10400,'2015-5-5-','good boy'),

(3,'ww','n','1995-7-10',10500,'2015-5-5-',null),

(4,'gq','m','1995-8-10',16500,'2015-5-5-',null),

(5,'mz','n','1995-9-10',10700,'2015-5-5-',null)


```

查询表中的所有数据

```sql
select * from emp;
```

修改数据库安全模式

MySql运行在safe-updates模式下，该模式会导致非主键条件下无法执行update或者delete命令，执行命令SET SQL_SAFE_UPDATES = 0;修改下数据库模式

```sql
set SQL_SAFE_UPDATES = 0;
```

更新所有数据的指定项

```sql
update emp set salary=5000;
```

更新zs的指定项数据

```sql
update emp set salary=3000 where name='zs';
```

更新ls的salary和gender

```sql
update emp set salary=3000,gender='n' where name='ls';
```

更新使ww的工资增加1000

```sql
update emp set salary=salary+1000 where name='ww';
```

删除表中满足条件的一项

```sql
delete from emp where name='zs';
```

删除表中的据，表的结构还在；并且删除后的数据还可以找回

```sql
delete from emp;
```

直接把表drop掉，然后在创建一个新的空表，删除速度比delete块，但是删除的数据不能找回。

```sql
truncate table emp;
```

## 查询表操作

DQL数据查询语言

数据库执行DQL语句不会对数据进行改变，而是让数据库发送结果集到客户端。

查询结果返回的是一张虚拟表。

查询语句书写顺序：

```
select -> form -> where -> group by -> having -> order by -> limit
```

查询语句执行顺序：

```
from -> where -> group by -> having -> select -> oder by -> limit
```

语法：

select 列名 from 表名

【where>group by>having>order by】

from：指定要查询的表名称

where：行条件

group by：对结果分组

having：分组后的航条件

order by：对结果分组

limit：结果限定。



### 实例:

创建表

```sql
create table stu(
   sid char(6),
   sname varchar(50),
   age int,
   gender varchar(50)
)
```

初始化表数据

```sql
insert into stu values

('s_1001','ly',35,'m'),

('s_1002','cg',15,'n'),

('s_1003','zs',95,'n'),

('s_1004','ls',65,'m'),

('s_1005','ww',55,'n'),

('s_1006','zl',75,'m'),

('s_1007','sq',25,'m'),

('s_1008','zb',45,'n'),

('s_1009','wj',85,'m'),

('s_1010','gs',5,'n'),

('s_1011','xxx',null,null);
```

创建表emp

```sql
create table emp(
	empno int,
   ename varchar(50),
   job varchar(50),
   mgr int,
   hiredate date,
   sal decimal(7,2),
   comm decimal(7,2),
   deptno int
)
```

添加表数据

```sql
insert into emp values
(7369,'smith','clerk',7902,'1980-12-17',800,null,20),
(7499,'allen','salesman',7698,'1980-12-17',1600,300,30),
(7521,'word','salesman',7698,'1980-12-17',1250,500,30),
(7566,'jones','manager',7839,'1980-12-17',2975,null,20),
(7654,'martin','salesman',7698,'1980-12-17',1250,1400,30),
(7698,'blake','manager',7839,'1980-12-17',2850,null,30),
(7782,'clark','manager',7839,'1980-12-17',2450,null,10),
(7788,'scott','analyst',7566,'1980-12-17',3000,null,20),
(7839,'king','president',null,'1980-12-17',5000,null,10),
(7844,'turner','salesman',7698,'1980-12-17',1500,0,30),
(7876,'adams','clerk',7788,'1980-12-17',1100,null,20),
(7900,'james','clerk',7698,'1980-12-17',950,null,30),
(7902,'ford','analyst',7566,'1980-12-17',3000,null,20),
(7934,'miller','clerk',7782,'1980-12-17',1300,null,10);
```

创建表dept

```sql
create table dept(
	deptno int,
   dname varchar(14),
   loc varchar(13)
)
```

添加表数据

```sql
insert into dept values
(10,'accounting','new York'),
(20,'research','dallas'),
(30,'sales','chicago'),
(40,'operations','boston');
```



#### 基础查询

```sql
select * from stu;
select * from emp;
select * from dept;
-- 查询所有列
select sid,sname,age from stu;
-- 查询指定列
```

#### 条件查询

```sql
select * from stu where gender='n' and age<50;
-- AND查询条件

select * from stu where sid='s_1001' or sname='ls';
-- OR查询条件

select * from stu where sid in ('s_1001','s_1002','s_1003');
-- IN查询条件

select * from stu where sid not in ('s_1003');
-- NOT IN查询条件

select * from stu where age is null;
-- null查询条件

select * from stu where age>20 and age<40;
-- where and 查询

select * from stu where age between 20 and 40;
-- between and 区间查询条件

select * from stu where gender!='m';
select * from stu where gender<>'m';
select * from stu where not gender='m';
-- 逻辑非查询条件（！，<>，not）

select * from stu where sname is not null;
select * from stu where not sname is null;
-- 非空查询条件
```

#### 模糊查询

模糊查询需要使用关键字`like`。

通配符：

_	：任意一个字符

%	：任意0~n个字符

```sql
select * from stu where sname like '__';
select * from stu where sname like '_s';
-- '_'通配符查询条件
select * from stu where sname like 'z%';
select * from stu where sname like '_s%';
select * from stu where sname like '%s%';
-- '%'通配符查询条件
```

#### 字段控制查询

```sql
select distinct sal from emp;
-- distinct去除重复记录查询

-- 任何东西与null相加结果还是null
select *,sal+comm from emp;
-- 添加一个加运算的字段，如果有一个为空，则相加为空

-- ifnull可以判断是否null时应该返回什么值
select *,sal+ifnull(comm,0) from emp;
-- ifnull将空判断为0，方便相加

select *,sal+ifnull(comm,0) as total from emp;
-- as为加运算添加别名，as可以省略
```

#### 排序查询

```sql
select * from stu order by age;
select * from stu order by age asc;
select * from stu order by age desc;
-- 为查询结果排序，默认为asc，asc升序，desc降序

select * from emp order by sal desc,empno asc;
-- 优先级排序，在前面的优先排序
```

#### 聚合查询

count（）：统计指定列不为null的记录行数。

max/min（）：指定列的最大/小值，如果是字符串，就用字符串排序运算

sum（）：计算指定列的数值和，如果指定列不是数值类型，则计算结果为0

avg（）：计算指定列的平均值，如果不是数值类型，那么计算结果为0

```sql
select count(*) from emp;
select count(comm) from emp;
select count(*) from emp where sal+ifnull(comm,0)>2500;
-- 查询满足条件的的项数，null不算

select sum(sal) from emp;
select sum(sal),sum(comm) from emp;
-- 返回查询指定项的总和

select avg(sal) from emp;
-- 返回查询项的平均值

select max(sal),min(sal) from emp;
-- 查询最大值和最小值
```

#### 分组查询

```sql
select deptno,sum(sal) from emp group by deptno;
select deptno,count(*) from emp group by deptno;
select deptno,count(*) from emp where sal>1500 group by deptno;
-- 分组查询

select deptno,sum(sal) from emp group by deptno having sum(sal)>9000;
-- having子句查询过滤
```

having和where的区别：

1. having是在分组后对数据进行过滤，where是在分组前进行过滤
2. having后面可以使用聚合函数（统计函数），where后面不可以使用聚合函数。

where是分组前记录的条件，如果某行记录没有满足where子句的条件，那么这行数据不会参加分组；而having是对分组后数据的约束。

#### 限制查询

```sql
select * from emp limit 0,5;
-- 限制查找的区间范围0-5
```

## 数据完整性

作用：保证用户输入到数据库的数据是正确的。

确保数据的完整性 = 在创建表时给表添加约束

完整性的分类：

\>实体完整性

\>域完整性

\>引用完整性

### 一、实体完整性

实体：即表中的一行代表一个实体；

实体完整性的作用：标识每一行数据不重复；

约束类型：主键约束，唯一约束，自动增长列

#### 1.主键约束

特点：数据唯一，且不能为null。

方式一：

```sql
create table sss(
   id int primary key,
   name varchar(50)
)
```

方式二：

```sql
create table sss(
   id int,
   name varchar(50),
   primary key(id)
)
```

方式三：

```sql
create table sss(
   id int,
   name varchar(50)
)
alter table sss add primary key(id);
```

#### 2.唯一约束（unique）

```sql
create table sss(
   id int primary key,
   name varchar(50) unique
)
```

#### 3.自动增长列

```sql
create table sss(
   id int primary key auto_increment,
   name varchar(50)
)
insert into sss(name) values('tom');
```

### 二、域完整性

作用：限制此单元格的数据正确，不对照此列的其他单元格比较域代表当前单元格。

域完整性约束：数据类型、非空约束（not null）、默认值约束（default）、

check约束（mysql不支持）、check（）

#### 1.非空约束

```sql
create table sss(
   id int primary key auto_increment,
   name varchar(50) not null
)
```

#### 2.默认值约束

```sql
create table sss(
   id int primary key auto_increment,
   name varchar(50),
   sex varchar(10) default '男'
)
```








在路由页users.js中这顶API接口



1. 引入mysql模块

   ```
   var mysql = require('mysql');
   ```

2. 使用数据库配置信息连接数据库

   ```
   var connection=mysql.createConnection({
   	host:'127.0.0.1',
       user:'root',
       password:'123456',
       database:'expressdb',
       port:3306
   });
   ```

3. 使用数据库连接与参数获取查询到的信息

   ```js
   connection.connect();
   connection.query('select * from user',function (err, result, field) {
   		//。。。
   	})
   ```

4. 
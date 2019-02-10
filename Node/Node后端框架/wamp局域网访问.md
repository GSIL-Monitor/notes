1. 下载wamp，安装wamp；
2. 启动wamp，并在浏览器中访问localhost，可以进入Homepage；
3. 在httpd.conf中找到require local语句（只有一个），并修改为require all granted
4. 在httpd-vhosts.conf中修改require local为require all granted；
5. 重启wamp所有服务；
6. 右键任务栏wamp图标——>setting——>Menu item:online/offline;
7. 左键任务栏wamp图标——>put online
8. 查找本机IP，cmd之后输入ipconfig；
9. 在局域网内的其他机型上输入ip地址，即可访问到Wamp的HomePage


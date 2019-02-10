生成`package.json` :

```sh
npm init
npm init -y
npm init --yes
```

安装模块

```sh
// 安装模块
npm install
npm i

// 安装指定库 
npm i gulp-pug
npm i gulp-debug
npm i gulp-sass

// 批量安装库
npm i gulp-pug gulp-debug gulp-sass
// or(同前缀名)
npm i gulp{-debug,-sass,-pug}
```

安装模块并指定flags

```sh
// 没有flags参数默认安装在package.json
// 设定flags
npm i glup --save-prod
npm i glup -P
npm i glup --save-dev
npm i glup -D
// 设定无flags
npm i glup --no-save
```

获取包信息

```sh
npm view vue
npm v vue
npm v vue version
```

安装特定版本的软件包

```sh
npm i vue@2.5.15
npm i vue@beta
```

搜索package包

```sh
npm search gulp debug
// or 
npm s gulp debug
```

写在package包

```sh
npm uninstall vue
npm rm vue
npm un vue
npm r vue
npm rm vue --no-save // 仅仅删除node_module中的包，并且保存package中的项
```

列出依赖项

```sh
npm ls //列出 package.json 文件中所有的依赖项以及它们的所有依赖项
npm ls --depth=0 //只列出你的依赖项
npm ls -g -depth 0 // 查看所有全局安装的包的列表
```

运行测试

```sh
npm run tests
npm test
npm t
```

显示可用的script

```sh
npm run
```

从git仓库安装包

```sh
npm i https://github.com/sindresorhus/gulp-debug
npm i sindresorhus/gulp-debug // 省略域名
```

打开包的git页面

```sh
npm repo create-react-app
```

列出所有可用的NPM环境变量

```sh
npm run env|grep npm_
```

在package中添加环境变量

```sh
"config": {
  "build_folder":"./dist"
}

// 
npm 会将你的变量命名以 npm_package 为前缀，并保持其在 package.json文件中的结构，即 config_build_folder 。
```

在script中使用环境变量

```sh
"scripts": {
  "build": "gulp build --dist $npm_package_config_build_folder"
}
```




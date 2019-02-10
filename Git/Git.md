```
git init
```

初始化git库目录

```
git add README.md
```

add添加文件，将文件放在暂存区

```
git commit
```

把暂存区的所有内容提交到当前分支，并且每次commit之前都必须先add，否则无法commit	

需要注意输入commit介绍信息，这里遇到一个问题，输入信息之后需要按ESC之后使用指定命令才能转到命令行：

:w 保存文件但不退出vim
:w file 将修改另外保存到file中，不退出vim
:w! 强制保存，不推出vim
:wq 保存文件并退出vim
:wq! 强制保存文件，并退出vim
q: 不保存文件，退出vim
:q! 不保存文件，强制退出vim
:e! 放弃所有修改，从上次保存文件开始再编辑

```
git status
```

查看git状态

```
git log --pretty=oneline
```

查看日志

```
git reset --hard HEAD^
more?^    这里一个^表示一个版本
```

返回之前版本

工作区

就是github覆盖的当前文件

版本库

.git文件，最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。



```
git checkout -- readme.txt
```

清除掉当前文件的修改（没有add之前），作用于工作区



```
git reset HEAD <file>
```

清除掉缓存区中的内容（add之后，commit之前），作用域缓存区



```
git rm test.txt
```

清除掉版本库中对应工作区中已经删除的文件

当然，如果版本库中删除错了，也可以返回回来：

```
git checkout -- test.txt
```



```
git remote add origin git-url
```

将本地的git覆盖的文件推送到github指定的网址上



```
git push origin master
```

将本地内容提交到github上



```
git clone giturl
```

将github上的内容clone下来，成为本地文件



```
git checkout -b dev
```

创建并切换到dev分支，等价于下面两条命令

```
git branch dev
git checkout dev
```



```
git branch
```

查看当前分支，此命令会列出所有的分支，其中当前分支前面有一个*号



```
git checkout xxx
```

表示切换到指定的分支



```
git merge xxx
```

将xxx分支合并到当前分支（一般是master）上



```
git branch -d dev
```

删除已经被合并的分支。

```

```

如果没有合并merge就要强行删除，就需要使用-D命令

> 注意：在合并之后，需要重新提交comit合并后的内容之后再删除。



```
git merge --no-ff -m "merge with no-ff" dev
```

强制禁用`Fast forward`模式



```
git stash
```

对分支的工作区进行保存，下一次接着修改（注意，这里没有commit）



修改完其他分值的bug后，切换回当前分支，然后查看之前保存的正在进行的工作stash列表

```
git stash list
```

可以看到类似stash@{0}: WIP on dev: f52c633 add merge的结果，表示保存的一个工作区镜像。



```js
git stash apply stash@{0}//恢复到指定的工作区状态
git stash drop	// 由于apply回复后并不会删除stash内容，所以需要手动删除
git stash pop	//等价于上面两句的相加，恢复工作区状态同时删除stash
```

恢复到之前的工作区状态（add和commit之前），并删除stash



```
git push origin master
```

推送分支



```

```

把最新的代码从github上拉下来



如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。



- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。



```
rebase操作可以把本地未push的分叉提交历史整理成直线；
rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。
```



```

```

查看当前的HEAD指向的版本的tag

```
git tag v1.0
```

为当前的HEAD打上标签v1.0



```
git tag v1.1  f52c633
```

指定某个版本打上标签


```
git show v1.0
```

查看指定标签的信息



```
git tag -a v0.1 -m "version 0.1 released" 1094adb
```

创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字。



```
git tag -d v1.1
```

删除标签



```
// 指定标签推送
git push origin v1.1
// 全部标签推送
git push origin --tags
```

推送某个标签到远程



```
git push origin :refs/tags/v0.9
```

删除远程上的标签





忽略特殊文件，创建一个名为`.gitignore`的文件，用来管理git忽略文件。

这里有大部分这种文件的模板，或许会有你需要，不用每次都自己设置：https://github.com/github/gitignore



忽略文件的原则是：

1. 忽略操作系统自动生成的文件，比如缩略图等；
2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的`.class`文件；
3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。



为git的一些命令配置别名

如：status->st

```
$ git config --global alias.st status
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.br branch
git config --global alias.unstage 'reset HEAD'
git config --global alias.last 'log -1'
git config --global alias.lg "log --color --graph --pretty=oneline --abbrev-commit"
```










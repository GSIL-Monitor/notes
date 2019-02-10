### process事件

`process` 对象是 [`EventEmitter`](http://nodejs.cn/s/pGAddE) 的实例。 

#### 'beforeExit' 事件

当 Node.js 的事件循环数组已经为空，并且没有额外的工作被添加进来，事件 `'beforeExit'`会被触发。 正常情况下，如果没有额外的工作被添加到事件循环数组，Node.js 进程会结束。 但是如果 `'beforeExit'` 事件绑定的监听器的回调函数中，含有一个可以进行异步调用的操作，那么 Node.js 进程会继续运行。 

如果进程由于显式的原因而将要终止，例如直接调用 [`process.exit()`](http://nodejs.cn/s/53qrEa) 或抛出未捕获的异常，`'beforeExit'` 事件不会被触发。 

#### 'exit' 事件

两种情况下 'exit' 事件会被触发：

- 显式调用 `process.exit()` 方法，使得 Node.js 进程即将结束；

- Node.js 事件循环数组中不再有额外的工作，使得 Node.js 进程即将结束。

在上述两种情况下，没有任何方法可以阻止事件循环的结束，一旦所有与 `'exit'` 事件绑定的监听器执行完成，Node.js 的进程会终止。 

`'exit'` 事件监听器的回调函数，只有一个入参，这个参数的值可以是 [`process.exitCode`](http://nodejs.cn/s/TMxzzD) 的属性值，或者是调用 [`process.exit()`](http://nodejs.cn/s/53qrEa) 方法时传入的 `exitCode` 值。 

```javascript
process.on('exit', (code) => {
  console.log(`即将退出，退出码：${code}`);
});
```

`'exit'` 事件监听器的回调函数，**只允许包含同步操作**。所有监听器的回调函数被调用后，任何在事件循环数组中排队的工作都会被强制丢弃，然后 Nodje.js 进程会立即结束。 

```javascript
process.on('exit', (code) => {
  setTimeout(() => {
    console.log('该函数不会被执行');
  }, 0);
});
```

### process.abort（）

process.abort（）方法会使Node.js进程立即结束，并生成一个core文件

### process.arch

`process.arch`属性返回一个表示操作系统CPU架构的字符串，Node.js二进制文件是为这些架构编译的。 

### process.argv

`process.argv` 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数。 

```javascript
输入命令行：
node process-args.js one two=three four
输出：
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
```

### process.chdir(directory)

`process.chdir()`方法变更Node.js进程的当前工作目录，如果变更目录失败会抛出异常(例如，如果指定的目录不存在)。 

```javascript
console.log(`Starting directory: ${process.cwd()}`);
try {
  process.chdir('/tmp');
  console.log(`New directory: ${process.cwd()}`);
} catch (err) {
  console.error(`chdir: ${err}`);
}
```

### process.config

`process.config` 属性返回一个Javascript对象。此对象描述了用于编译当前Node.js执行程序时涉及的配置项信息。 这与执行`./configure`脚本生成的`config.gypi`文件结果是一样的。 

### process.cpuUsage([previousValue])

`process.cpuUsage()`方法返回包含当前进程的用户CPU时间和系统CPU时间的对象。此对象包含`user`和`system`属性，属性值的单位都是微秒(百万分之一秒)。 `user`和`system`属性值分别计算了执行用户程序和系统程序的时间，如果此进程在执行任务时是基于多核CPU，值可能比实际花费的时间要大。 

### process.cwd()

`process cwd()` 方法返回 Node.js 进程当前工作的目录。 

### process.debugPort

启用时Node.js调试器使用的端口。

```
process.debugPort = 5858;
```

### process.emitWarning(warning[, options])

`process.emitWarning()`方法可用于发出定制的或应用特定的进程警告。 可以通过给[`process.on('warning')`](http://nodejs.cn/s/YXSqii)事件增加处理器，监听这些警告。 

```javascript
process.emitWarning('Something happened!', {
  code: 'MY_WARNING',
  detail: 'This is some additional information'
});
```

### process.emitWarning(warning[, type[, code]][, ctor])

`process.emitWarning()`方法可用于发出定制的或应用特定的进程警告。 可以通过给[`process.on('warning')`](http://nodejs.cn/s/YXSqii)事件增加处理器，监听这些警告。 

### process.env

`process.env`属性返回一个包含用户环境信息的对象 See [`environ(7)`](http://nodejs.cn/s/_man/7/environ.7). 

### process.execArgv

`process.execArgv` 属性返回当Node.js进程被启动时，Node.js特定的命令行选项。 这些选项在[`process.argv`](http://nodejs.cn/s/wNE2K1)属性返回的数组中不会出现，并且这些选项中不会包括Node.js的可执行脚本名称或者任何在脚本名称后面出现的选项。 这些选项在创建子进程时是有用的，因为他们包含了与父进程一样的执行环境信息。 

### process.execPath

`process.execPath` 属性，返回启动Node.js进程的可执行文件所在的绝对路径。 

### process.exit([code])

`process.exit()`方法以结束状态码`code`指示Node.js同步终止进程。 如果`code`未提供，此exit方法要么使用'success' 状态码 `0`，要么使用`process.exitCode`属性值，前提是此属性已被设置。 Node.js在所有[`'exit'`](http://nodejs.cn/s/YpyNLc)事件监听器都被调用了以后，才会终止进程。 

### process.exitCode

当进程正常结束，或通过[`process.exit()`](http://nodejs.cn/s/53qrEa)结束但未传递参数时，此数值标识进程结束的状态码。 

### process.getegid()

`process.getegid()`方法返回Node.js进程的有效数字标记的组身份(See [`getegid(2)`](http://nodejs.cn/s/_man/2/getegid.2))。 

### process.geteuid()

`process.geteuid()`方法返回Node.js进程的有效数字标记的用户身份(See [`geteuid(2)`](http://nodejs.cn/s/_man/2/geteuid.2))。 

### process.getgid()

`process.getgid()`方法返回Node.js进程的数字标记的组身份(See [`getgid(2)`](http://nodejs.cn/s/_man/2/getgid.2))。 

### process.getgroups()

`process.getgroups()`方法返回数组，其中包含了补充的组ID。 如果包含有效的组ID，POSIX会将其保留为未指定状态，但 Node.js 会确保它始终处于状态。 

### process.getuid()

`process.getuid()`方法返回Node.js进程的数字标记的用户身份(See [`getuid(2)`](http://nodejs.cn/s/_man/2/getuid.2))。 

### process.memoryUsage()

`process.memoryUsage()`方法返回Node.js进程的内存使用情况的对象，该对象每个属性值的单位为字节。 

### process.nextTick(callback[, ...args])

`process.nextTick()`方法将 `callback` 添加到"next tick 队列"。 一旦当前事件轮询队列的任务全部完成，在next tick队列中的所有callbacks会被依次调用。

这种方式不是[`setTimeout(fn, 0)`](http://nodejs.cn/s/UxXb1y)的别名。它更加有效率。事件轮询随后的ticks 调用，会在任何I/O事件（包括定时器）之前运行。

### process.pid

`process.pid`属性返回进程的PID。 

### process.platform

`process.platform`属性返回字符串，标识Node.js进程运行其上的操作系统平台。 

### process.ppid

`process.ppid` 属性返回当前父进程的进程ID 

### process.release

`process.release` 属性返回与当前发布相关的元数据对象，包括源代码和源代码头文件 tarball的URLs。 

`process.release`包括如下属性：

- `name`  string，对于Node.js， 此值始终为`'node'`。对于传统io.js 发布包， 此值为`'io.js'`。
- `sourceUrl` string，指向一个*.tar.gz*文件的绝对URL，包括了当前发布的源代码。
- `headersUrl` string，指向一个*.tar.gz*文件的绝对URL，包括了当前发布的源代码的头文件信息。 这个文件要比全部源代码文件明显小很多，可以用于编译Node.js原生插件。
- `libUrl` string，指向一个*node.lib*文件的绝对URL，匹配当前发布的结构和版本信息。此文件用于编译Node.js本地插件。 _这个属性只在Windows版本中存在，在其他平台中无效。
- `lts `  string，标识当前发布的[LTS](http://nodejs.cn/s/vJCmGd)标签的字符串。  只有长效版(Long Term Support/LTS)存在这个属性，其他所有版本类型这个属性都是`undefined`，  包括*Current*版本，当前的有效值有：
  - `'Argon'` for the 4.x LTS line beginning with 4.2.0.
  - `'Boron'` for the 6.x LTS line beginning with 6.9.0.
  - `'Carbon'` for the 8.x LTS line beginning with 8.9.1.

### process.send(message[, sendHandle[, options] ]·[, callback])

如果Node.js进程是通过进程间通信产生的，那么，process.send()方法可以用来给父进程发送消息。 接收到的消息被视为父进程的[`ChildProcess`](http://nodejs.cn/s/yQBM4n)对象上的一个[`'message'`](http://nodejs.cn/s/efA2op)事件。

如果Node.js进程不是通过进程间通信产生的， `process.send()` 会是`undefined`。

### process.setegid(id)

`process.setegid()`方法为进程设置有效的用户组ID。(请看 [`setegid(2)`](http://nodejs.cn/s/_man/2/setegid.2).) `id`可以传一个数值ID或传一个用户组名称字符串。如果传了后者的话，会解析成一个相关的数值ID， 解析的时候，这个方法方法是阻塞的。 

```javascript
if (process.getegid && process.setegid) {
  console.log(`Current gid: ${process.getegid()}`);
  try {
    process.setegid(501);
    console.log(`New gid: ${process.getegid()}`);
  } catch (err) {
    console.log(`Failed to set gid: ${err}`);
  }
}
```

### process.seteuid(id)

`process.seteuid()`方法为进程设置有效的用户ID。(请看 [`seteuid(2)`](http://nodejs.cn/s/_man/2/seteuid.2).) `id`可以传一个数值ID或传一个用户名字符串。如果传了特定的用户名字符串，会解析成一个相关的数值ID， 解析的时候，这个方法方法是阻塞的。 

### process.setgid(id)

`process.setgid()` 为进程方法设置组ID. (查看setgid(2).) 可给`id`参数传一个数值ID或字符串名。

如果已经有一个进程组ID名，那么在解析为相关的ID之前，此方法是阻塞。

### process.setuid(id)

`process.setuid(id)` 设置进程的用户ID (参见 [`setuid(2)`](http://nodejs.cn/s/_man/2/setuid.2).) `id` 可以是一个数值ID也可以是一个用户名字符串. 如果已经有一个用户名，在解析为相关的数值ID时，此方法阻塞。 

```javascript
if (process.getuid && process.setuid) {
  console.log(`Current uid: ${process.getuid()}`);
  try {
    process.setuid(501);
    console.log(`New uid: ${process.getuid()}`);
  } catch (err) {
    console.log(`Failed to set uid: ${err}`);
  }
}
```

### process.stderr

`process.stderr` 属性返回连接到`stderr`(fd `2`)的流。 它是一个[`net.Socket`](http://nodejs.cn/s/wsJ1o1)(它是一个[Duplex](http://nodejs.cn/s/eYoo7B)流)，除非 fd `2`指向一个文件，在这种情况下它是一个[可写](http://nodejs.cn/api/process.html)流。 

### process.stdin

`process.stdin` 属性返回连接到 `stdin` (fd `0`)的流。 它是一个[`net.Socket`](http://nodejs.cn/s/wsJ1o1)(它是一个[Duplex](http://nodejs.cn/s/eYoo7B)流)，除非 fd `0`指向一个文件，在这种情况下它是一个[Readable](http://nodejs.cn/s/zz7Dx3)流。 

```javascript
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
```

### process.stdout

`process.stdout` 属性返回连接到 `stdout` (fd `1`)的流。 它是一个[`net.Socket`](http://nodejs.cn/s/wsJ1o1) (它是一个[Duplex](http://nodejs.cn/s/eYoo7B)流)， 除非 fd `1` 指向一个文件，在这种情况下它是一个[可写](http://nodejs.cn/api/process.html)流。 




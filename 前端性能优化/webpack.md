`tree-shaking`：`tree-shaking` 是 Webpack 2 引入的新功能，`tree-shaking` 是**无用代码移除**（DCE, dead code elimination）的一个方法，但和传统的方法不太一样。`tree-shaking` 找到需要的代码，灌入最终的结果；传统 DCE 找到执行不到的代码，从 AST 里清除。—— [如何评价 Webpack 2 新引入的 Tree-shaking 代码优化技术？](https://link.juejin.im?target=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F41922432)



`scope hoisting`：`scope hoisting` 是 Webpack 3 的新功能，又译作“**作用域提升**”。Webpack 将所有模块都用函数包裹起来，然后自己实现了一套模块加载、执行与缓存的功能，使用这样的结构是为了更容易实现 Code Splitting（包括按需加载）、模块热替换等功能。—— [Webpack 3 的新功能：Scope Hoisting](https://link.juejin.im?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F27980441)



`code-splitting`：对于大型的 web 应用而言，把所有的代码放到一个文件的做法效率很差，特别是在加载了一些只有在特定环境下才会使用到的阻塞的代码的时候。Webpack有个功能会把你的代码分离成Chunk，后者可以**按需加载**。这个功能就是`code-splitting`。—— [在Webpack中使用Code Splitting实现按需加载](https://link.juejin.im?target=http%3A%2F%2Fwww.alloyteam.com%2F2016%2F02%2Fcode-split-by-routes%2F)




























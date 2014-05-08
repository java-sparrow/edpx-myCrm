edpx-crm移植笔记
===========

准备工作
--------
1. 更新`package.json`文件：增加所需依赖`dependencies`属性（从0.3.3版本中复制）
2. 使用`npm uninstall edpx-crm`命令卸载原有 **crm扩展**
3. **★** 切换至 *edpx-crm* 目录，使用`npm link .`命令重新安装 **crm扩展**（这样修改的`package.json`文件就能起作用，自动加载所需依赖至本地）

- - - - - - - - - -

移植 *cli/crm.js* 文件
---------------------
* `getMetaDataFile`方法中，使用`require('edp-project')`和`require('path')`来加载所需模块，但是这两种方式没法区分模块是**外部的**还是**内置的**。有没有比较好的编程指导或约定？（无法从模块名上区分，例如 *util.js* 文件里还使用了`require('mkdirp')`来加载外部模块）





- - - - - - - - - -

疑问
---
* `require('../lib/util')`在代码中会多次出现，是否可以将模块名`'../lib/util'`替换为变量（由于浏览器需要异步加载，所以使用变量就无法通过正则预加载。而node端可以同步加载，所以可以使用变量形式的模块名）

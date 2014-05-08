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


移植 *cli/crm/init.js* 文件
--------------------------
* 在`edp`新的扩展机制下，`cli.command`（**命令名称**）和`cli.usage`（**命令用法信息**）是否需要？

### 依赖（以下加入依赖顺序不使用栈结构）
1. *cli/crm/init.js* 文件中依赖：`cli/crm/build.js`（在`initProject`方法中引用）、`lib/ws.js`（在`initProject`方法中引用）、`lib/dep.js`（在`initDependence`方法中引用）
2. *cli/crm/build.js* 文件中依赖：`lib/build.js`（在`cli.main`方法中引用）
3. *lib/ws.js* 文件中依赖：`lib/mock.js`（在`crmMockHandler`方法中引用）
4. *lib/dep.js* 文件中无依赖
5. *lib/build.js* 文件中依赖：`lib/module.js`（在`exports.refreshCombine`方法中引用）
6. *lib/mock.js* 文件中无依赖，但是该文件引用了若干内置模块，如`path`、`fs`、`querystring`、`url`
7. *lib/module.js* 文件中无依赖

### 注意
* *cli/crm/init.js* 文件的`addPackage`方法中，调用`loader.importFromFile`方法时，可能需要修改路径参数`./dep`
* *lib/dep.js* 文件的`exports.add`方法，使用了`require('edp-package/lib/util/extract')`，而如果在本地没有找到 *edp-package/lib* 文件夹的话，需要重新到 [edp-package的github仓库](https://github.com/ecomfe/edp-package/releases) 下载`0.4.4`版（版本号根据 *package.json* 文件中的依赖描述），并且在模块目录里执行`npm link .`命令，以保证安装所需依赖


- - - - - - - - - -

疑问
----
* `require('../lib/util')`在代码中会多次出现，是否可以将模块名`'../lib/util'`替换为变量（由于浏览器需要异步加载，所以使用变量就无法通过正则预加载。而node端可以同步加载，所以可以使用变量形式的模块名）？或者，可以使用类似`require.config`的方式配置`path`？

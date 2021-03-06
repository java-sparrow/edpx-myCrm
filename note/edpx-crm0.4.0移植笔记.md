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


移植 *cli/add.js* 文件
---------------------
使用`--type`指定创建类型时，可以创建没有后缀名的文件（这个是允许的）？



升级依赖版本（package.json）
------------------------------
在 `edpx-crm/node_modules/edp-package/lib/util/extract.js` 文件中发现问题。  
执行`edp crm init`命令后，`node`会报下面的错：
```
D:\xlst\github\myCRM\edpx-crm\node_modules\edp-package\lib\util\extract.js:80
    var admZip = new AdmZip();
                 ^
TypeError: object is not a function
```

文件第78行原为:
```
var AdmZip = require( 'adm-zip' )( zipFile );
var admZip = new AdmZip();
```
应该改为：
```
var AdmZip = require( 'adm-zip' );
var admZip = new AdmZip(zipFile);
```





lib/mock
---------
第`357`行的`remoteInfo.host = target.port;`可能存在问题。






复制`test`目录
----------------
* `extend`方法仅是浅扩展？
* 测试用例需要的 `test4readJson`、`test4writeJson`、`tmp.js`文件 不存在
* 测试`rmdir`方法的测试用例需要`tmpDir`和`tmpSeDir`目录 及 `tmpFile.txt`文件


- - - - - - - - - -

疑问
----
* `require('../lib/util')`在代码中会多次出现，是否可以将模块名`'../lib/util'`替换为变量（由于浏览器需要异步加载，所以使用变量就无法通过正则预加载。而node端可以同步加载，所以可以使用变量形式的模块名）？或者，可以使用类似`require.config`的方式配置`path`？

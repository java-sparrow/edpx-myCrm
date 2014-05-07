edp新插件扩展须知
===========

官方帮助页面： [扩展自己的EDP命令](https://github.com/ecomfe/edp/wiki/Edp-Commands#user-commands)

对官方步骤的解读
----------------
1. 从`git`上克隆`edpx-seed.git`（该副本包括基本的文件结构和示例文件，可以在此基础上进行修改）
2. 在 **命令提示符** 里切换工作目录至 *edpx-seed* （就是上一步克隆后的文件夹，不要改名）
3. 在 **命令提示符** 中执行`npm link .`命令，npm就会以 当前目录下`package.json`文件的描述 来安装相应的包（包的名字是`package.json`文件中的`name`属性）


以下是需要注意的地方
--------------------
* 下载基础文件后，修改时，要确保插件 *根目录* 的名字，与`package.json`文件中的`name`属性一致，否则报如下错：
```
 edp ERROR Can not find the specified `seed2` command module from `edpx-seed2`.
```
 （因为插件根目录的名字为**edpx-seed**，而`package.json`文件中的`name`属性为**edpx-seed2**）




关于cli文件夹
------------
* 初始化时， *cli文件夹* 下有一个 *seed.js文件* ，用于提供`seed`命令入口（该文件必须暴露`main`接口，否则调用`edp seed`命令时会报错）
* 此外， *cli文件夹* 下还有一个 *seed文件夹* ，该文件夹实现`seed`的子命令（例如调用`edp seed foo`命令时，`edp`会到 *seed目录* 下找 *foo文件* ）
* 假如 *cli文件夹* 下有 *seed.js文件* 和 *seed2.js文件* ，那么执行`edp`命令时，虽然可以看到帮助信息中显示了`seed`和`seed2`子命令，但是实际上只有`seed`可用。因为如果执行`edp seed2`命令，则`edp`会认为`seed2`没有注册（`seed2`没有通过`package.json`进行描述，也没有使用`npm`进行包安装）而自动去`npm`上加载`seed2`模块
* 同理，如果 *cli文件夹* 下同时有 *seed文件夹* 和 *seed2文件夹* ，则帮助信息虽然显示了两个文件夹及其子文件，但是非注册的文件夹名是不可用的
* 综上所述， *cli文件夹* 下仅需保留 与`edpx`插件同名的一个文件夹和一个`js`文件



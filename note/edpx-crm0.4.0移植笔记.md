edpx-crm移植笔记
===========

准备工作
--------
1. 更新`package.json`文件：增加所需依赖（`dependencies`属性）
2. 使用`npm uninstall edpx-crm`命令卸载原有 **crm扩展**
3. 切换至 *edpx-crm* 目录，使用`npm link .`命令重新安装 **crm扩展**（这样修改的`package.json`文件就能起作用，自动加载所需依赖至本地）

### 版本说明 <br />
v1.0.0版本功能  <br />
1.内置浏览器监听html css js变化 刷新浏览器<br />
2.处理css浏览器兼容 合并压缩自定义css <br />
3.合并压缩自定义js <br />
4.压缩自定义图片 <br />
5.复制bower第三方模块所有文件 <br />

### 使用说明 <br />
npm install  //安装所有gulp依赖 <br />
gulp server //启动内置浏览器会监听client文件夹下所有html，css，js <br />
gulp build  //生成dist文件夹 <br />
gulp clean  //删除dist文件夹 <br />

### 基础tasks <br />
gulp postcss //处理css兼容 合并压缩css <br />
gulp img  //压缩自定义图片 <br />
gulp js  //压缩自定义js <br />
gulp html //压缩自定义html  <br />
gulp copyIndexHtml //复制处理index的js css 依赖 <br />
gulp copyBowerJson //复制bower.json文件 <br />
gulp copy //复制bower第三方模块所有文件 <br />
gulp lint //检查js代码 <br />
 


<br /><br /><br />
### 版本说明 <br />
v2.0.0版本功能  <br />
1.内置浏览器监听html css js变化 刷新浏览器<br />
2.自定义的css，自动维护，build工作中postcss自动处理浏览器兼容，合并压缩为main.css文件 <br />
3.plugins的css，自动维护，build工作中合并压缩为plugins.css文件 <br />
4.bower的css，自动维护，build工作中合并压缩为vendor.css文件 <br />
5.images文件夹，build工作中复制到dist文件夹中<br />

### 使用说明 <br />
npm install  //安装所有gulp依赖 <br />
gulp serve //启动内置浏览器会监听3000端口，client文件夹下所有html，css，js，baseDir为client文件夹 <br />
gulp serve:dist  //启动内置浏览器监听9000端口，baseDir为dist文件夹<br />
gulp build  //生成dist文件夹 <br />
gulp clean  //删除dist文件夹 <br />
gulp postcss  //postcss处理css文件下的所有css除去plugins文件夹 <br />

### 基础tasks <br />
gulp html //生成合并压缩js css  html <br />
gulp postcss  //处理css文件夹css浏览器兼容 <br />
gulp clean  //删除dist文件夹 <br />
gulp lint //检查js语法 <br />
gulp js //监听js文件夹的js除了plugins文件夹的js <br />
gulp css //监听css文件夹的css除了plugins文件夹的css<br />
gulp pluginsjs //监听plugins文件夹的js <br />
gulp pluginscss  //监听plugins文件夹的css <br />
gulp wiredep //监听bower.json <br />
gulp images //复制images所有文件到dist <br />

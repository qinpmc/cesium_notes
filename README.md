## 环境搭建

###  Demo演示环境搭建

1. 下载Cesium安装包（https://cesiumjs.org/downloads/），解压缩（当前版本为Cesium-1.55）
2. 切换目录到解压缩的目录(Cesium-1.55文件夹)下，运行 npm install
3. 安装完成后，运行node server.js
4. 打开 浏览器输入：http://localhost:8080/ 即可看到页面


###  开发环境搭建
1. 创建项目，新建文件夹Cesium_notes；
2. 拷贝Cesium 源码下的 Build文件到 Cesium_notes目录下，拷贝源码Apps目录下的HelloWorld.html到Cesium_notes目录下；     
	有的Cesium版本下没有Build文件夹，可运行npm run minify / npm run 
	 可生成 需要的Build文件夹
3. 使用WebStorm编辑器打开Cesium_notes项目，运行HelloWorld.html，即可看到运行效果。
4. 如果不采用WebStorm编辑器，需要发布项目，编写 server.js,内容如下：

```
var http = require("http");
var express = require("express");
const path = require("path");

var app = express();
app.use(express.static(path.join(__dirname,"")));

app.listen(4111,() =>{
	console.log(`App listening at port 4111`);
	
})


```


5. 安装express
- Cesium_notes目录下运行 npm init，一路回车键，生成package.json；
- 安装express：     
      npm install express --save      
      npm install -g express-generator --save 
- 运行脚本：node server.js
- 打开浏览器查看： http://localhost:4111/HelloWorld.html







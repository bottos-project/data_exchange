# React+webpack集成antd的配置

## 配置流程

- 安装`babel-plugin-import`

```
npm install babel-plugin-import --save-dev
```

- 安装`antd`

```
npm install antd --save
```

- 实现按需加载

在`.babelrc or babel-loader`中操作

```
// .babelrc or babel-loader option
{
  "plugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
  ]
}
```

**注意**:webpack 1 无需设置 libraryDirectory。

- 加载css文件

在入口文件处加载css/less文件

```
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
```

## 问题

官方文档的方式是按照上诉方式去引入，但是css/less样式出不来。后来发现是webpack中配置有问题。修改webpack中的配置如下

```
module: {
    loaders: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
        { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!postcss!less' },
        { test: /\.css$/, exclude: /node_modules/, loader: 'style!css!postcss' },
        { test:/\.(png|gif|jpg|jpeg|bmp)$/i, loader:'url-loader?limit=5000' },  // 限制大小5kb
        { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader:'url-loader?limit=5000'} // 限制大小小于5k
    ]
},
```

将css/less的`exclude: /node_modules/`去掉。修改完以后如下

```
module: {
    loaders: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
        { test: /\.less$/, loader: 'style!css!postcss!less' },
        { test: /\.css$/, loader: 'style!css!postcss' },
        { test:/\.(png|gif|jpg|jpeg|bmp)$/i, loader:'url-loader?limit=5000' },  // 限制大小5kb
        { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader:'url-loader?limit=5000'} // 限制大小小于5k
    ]
},
```
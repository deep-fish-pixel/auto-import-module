# auto-import-module
auto import module webpack plugin

### Install
Install with npm:

`$ npm install --save-dev auto-import-module`

### Examples

```
new OutputReplaceWebpackPlugin({
    file: 'test.json',
    match: /\d+\/\d+\/\d+/g,
    conent: addIndex(new Date(), 'yyyy-MM-dd~hh:mm:ss'),
})
```

### 配置支持ts、过滤后缀、自动生成index、对import结果组装方式

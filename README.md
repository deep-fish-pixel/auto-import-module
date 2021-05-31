# auto-import-module
auto import module

### About
Auto assemble files and directories by using es module.
This tool will auto create default index as directory entry file.
This tool supports .js .ts .scss .less .stylus and so on.

### Install
Install with npm:

`$ npm install --save auto-import-module`

### Examples

```
// js
autoImportModule({
  dir: path.join(process.cwd(), 'temp'),
  extension: '.js',
});
// ts
autoImportModule({
  dir: path.join(process.cwd(), 'temp'),
  extension: '.ts',
});
// less
autoImportModule({
  dir: path.join(process.cwd(), 'temp'),
  extension: '.less',
  importModuleOnly: true,
});
// scss
autoImportModule({
  dir: path.join(process.cwd(), 'temp'),
  extension: '.scss',
  importModuleOnly: true,
});
// stylus
autoImportModule({
  dir: path.join(process.cwd(), 'temp'),
  extension: '.styl',
  importModuleOnly: true,
});



```


### options

| option | introduction |
| ------- | ------- |
|   dir      |     set watch root directory    |
|   extension      |     set file type, default .js    |
|   importModuleOnly      |     set no export, only import module, defaul false   |

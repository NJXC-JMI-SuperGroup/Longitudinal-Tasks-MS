# KD_crab
 通用项目架构

# BackStage

## Environment & Techniques

- Project SDK: jdk 1.8
- Spring Boot: 2.3.1
  - dependencies: Lombok, Spring Web, Mybatis Framework(all anotations), MySQL Driver
- MySQL: 8.0
  - serverTimezone: GMT

## Others

代码风格保持一致。

# Frontend

🐮🍺的前端搭建完成。*★,°*:.☆(￣▽￣)/$:*.°★* 。

## 框架

- **scaffolding**: vue-cli 3

- **UI**: based on **sing-app-vue-dashboard**, converted from SPA to MPA.
  - see **package.json** for detail
- **network**: axios
- **others**
  - vuedraggable: 支持拖动操作
  - vue-simple-uploader: 上传文件的简便组件

## build

建议使用webstorm开发，导入项目后建议使用yarn管理依赖， 建议yarn配置代理或更换镜像源。

## coding

- 各组在 **assets, components, pages, styles** 文件夹下对应各组子项目文件夹下编写代码。
- **SingApp**作为模板可供参考和copy，但不得更改，不得**引用**，在项目完成后SingApp模块将被删除。
- **main.js, Routes.js, App.vue**为公共编辑文件，请根据注释指引编写各组所需。
  - 各组可在main.js中配置全局变量，如host
  - 各组可在Routes.js中配置二级路由
  - 各组可在App.vue中配置二级转发

- axios已注册为全局组件并配置相应跨域，所有网络请求统一使用该组件，不再单独导入。

- 有关样式的编写完全支持css，less，scss。各组视情况自主选择。

## documents

- [vue](https://vuejs.org/v2/guide/)

- [bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/)
- [axios](https://github.com/axios/axios/blob/master/README.md)
- [Vue.Draggable](https://github.com/axios/axios/blob/master/README.md)
- [vue-simple-uploader](https://github.com/simple-uploader/vue-uploader/blob/master/README_zh-CN.md)

- There are also some charts or other support, you can search for it according to your needs
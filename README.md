# React技术栈+Express+Mongodb实现个人博客

## 项目介绍

这个项目是一个包含前台展示和后端管理的博客系统。普通用户可以浏览/发布/收藏文章，管理员用户可登录后台管理所有的文章、标签、用户。前端用react技术栈、后端是express+mongoose。

## 功能描述

***前端部分***

- [x] 文章列表展示
- [x] 文章分类
- [x] 登录管理
- [x] 权限管理
- [x] 文章详情页展示
- [x] 管理员文章管理
- [x] 管理员标签管理
- [x] 发文（支持MarkDown语法）

***后端部分***
- [x] mongoose数据库操作
- [x] 路由管理
- [x] 身份验证
- [x] 基本的增删改查
- [x] ...

## 技术栈
- [x] react
- [x] react-redux
- [x] react-router
- [x] redux-saga
- [x] babel
- [x] webpack
- [x] Express
- [x] Mongodb
- [x] Mongoose


## 项目预览
- 首页
![index](./record/2017-09-28%2010_25_45.gif)

- 非管理员登录

![nealyanglogined](./record/nealyangLogined.gif)

- 管理员登录

![adminLogined](./record/adminLogined.gif)

- 标签管理

![amdinTag](./record/adminTag.gif)

- 查看文章详情
![detail](./record/checkArticleDetail.gif)

- 发表文章
![newArticle](./record/new_article.gif)

- 修改文章
![modifiedArticle](./record/modifiedArticle.gif)


## 环境

```
node @7.9.0
db @3.4.0
...
别的就直接npm install 了

注意MongoDB初始化后需要初始化一个admin/admin账户，用于登录后台管理
```

## 运行

    git clone git@github.com:Nealyang/React-Express-Blog-Demo.git
    
    npm i
    
    npm start
    
## 开发数据库

> 链接: https://pan.baidu.com/s/1c3aedw8 密码: 5ii1







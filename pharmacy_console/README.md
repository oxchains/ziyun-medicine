# 冷链区块链联盟后台

## 1. 功能

1. 联盟成员管理
    - [x] 验证码
    - [x] 注册
    - [x] 申请书下载
    - [x] 登录
    - [ ] 密码找回
    - [x] 列表
    - [x] 审核
    - [ ] 审核通过后发送邮件
    
2. 节点管理
    - [x] 节点状态
    
3. 链上数据查询
    - [x] 传感器查询

## 2. 演示准备

目前项目为演示用, 需在使用前做一些准备工作.

**注意** 目前没有完整的权限控制, 只有 admin 用户注册后即可登录并进行审核.

### 2.1. 应用配置

需要更改的配置:

property | description
---------|-------------
`spring.datasource.*` | 数据库配置
`server.port` | 应用监听端口
`fabric.manager.uri` | fabric-manage 应用地址
`fabric.manager.tx.path` | 指定 chain, chaincode, chaincode-version

缓存文件和静态资源文件位置, 用于展示包括用户上传的各类图片和下载申请表. 在启动应用时在命令行指定, 或设置系统变量:

- `spring.resources.static-locations`, 建议 `classpath:/static/,file:$(pwd)/files/apply`
- `file.upload.dir`, 文件上传路径, 建议 `$(pwd)/files/apply`
- `spring.http.multipart.location` spring mvc 上传文件缓存位置, 建议 `$(pwd)/files/tmp`

如使用上述建议配置, 启动应用前先创建好相应文件夹: `files/apply`, `files/tmp`

### 2.1. fabric 相关操作

正式确认审核通过前, 需为成员:

  1. 注册 CA 用户
  2. 注册 fabric client 用户并配置证书
  3. 注册 peer 并配置证书, 启动 peer
  4. 为成员登录 [fabric-manage](https://github.com/zkjs/fabric-manage) 并获取 token, 保存在 `fabric_token` 中
  5. 获取节点列表和合约相关信息时, 直接调用 [fabric-manage](https://github.com/zkjs/fabric-manage) 相应接口

### 2.2. 模拟数据

- 联盟成员列表数据需预先插入 `gps_user` 中, 样例数据见 [data/gps_user_data.csv](data/gps_user_data.csv)
- 用户类型: 至少要在 `user_type` 中加入一组数据

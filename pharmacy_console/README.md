# 冷链区块链联盟后台

## 功能

1. 联盟成员管理
    - [x] 验证码
    - [x] 注册
    - [x] 申请书下载
    - [ ] 登录
    - [ ] 密码找回
    - [ ] 列表
    - [ ] 审核
    
2. 节点管理
    - [ ] 节点状态
    
3. 链上数据查询
    - [ ] 传感器查询

### fabric 相关操作

正式确认审核通过前, 需为成员:

  1. 注册 CA 用户
  2. 注册 fabric client 用户并配置证书
  3. 注册 peer 并配置证书, 启动 peer
  4. 为成员登录 [fabric-manage](https://github.com/zkjs/fabric-manage) 并获取 token, 保存在 `fabric_token` 中
  5. 获取节点列表和合约相关信息时, 直接调用 [fabric-manage](https://github.com/zkjs/fabric-manage) 相应接口


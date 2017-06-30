##MSP一些相关的配置

### MSP的配置文件目录配置

* DockerFile中配置了的docker环境变量, `FABRIC_CFG_PATH`, FABRIC_CFG_PATH相关的配置都在其中
`ENV FABRIC_CFG_PATH /etc/hyperledger/fabric`
* 在配置文件中配置MSP配置文件目录(peer使用core.yaml, orderer使用 orderer.yaml), 这个目录是个相对路径, 是相对于FABRIC_CFG_PATH而言. peer中使用的是mspConfigPath, order使用LocalMSPDir这个配置项.

### 证书的配置
MSP的配置的目录中需要以下的文件夹和文件:

1. `admincerts`文件夹, 存放administrator certificate. MSP中的Identity分成admin和member两种, SatisfiesPrincipal()可以用来验证identity的角色.
2. `cacerts`文件夹, 存放ca的certificate. 用来验证其他的由CA发放的证书.
3. `intermediatecerts`, `(optional)文件夹`, 存放intermediate CAs certificate. 因为MSP可以由getValidationChain得到验证链,既不仅ca验证,还有intermediatecerts验证.
4.  `crls`, `(optional)文件夹`, certificate revocation lists, 存放被废止的证书, 按文件存放.
5. `keystore`文件夹, 存放节点证书的私钥. 用于对交易的签名.
6. `signcerts`文件夹, 存放节点的X.509格式的证书文件. 节点自己的公钥证书.和keystore中的私钥对应.
7. `config.yaml`文件, 包含了MSP中的OU(OrganizationalUnitIdentifier)信息. 
每个OU有对应的cacert,可以用来验证OU的member. 

使用场景之一: endoser验证证书时,会验证证书提供的OrganizationalUnitIdentifier是否在config.yaml中所配置的OrganizationalUnitIdentifiers中

config.yaml配置样例:

```
OrganizationalUnitIdentifiers:
  - Certificate: "cacerts/cacert.pem"
    OrganizationalUnitIdentifier: "COP"
```

### 说明
所以若需要对接第三方的CA, 需配置其CA对应的cacerts, 同时需要生成节点加密的密钥和证书(通过CA验证). 其中的admincert应该是CA的admin管理员的证书, 也需要生成放在对应的目录下.

#### Cert的生成

有以下几种方式生成这些cert

1.Openssl

2.cryptogen tool

fabric提供的证书生成工具, 下载地址如下

`curl -L https://logs.hyperledger.org/sandbox/vex-yul-hyp-jenkins-2/fabric-binaries/release.tar.gz -o release.tar.gz 2> /dev/null;  tar -xvf release.tar.gz
`

使用命令: `cryptogen generate --config=./crypto-config.yaml`

3.fabric-ca 或 其他自己实现的CA来生成公私钥.

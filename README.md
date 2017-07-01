# prototype
quick prototypes

# pharmacy-chain
National pharmaceutical distribution industry block chain alliance

## [FrontEnd (React.js)](./pharmacy-chain)

### How to run

Checkout this repo, install dependencies, then start the app with the following:

```
> git clone git@github.com:zkjs/prototype.git
> cd prototype/pharmacy-chain
> npm install
> npm start
```

##### 配置  

```
将 ./src/actions/types.js 中 ROOT_URL 修改为API服务器地址
```

### How to deploy 
```
> Requirements: NPM
> git clone git@github.com:zkjs/prototype.git
> cd prototype/pharmacy-chain
> modify ./src/actions/types.js , change ROOT_URL to right api server endpoint
> npm install
> npm install -g webpack
> webpack -p
> copy files index.html, bundle.js and directory public/  to any web server directory
> done
```

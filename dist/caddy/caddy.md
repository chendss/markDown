# caddy 使用教程(超级简单版)

本文不讲安装,只讲最简单的配置
每次配置更新完要 sudo pkill -USR1 caddy 刷新

## 将静态文件映射到二级域名

```
你想在外网访问的网站地址 {
  tls 你的破https证书
  gzip
  root  你的网站本地地址
  index 首页 不填默认index的东西
}
```

## 反代理

```
你想在外网访问的网站地址 {
  tls 你的破https证书
  proxy / localhost:你想访问的破端口
}
```

## import

可以把几个文件合并拼接起来
例如

### a.conf

```
你的破配置
```

### b.conf

```
import a.conf
```

相当于把**a.conf**里的代码拷贝到**b.conf**里.没啥特别的

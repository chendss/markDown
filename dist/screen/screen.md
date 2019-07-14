# screen 超级简单的几个命令

## 常规命令

```javaScript
创建：screen -S fuck
查看有多少会话：screen -ls
恢复：screen -r fuck
删除 screen -S fuck -X quit
```

### screen -r fuck 失败

```
如果不能恢复：先screen -d fuck,再screen -r fuck
```

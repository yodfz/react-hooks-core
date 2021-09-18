# react-hooks-core
一些有用的小tips hooks

# useQueryStae

这个hooks主要为了解决react中querystring 与 自身 state双向绑定，映射的问题。

使用这个替代useState即可。

当前版本可能会有问题，可以给我提`Issues`。

## 使用方法

```ts
const Component = ()=>{
  //默认初始化将querystring初始化进入qState
  const [qState,setQState] = useQueryState();
  
  // 使用
  
  setQState({page:1})
  // 这个时候会将page 转换成 ?page=1 替换到url上。
  
  

}

```

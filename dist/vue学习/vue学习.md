# Vue 响应式原理

## 为什么不支持 IE8

其实是依赖`**Object.defineProperty()**`，进行数据挟持的，而这个 api 在 IE8 下仅仅支持 Dom 对象不支持原生对象，所以 Vue2.x 是不支持 IE8 及以下的浏览器。

## Object.defineProperty(object, propertyname, descriptor )

此函数有 3 个参数，均是必传的参数。这个函数的特性其实很像 c#的属性，有 c#基础的理解起来应该很容易。

- object：需要设置的对象

- propertyname：需要设置的属性名（对象的键名）

- descriptor：描述符，一个对象，用于设置属性的特性。

  ```javascript
  {
      value:undefined, // 表示此属性的值。
      writable:false, // 决定此属性是否可写
      configurable:true,
          /*
          决定此属性是否可配置，
          如果为false则writable, configurable, enumerable这些属性的设置都将无效.
          即使重新调用defineProperty函数也无效。
          特别指出 试图修改configurable的值会抛出异常。
          */
      enumerable:false, // 是否可枚举
      get:undefined, // 函数，当取值时执行
      set:undefined, // 函数，当设置值时执行
  }
  ```

  ```javascript
  // 此demo示范get和set的作用，其他的属性自行尝试。
  const setName = function(newValue) {
    console.log('新的值', newValue)
  }

  const getName = function() {
    console.log('取值啦')
  }

  var demo = {
    name: '初始值'
  }

  Object.defineProperty(demo, 'name', {
    set: setName,
    get: getName
  })

  demo.name = '初始值2'
  // -> 新的值 初始值2
  let name = demo.name
  // -> 取值啦
  ```

## Vue 里重要的选项

- data() : 数据存放的地方

- methods ：定义的函数

- watch ：监听数据变化的

  ```javascript
  // 一个例子
  new Vue({
    data() {
      return {
        text: '初始值'
      }
    },
    methods: {
      do: function() {
        this.text = '执行这个函数就改变值'
      }
    },
    watch: {
      text: function(value, newValue) {
        console.log('监听text变化', value, newValue)
      }
    }
  })
  ```

- model：实现双向绑定的必要选项

- computed：带缓存功能的 get 函数

## 模版指令

- v-text：相当于`{{}}`，类似原生的`textContent`

- v-html：类似`innerHTML`,JQuery 的`html()`函数

- v-if：判断

- v-show：是否显示

- v-on，简写@

- v-bind

  - 简写 :c
  - 属性绑定
  - 当是一个字符串的时候是表示 class 扔进去。当是 bool 可以表示这个 class 是否进入这个元素`:class:{classA:isShow}`，当`isShow`是真的时候，元素会有 classA 样式，反之。

- v-model：模式绑定，给组件设定一个需要双向绑定的值。

  ```javascript
  // 实现原理
  class component {
      this.model = {
          props:'属性名',
          event:'自定义时间名'
      }
  	this.props = ['属性名'] // 需要与上面的同名
      this.methods = {
          change:function(value) {
              setProps(value) // 设置那个值
          }
      }
  }
  // 父组件调用就可以
  // <component v-model="一个需要双向绑定的值"></component>
  ```

## 组件构建过程

假设我们现在有一个组件叫 A，那么我们想用这个组件需要进行如下几步，代码演示

```javascript
import 组件 form '路径'
export default {
    compontens :{
        组件
    }
}
```

然后在 html 里面就可以使用这个组件了

```html
<div>
    <组件></组件>
</div>
```

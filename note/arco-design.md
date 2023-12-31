## arco-design

> arco-design官网：[快速上手 | ArcoDesign](https://arco.design/react/docs/start)

### 菜单（Menu）



获取onClickMenuItem中文本内容，再通过设置状态（setState），改变相应的属性值。

```
 onClickMenuItem={(key,event) =>
              Message.info({
                content: `You select ${key}, ${event.target.innerText}`,
                showIcon: true,
              }, 
              this.setState({  
                itemName: event.target.innerText,
                })
              
              )
  }
```



## Input框 取值

方式一使用 useState

```


```



方式二

使用ref









## 遇到的问题

> https://react.dev/reference/react-dom/findDOMNode#alternatives



### 问题1：

```
bundle.js:47133 Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of ResizeObserverComponent which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
    at div
    at ResizeObserverComponent (http://localhost:3000/static/js/bundle.js:24684:43)
    at Trigger (http://localhost:3000/static/js/bundle.js:20491:24)
    at Tooltip (http://localhost:3000/static/js/bundle.js:19892:61)
    at div
```



解决办法：

这个警告是因为您在使用 `findDOMNode` 方法时，组件被包裹在 `StrictMode` 中。在 `StrictMode` 中，React 会执行额外的检查以帮助您发现潜在问题，其中一项检查是禁用了 `findDOMNode` 方法。您可以按照警告信息中提供的链接了解如何在 `StrictMode` 中使用 `ref`。

为了解决这个警告，您可以尝试将 `findDOMNode` 方法替换为使用 `ref` 属性直接引用组件中的元素。例如，如果您要引用一个 `div` 元素，可以使用以下代码：

```jsx
import React, { useRef } from 'react';

function MyComponent() {
  const myRef = useRef(null);

  return (
    <div ref={myRef}>
      {/* ... */}
    </div>
  );
}
```

请注意，`ref` 属性的值应该是一个回调函数或 `useRef` 的返回值。在这个例子中，我们使用了 `useRef` 来创建一个可变的引用，然后将其传递给 `div` 元素的 `ref` 属性。

解决办法2：

直接去掉检查，控制台就不会该提示信息了

```
ReactDOM.createRoot(document.getElementById('root')).render(
 // <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
 // </React.StrictMode>,
)
```





### 问题2：分页点击问题

```
ResizeObserver loop limit exceeded
at http://localhost:3000/static/js/bundle.js:84353:58
```



解决办法：

This error message usually occurs when you are using a `ResizeObserver` to detect changes in the size of an element, but the observer is triggering a loop that exceeds the maximum number of loops allowed by the browser. 

To fix this issue, you can try the following:

1. Check if you are observing the same element multiple times. If you are, try to remove the duplicate observers.

2. Check if you are changing the size of the observed element inside the observer callback function. If you are, try to avoid doing so.

3. If you are using a `setTimeout` or `setInterval` inside the observer callback function, try to remove them.

4. If you are observing a large number of elements, try to limit the number of elements you are observing at one time.

5. If none of the above solutions work, you can try to use a `debounce` function to limit the number of times the observer callback function is called. 

Here's an example of how to use a `debounce` function:

```js
import { debounce } from 'lodash';

const handleResize = debounce(() => {
  // your resize logic here
}, 100);

const observer = new ResizeObserver(handleResize);

observer.observe(element);
```

In this example, the `debounce` function limits the number of times the `handleResize` function is called to once every 100 milliseconds. This can help prevent the observer from triggering a loop that exceeds the maximum number of loops allowed by the browser.





### 问题3： 触发次数

遇到的问题

![image-20230522161458096](./assets/image-20230522161458096.png)

```
Uncaught runtime errors:
×
ERROR
ResizeObserver loop limit exceeded
at http://localhost:3000/static/js/bundle.js:107564:58
```

解决办法：

这个错误通常是因为`ResizeObserver`被触发了过多的次数，导致了循环次数超过了浏览器的限制。可以尝试优化代码，减少`ResizeObserver`的触发次数。

另外，如果你使用的是React，你可能会遇到这个问题。这是因为React在StrictMode下会对代码进行更严格的检查，包括检查是否有过时的方法被使用。在React的StrictMode下使用了过时的方法`findDOMNode`可能会导致这个错误。建议使用ref属性来获取DOM节点，而不是使用`findDOMNode`方法。以下是一个简单的案例，演示如何使用ref来获取DOM节点：

```jsx
import React, { useRef } from 'react';

function MyComponent() {
  const myRef = useRef(null);

  return (
    <div ref={myRef}>
      {/* your content here */}
    </div>
  );
}
```

在这个例子中，我们使用了`useRef`来创建一个ref，然后将这个ref传递给`<div>`元素的`ref`属性。这样，`myRef.current`就指向了这个`<div>`元素的DOM节点，你可以在需要的时候使用它。



### 问题4： 变量赋值

背景

菜单栏收缩处，点击收缩按钮菜单栏自动隐藏（收缩）

遇到的问题

```
Uncaught runtime errors:
×
ERROR
Assignment to constant variable.
TypeError: Assignment to constant variable.
    at handleCollapsed (http://localhost:3000/main.c31a36a940826dc1f721.hot-update.js:53:18)
    at handleClick (http://localhost:3000/static/js/bundle.js:3253:16)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:51148:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:51192:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:51249:35)
    at invokeGuardedCallbackAndCatchFirstError (http://localhost:3000/static/js/bundle.js:51263:29)
    at executeDispatch (http://localhost:3000/static/js/bundle.js:55407:7)
    at processDispatchQueueItemsInOrder (http://localhost:3000/static/js/bundle.js:55433:11)
    at processDispatchQueue (http://localhost:3000/static/js/bundle.js:55444:9)
    at dispatchEventsForPlugins (http://localhost:3000/static/js/bundle.js:55453:7)
```

![image-20230522181846792](./assets/image-20230522181846792.png)

原因：

在使用菜单自动收缩按钮时

```
const [collapsed,setCollapsed] = useState(false)
```

对setCollapsed进行了赋值：

```
  const handleCollapsed = () => {
    setCollapsed = !collapsed;
  };
```

这个错误是因为尝试在一个常量变量上进行赋值操作，而常量变量的值是不能被修改的。你需要将这个常量变量改为一个普通的变量，或者使用其他方法来达到你的目的。

如果你想要修改`collapsed`的值，你需要将`const`关键字改为`let`或`var`，这样就可以对`collapsed`进行赋值操作了。例如：

```
let [collapsed, setCollapsed] = useState(false);
collapsed = true; // 可以对collapsed进行赋值操作
```

不过需要注意的是，这样做可能会导致一些副作用，因为`useState`是React提供的一个钩子函数，它会在组件渲染时被调用，如果你在组件渲染后对`collapsed`进行了赋值操作，可能会导致组件状态不一致，因此建议尽量避免这种写法。

解决办法：

 如果你不想改变`collapsed`变量的定义方式，可以使用`setCollapsed`函数来更新`collapsed`的值，例如：

```
const [collapsed, setCollapsed] = useState(false);
 const handleCollapsed = () => {
    setCollapsed = !collapsed;// 通过setCollapsed函数来更新collapsed的值
  };
```

这种方式可以避免直接对常量变量进行赋值操作，同时也能正常更新组件状态。

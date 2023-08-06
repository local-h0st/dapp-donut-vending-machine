# dapp-donut-vending-machine
 
合约采用solidity示例DonutVendingMachine，部署在sepolia测试网络上，写一个前端先熟悉熟悉。

## 关于vite引入web3js会报错

网上搜了一下，这个错误应该是由vite引起的，和前端框架的选择没有关系。这个issue提到的解决办法出自[这条](https://stackoverflow.com/questions/68975837/web3js-fails-to-import-in-vue3-composition-api-project)Stackoverflow的回答。

为什么缺少web3.min.js在[这个](https://github.com/web3/web3.js/issues/2623)和[这个](https://github.com/web3/web3.js/issues/2291)Github issue中有阐述，开发者在后续版本中有意移除，目的是要你用webpack开发，更高版本更安全，但是这样很不方便因此很多人选择停留在古早的仍有的版本(https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.37/dist/web3.min.js)，beta37是移除之前最后一个版本。

亲测没用的办法：

* https://stackoverflow.com/questions/68416003/unable-to-import-web3
* https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
* https://github.com/vitejs/vite/issues/3817也没用
* https://blog.csdn.net/sinat_36728518/article/details/125409961 提到使用web3.min.js这个打包好的文件，但高版本web3js缺少web3.min.js，无效。

来自[这个](https://blog.csdn.net/weixin_42335036/article/details/124666053)帖子分析：我采用solidjs（默认vite构建）+web3js，web3本身在其他环境如webpack、@vue/cl运行时本身会下载依赖包，但是vite会把不需要的依赖全删了，导致没有buffer global或process.env，所以如果要在vite环境下运行，则必须用导入web3.min.js的方式来使用。（貌似下载被删掉的依赖也行？）问题是web3开发者在后续版本中不再提供web3.min.js，最后一个拥有web3.min.js的版本停留在beta37，因此如果要在vite下通过web3.min.js的方式来开发dapp的话，web3.min.js的版本会很低，本身不安全。

按照web3官方的推荐是，采用webpack。但是webpack太难了，还是继续用现成的vite吧。

接下来给出解决vite导入web3js失败的方法：

```
npm i -D @esbuild-plugins/node-globals-polyfill
npm i -D @esbuild-plugins/node-modules-polyfill
```

然后按以下内容修改vite.config.js：

```
import { defineConfig } from 'vite'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig({
  ⋮
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeModulesPolyfills(),
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
      ],
      define: {
        global: 'globalThis',
      },
    },
  },
})
```

之后就可以顺利导入web3了：

```
import Web3 from 'web3';
console.log(Web3);
```

正常

initial commit就是用solidjs官方模板刚配好环境引入web3后的commit

## web3js连接Metamask

[这条](https://ethereum.stackexchange.com/questions/67145/how-to-connect-web3-with-metamask)Stackoverflow的回答和[这条](https://juejin.cn/post/7099125551784280101)掘金社区帖子是我采用的，其中前者还提到了一种新的连接方式。[这份](https://blog.valist.io/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a)帖子提到了`window.ethereum.request({method: 'eth_requestAccounts'})`，但是我不知道它和我采用的` window.ethereum.enable()`有什么区别

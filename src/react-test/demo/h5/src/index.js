// import 'babel-polyfill'
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import * as stores from 'config/Stores';
import { HashRouter as Router } from 'react-router-dom';

// 使用PWA时开启
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import App from 'widget/App/AppView'
import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

// 设置全局app对象
window.app = {};

// 渲染到DOM ID为app的节点上
ReactDom.render(
  <LocaleProvider locale={enUS}>
    <Provider {...stores}>
      <App />
    </Provider>
  </LocaleProvider>
  ,
  document.getElementById('app')
)
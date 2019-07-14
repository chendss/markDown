import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd-mobile';
import style from './LayoutLess.less';
import { getRouter } from 'router';


@withRouter
class LayoutView extends Component {
  constructor(props){
    super(props);
    // 设置全局router对象，用于在Mod中的跳转
    window.app.router = this.props.history;
    console.log('window.app.router:', window.app.router);
    this.state = {}
  }

  componentDidMount(){}

  render(){
    return (
      <div>
        {getRouter()}
      </div>
    )
  }
}

export default LayoutView;
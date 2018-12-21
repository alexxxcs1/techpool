import React, { Component } from "react";
import PropTypes from "prop-types";
import { HashRouter, Route, Switch } from "react-router-dom";
// import style from  './App.scss';
import style from "./App.scss";

import Login from "routes/Login";
import Home from "routes/Home";
import Answer from "routes/Answer";
import NotFound from "routes/NotFound";
import UserIndex from "routes/UserIndex";
import Rank from "routes/Rank";
import Rule from "routes/Rule";

import bkgslogan from "assest/bkgslogan.png";
import bkg1 from "assest/bkg1.png";

import AlertBox from "components/AlertBox";
import AuthBox from "components/AuthBox";
import TopNav from "components/TopNav";
import PicView from "components/PicView";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bkgstatus: 0,
      UserInfo: null,
      AlertOption: {
        show: false,
        value: "信息输入有错误，请重新输入",
        callback: this.HandleAlertCallbackIntercept.bind(this, () => {})
      },
      PicViewOption: {
        show: false,
        url:
          "http://h5.rup-china.com/techpool/public/index/request/KLK20181226-4.png",
        callback: this.HandlePicViewCallbackIntercept.bind(this, () => {})
      }
    };
    this.getChildContext = this.getChildContext.bind(this);
    this.HandleAlertOption = this.HandleAlertOption.bind(this);
    this.HandleAlertCallbackIntercept = this.HandleAlertCallbackIntercept.bind(
      this
    );
    this.getUserInfo = this.getUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.returnBkg = this.returnBkg.bind(this);
    this.HandleBkg = this.HandleBkg.bind(this);
    this.HandlePicView = this.HandlePicView.bind(this);
  }
  componentDidMount() {
    document.body.addEventListener(
      "touchmove",
      function(e) {
        if (e.target.getAttribute('scroll')=='true') {//检测不锁滑动的标签
          //do nothing
        }else{
          //没有不锁滑动标签的则禁止滑动
          e.preventDefault();
        }
        
      },
      false
    );
    document.body.addEventListener(
      "ondragstart",
      function(e) {
        return false;
      },
      false
    );
  }
  getChildContext() {
    return {
      getUserInfo: this.getUserInfo,
      setUserInfo: this.setUserInfo,
      alert: this.HandleAlertOption,
      PicView: this.HandlePicView,
      BKG: this.HandleBkg
    };
  }
  HandleAlertOption(option) {
    this.state.AlertOption = option;
    this.state.AlertOption.callback = this.HandleAlertCallbackIntercept.bind(
      this,
      this.state.AlertOption.callback
    );
    this.setState(this.state);
  }
  HandleAlertCallbackIntercept(callback) {
    this.state.AlertOption.show = false;
    callback();
    this.setState(this.state);
  }
  getUserInfo() {
    return this.state.UserInfo;
  }
  setUserInfo(userinfo) {
    this.state.UserInfo = userinfo;
    this.setState(this.state);
  }
  HandleBkg(status) {
    this.state.bkgstatus = status;
    this.setState(this.state);
  }
  returnBkg() {
    switch (this.state.bkgstatus) {
      case 0:
        return <img src={bkgslogan} className={style.bgbottom} alt="" />;
      case 1:
        return <img src={bkg1} className={style.bgbottom} alt="" />;
      default:
        return <img src={bkgslogan} className={style.bgbottom} alt="" />;
        break;
    }
  }
  HandlePicView(option) {
    this.state.PicViewOption = option;
    this.state.PicViewOption.callback = this.HandlePicViewCallbackIntercept.bind(
      this,
      this.state.AlertOption.callback
    );
    this.setState(this.state);
  }
  HandlePicViewCallbackIntercept(callback) {
    this.state.PicViewOption.show = false;
    callback();
    this.setState(this.state);
  }
  render() {
    return (
      <div style={{ height: "100%" }}>
        {this.state.PicViewOption.show ? (
          <PicView option={this.state.PicViewOption} />
        ) : (
          ""
        )}
        {this.state.AlertOption.show ? (
          <AlertBox option={this.state.AlertOption} />
        ) : (
          ""
        )}
        <TopNav />
        <HashRouter>
          <div style={{ height: "100%" }}>
            <Switch>
              {/* 登录绑定 */}
              <Route path="/login" component={Login} />
              {/* 答题 */}
              <Route path="/answer" component={Answer} />

              {/* 排行榜 */}
              <Route path="/rank" component={Rank} />

              {/* 称谓规则 */}
              <Route path="/user/:route" component={UserIndex} />
              {/* 规则 */}
              <Route path="/rule" component={Rule} />

              {/* 用户中心 */}
              <Route path="/user" component={UserIndex} />
              {/* 首页 */}
              <Route path="/" component={Home} />
              {/* 404页面 */}
              <Route component={NotFound} />
            </Switch>
            <AuthBox
              user={this.state.UserInfo}
              timestamp={new Date().getTime()}
            />
          </div>
        </HashRouter>
        {this.returnBkg()}
      </div>
    );
  }
}
App.childContextTypes = {
  alert: PropTypes.func,
  PicView: PropTypes.func,
  getUserInfo: PropTypes.func,
  setUserInfo: PropTypes.func,
  BKG: PropTypes.func
};
export default App;

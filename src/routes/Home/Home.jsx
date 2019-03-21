import React, { Component } from "react";
import style from "./Home.scss";

import slogan from "assest/slogan.png";
import bkgslogan from "assest/bkgslogan.png";
import button from "assest/button.png";

import PropTypes from "prop-types";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo:null,
    };
    this.changeNavigation = this.changeNavigation.bind(this);
  }
  componentDidMount() {
    this.context.BKG(0);
  }
  changeNavigation(url) {
    this.props.history.push({ pathname: url });
  }
  componentWillReceiveProps(props){
    //此处获取userinfo
    this.state.userinfo = this.context.getUserInfo();
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.Box}>
        <div className={style.SloganBox}>
          <img src={slogan} alt="" />
        </div>
        {this.state.userinfo?<div className={style.IndexButtonGroup}>
          {this.state.userinfo.role == 1?<div
            className={style.Button}
            style={{ backgroundImage: "url(" + button + ")" }}
            onClick={this.changeNavigation.bind(this, "/answer")}>
            天道酬勤
          </div>:''}
          {/* {this.state.userinfo.role == 1?<div
            className={style.Button}
            style={{ backgroundImage: "url(" + button + ")" }}
            onClick={this.changeNavigation.bind(this, "/user/role")}>
            称谓系统
          </div>:''} */}
          <div
            className={style.Button}
            style={{ backgroundImage: "url(" + button + ")" }}
            onClick={this.changeNavigation.bind(this, "/rank")}>
            琅琊榜
          </div>
          <div
            className={style.Button}
            style={{ backgroundImage: "url(" + button + ")" }}
            onClick={this.changeNavigation.bind(this, "/rule")}>
            活动规则
          </div>
          {this.state.userinfo.role == 1?<div
            className={style.Button}
            style={{ backgroundImage: "url(" + button + ")" }}
            onClick={this.changeNavigation.bind(this, "/user")}>
            个人中心
          </div>:''}
        </div>:''}
      </div>
    );
  }
}
Home.contextTypes = {
  getUserInfo: PropTypes.func,
  setUserInfo: PropTypes.func,
  BKG: PropTypes.func
};
export default Home;

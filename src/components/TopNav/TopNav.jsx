import React, { Component } from "react";
import style from "./TopNav.scss";
import logotop from "assest/logotop.png";
import returnbutton from "assest/returnbutton.png";
import userbutton from "assest/userbutton.png";
import PropTypes from "prop-types";

export class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: null
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.JumpUrl = this.JumpUrl.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    console.log(window.location.hash);
  }
  refreshProps(props) {
    this.state.userinfo = this.context.getUserInfo();
    this.setState(this.state);
  }
  JumpUrl(url) {
    window.location.hash = url;
  }
  render() {
    return (
      <div className={style.TopNavBox}>
        <img src={logotop} className={style.logotop} alt="" />
        {this.state.userinfo ? (
          <div className={style.HandleGroupButton}>
           <div
              className={style.ButtonGroup}
              style={{ justifyContent: "flex-start" }}>
              {window.location.hash == '#/'?'':<div
                className={style.Button}
                onClick={this.JumpUrl.bind(this, "/")}>
                <img src={returnbutton} className={style.iconbase} alt="" />
                返回首页
              </div>}
            </div>
            <div
              className={style.ButtonGroup}
              style={{ justifyContent: "flex-end" }}>
              {this.state.userinfo.role == 1 ? (
                <div
                  className={style.Button}
                  onClick={this.JumpUrl.bind(this, "/user")}>
                  <img src={userbutton} className={style.iconbase} alt="" />
                  个人中心
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
TopNav.contextTypes = {
  alert: PropTypes.func,
  getUserInfo: PropTypes.func,
  setUserInfo: PropTypes.func
};
export default TopNav;

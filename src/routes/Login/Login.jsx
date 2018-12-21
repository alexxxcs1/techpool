import React, { Component } from "react";
import style from "./Login.scss";
import CitySelect from "components/CitySelect";
import PropTypes from "prop-types";

import bkgslogan from "assest/bkgslogan.png";
import button from "assest/button.png";
import slogan from "assest/slogan.png";

import { api } from "common/app";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      sex: null,
      wid: null
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.handleSexValue = this.handleSexValue.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.getUserInfo();
  }
  refreshProps(props) {
    
  }
  onInputBlur() {
    var scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
    document.body.scrollTop = 0;
  }
  getUserInfo() {
    api.getUserInfo().then(
      res => {
        if (res.code == 200) {
          this.context.setUserInfo(res.result);
          if (res.result.is_user == 1) {
            window.location.hash = "/";
          }
        }
      },
      err => {
        this.state.isUser = 0;
        this.setState(this.state);
      }
    );
  }
  HandleSubmit() {
    if (this.state.name && this.state.sex && this.state.wid) {
      let self = this;
      api
        .setUserReg(
          this.state.name,
          this.state.sex == "男" ? 1 : 2,
          this.state.wid
        )
        .then(res => {
          if (res.code == 200) {
              console.log(res);
              
            window.location.reload();
          } else {
            this.context.alert({
              show: true,
              value: res.message,
              callback: () => {
                
              }
            });
          }
        });
    } else {
      this.context.alert({
        show: true,
        value: "请输入完整的信息",
        callback: () => {}
      });
    }
  }
  handleSexValue(sex) {
    this.state.sex = sex;
    this.setState(this.state);
  }
  InputChange(type, e) {
    if (type == "wid") {
      e.target.value = e.target.value.replace(/[^0-9]+/, "");
    }

    this.state[type] = e.target.value;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.LoginBox}>
        <div className={style.sloganBox}>
          <img src={slogan} alt="" />
        </div>
        <div className={style.LoginInfoBox}>
          <div className={style.InputBox}>
            <div className={style.InputTitle}>姓名：</div>
            <div className={style.InputValue}>
              <input
                type="text"
                className={style.InputVauleDetial}
                onChange={this.InputChange.bind(this, "name")}
                onBlur={this.onInputBlur}
              />
            </div>
          </div>
          <div className={style.InputBox}>
            <div className={style.InputTitle}>性别：</div>
            <div className={style.InputValue}>
              <CitySelect
                placeholder={""}
                value={this.state.sex}
                onSelect={this.handleSexValue.bind(this)}
                onBlur={this.onInputBlur}
              />
            </div>
          </div>
          <div className={style.InputBox}>
            <div className={style.InputTitle}>工号：</div>
            <div className={style.InputValue}>
              <input
                type="text"
                className={style.InputVauleDetial}
                onChange={this.InputChange.bind(this, "wid")}
                onBlur={this.onInputBlur}
              />
            </div>
          </div>
        </div>
        <div
          className={style.LoginButton}
          style={{ backgroundImage: "url(" + button + ")" }}
          onClick={this.HandleSubmit}>
          立即出发
        </div>
      </div>
    );
  }
}
Login.contextTypes = {
  alert: PropTypes.func,
  getUserInfo: PropTypes.func,
  setUserInfo: PropTypes.func
};
export default Login;

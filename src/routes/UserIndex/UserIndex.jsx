import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./UserIndex.scss";
import userindexbkg from "assest/userindexbkg.png";
import button from "assest/button.png";
import pcicon from "assest/pcicon.png";

import RoleRule from "./components/RoleRule";
import PropTypes from "prop-types";

import { api } from "common/app";

export class UserIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: null,
      RoleRuleShow: false
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.HandleRoleRule = this.HandleRoleRule.bind(this);
    this.getUserIndexInfo = this.getUserIndexInfo.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.context.BKG(0);
    this.refreshProps(this.props);
    if (this.props.match.params.route) {
      switch (this.props.match.params.route) {
        case "role":
          this.state.RoleRuleShow = true;
          break;
      }
      this.setState(this.state);
    }
  }
  refreshProps(props) {
    // this.state.userinfo = this.context.getUserInfo();
    this.getUserIndexInfo();
  }
  getUserIndexInfo() {
    api.getIndexInfo().then(res => {
      if (res.code == 200) {
        this.state.userinfo = res.result;
        this.setState(this.state);
      }
    });
  }
  HandleRoleRule(boolean) {
    this.state.RoleRuleShow = boolean;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.UserIndexBox}>
        {this.state.RoleRuleShow ? (
          <RoleRule onClose={this.HandleRoleRule.bind(this, false)} info={this.state.userinfo} />
        ) : (
          ""
        )}
        {this.state.userinfo ? (
          <div
            className={style.UserBox}
            style={{ backgroundImage: "url(" + userindexbkg + ")" }}>
            <div
              className={style.Tittle}
              style={{ backgroundImage: "url(" + button + ")" }}>
              个人中心
            </div>
            <div className={style.HeadshotBox}>
              <img src={this.state.userinfo.avatarUrl} alt="" />
            </div>
            <div className={style.UserName}>{this.state.userinfo.username}</div>
            {/* <div
              className={style.UserRole}
              onClick={this.HandleRoleRule.bind(this, true)}>
              {this.state.userinfo.scorename}
            </div> */}
            <div className={style.UserInfoDetial}>
              <div className={style.DetialTittle}>
                <img src={pcicon} alt="" />
                <span>个人数据 </span>
                <span>>></span>
              </div>
              <div className={style.Content}>
                <div className={style.BaseBox}>
                  <div>{this.state.userinfo.regionid}</div>
                </div>
                <div className={style.BaseBox}>
                  <div>{this.state.userinfo.sex}</div>
                </div>
                <div className={style.BaseBox}>
                  <div>积分</div>
                  <div>{this.state.userinfo.score}</div>
                </div>
                <div className={style.BaseBox}>
                  <div>个人排名</div>
                  <div>第{this.state.userinfo.totle_rank}名</div>
                </div>
                <div className={style.BaseBox} style={{ flexGrow: 1 }}>
                  <div>{this.state.userinfo.regionid}排名</div>
                  <div>第{this.state.userinfo.region_rank}名</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <Link to='/'><div className={style.ReturnButton}>返回首页</div></Link>
      </div>
    );
  }
}
UserIndex.contextTypes = {
  getUserInfo: PropTypes.func,
  setUserInfo: PropTypes.func,
  BKG: PropTypes.func,
};
export default UserIndex;

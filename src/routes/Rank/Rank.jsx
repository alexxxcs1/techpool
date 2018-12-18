import React, { Component } from "react";
import style from "./Rank.scss";
import userindexbkg from "assest/userindexbkg.png";
import Person from "./ranktype/Person";
import AdminPerson from "./ranktype/AdminPerson";
import Region from "./ranktype/Region";

import PropTypes from "prop-types";
import rankbottom from 'assest/rankbottom.png'
import ranksword from 'assest/ranksword.png'



export class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      userinfo: null,
      role: 1
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.handleType = this.handleType.bind(this);
    this.switchPersionRank = this.switchPersionRank.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.context.BKG(1);
  }
  refreshProps(props) {
    //此处获取userinfo
    this.state.userinfo = this.context.getUserInfo();
    if(this.state.userinfo == null) return;
    this.state.role = this.state.userinfo.role;
    this.setState(this.state);
    
  }
  handleType() {
    this.state.type = this.state.type == 0 ? 1 : 0;
    this.setState(this.state);
  }
  switchPersionRank() {
    if (this.state.userinfo) {
      if (this.state.userinfo.role == 2) {
        return <AdminPerson userinfo={this.state.userinfo} />;
      } else {
        return <Person userinfo={this.state.userinfo} />;
      }
    } else {
      return <Person userinfo={this.state.userinfo} />;
    }
  }
  render() {
    return (
      <div className={style.Box}>
        <div
          className={style.RankBox}
          style={{ backgroundImage: "url(" + userindexbkg + ")" }}>
          {this.state.type == 0 ? (
            this.state.role == 1 ? (
              <Person userinfo={this.state.userinfo} />
            ) : (
              <AdminPerson userinfo={this.state.userinfo} />
            )
          ) : (
            <Region userinfo={this.state.userinfo} />
          )}
          <div className={style.ChangeTypeButton} onClick={this.handleType}>
            切换{this.state.type == 0 ? "大区" : "个人"}排行榜
          </div>
          <img src={ranksword} className={style.sword} alt=""/>
        </div>
        <div className={style.BotBkg}>
            <img src={rankbottom} alt=""/>
        </div>
      </div>
    );
  }
}
Rank.contextTypes = {
  getUserInfo: PropTypes.func,
  setUserInfo: PropTypes.func,
  BKG: PropTypes.func
};
export default Rank;

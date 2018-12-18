import React, { Component } from "react";
import style from "./Person.scss";

import button from "assest/button.png";
import tableheadicon from "assest/tableheadicon.png";
import tablerowicon from "assest/tablerowicon.png";
import { api } from "common/app";

export class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      cate:'KLK',
      rankdata: null
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.getRankData = this.getRankData.bind(this);
    this.createRank = this.createRank.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.getRankData();
  }
  refreshProps(props) {
      if (props.userinfo == null) return;
      this.state.userInfo = props.userinfo;
      console.log(props.userinfo,props.userinfo.cate);
      
      this.state.cate = (props.userinfo.role == 1?props.userinfo.cate:this.state.cate);
      this.setState(this.state);
  }
  getRankData() {
    api.getPersonRank().then(res => {
      if (res.code == 200) {
        this.state.rankdata = res.result;
      } else {
        alert(res.message);
      }
      this.setState(this.state);
    });
  }
  createRank() {
    if (this.state.rankdata==null||this.state.cate==null) return;
    console.log(this.state.cate);
    
    var cont = this;
    var itemNodes = this.state.rankdata[this.state.cate].map(function(
      itemBase,
      index
    ) {
      return (
        <div className={style.RowBase}>
          <div className={style.ColumnBase} style={{ width: "33%" }}>
            <div
              className={style.RowIcon}
              style={{ backgroundImage: "url(" + tablerowicon + ")" }}>
              第{itemBase.rank}名
            </div>
          </div>
          <div className={style.ColumnBase} style={{ width: "33%" }}>
            <div
              className={style.RowIcon}
              style={{ backgroundImage: "url(" + tablerowicon + ")" }}>
              {itemBase.username}
            </div>
          </div>
          <div className={style.ColumnBase} style={{ width: "33%" }}>
            <div
              className={style.RowIcon}
              style={{ backgroundImage: "url(" + tablerowicon + ")" }}>
              {itemBase.score}积分
            </div>
          </div>
        </div>
      );
    });
    return itemNodes;
  }
  render() {
    return (
      <div className={style.Box}>
        <div
          className={style.Tittle}
          style={{ backgroundImage: "url(" + button + ")" }}>
          个人排行榜
        </div>

        <div className={style.TabbleBody}>
          <div className={style.RowBase}>
            <div className={style.ColumnBase} style={{ width: "33%" }}>
              <div
                className={style.HeadIcon}
                style={{ backgroundImage: "url(" + tableheadicon + ")" }}>
                排名
              </div>
            </div>
            <div className={style.ColumnBase} style={{ width: "33%" }}>
              <div
                className={style.HeadIcon}
                style={{ backgroundImage: "url(" + tableheadicon + ")" }}>
                姓名
              </div>
            </div>
            <div className={style.ColumnBase} style={{ width: "33%" }}>
              <div
                className={style.HeadIcon}
                style={{ backgroundImage: "url(" + tableheadicon + ")" }}>
                积分
              </div>
            </div>
          </div>
            {this.createRank()}
        </div>
      </div>
    );
  }
}
export default Person;

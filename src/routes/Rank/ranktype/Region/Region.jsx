import React, { Component } from "react";
import style from "./Region.scss";

import button from "assest/button.png";
import tableheadicon from "assest/tableheadicon.png";
import tablerowicon from "assest/tablerowicon.png";
import { api } from "common/app";

export class Region extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      cate: "KLK",
      rankdata: null,
      role:1,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.getRankData = this.getRankData.bind(this);
    this.createRank = this.createRank.bind(this);
    this.createCateButton = this.createCateButton.bind(this);
    this.HandleCate = this.HandleCate.bind(this);
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
    this.state.role =  props.userinfo.role;
    this.state.cate =
      props.userinfo.role == 1 ? props.userinfo.cate : this.state.cate;
    this.setState(this.state);
    
  }
  createCateButton() {
    if (this.state.userInfo == null || this.state.rankdata == null) return;
    let itemNodes = [];
    for (const key in this.state.rankdata) {
      itemNodes.push(
        <div
          className={[
            style.cateButton,
            this.state.cate == key ? style.actbutton : ""
          ].join(" ")}
          onClick={this.HandleCate.bind(this, key)}>
          {key}
        </div>
      );
    }
    return itemNodes;
  }
  HandleCate(cate) {
    this.state.cate = cate;
    this.getRankData(null, this.state.cate);
    this.setState(this.state);
  }
  getRankData() {
    api.getRegionRank().then(res => {
      if (res.code == 200) {
        this.state.rankdata = res.result;
      } else {
        alert(res.message);
      }
      this.setState(this.state);
    });
  }
  createRank() {
    if (this.state.rankdata == null || this.state.cate == null) return;
    var cont = this;
    var itemNodes = this.state.rankdata.map(function(
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
              {itemBase.name}
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
        {/* {this.state.role == 2?<div className={style.cateGroupBox}>{this.createCateButton()}</div>:''} */}
        <div
          className={style.Tittle}
          style={{ backgroundImage: "url(" + button + ")" }}>
          大区排行榜
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
                大区
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
export default Region;

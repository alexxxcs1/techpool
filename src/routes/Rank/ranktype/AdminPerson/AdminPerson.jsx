import React, { Component } from "react";
import style from "./AdminPerson.scss";

import button from "assest/button.png";
import tableheadicon from "assest/tableheadicon.png";
import tablerowicon from "assest/tablerowicon.png";
import { api } from "common/app";

export class AdminPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      cate: "KLK",
      regionid: null,
      rankdata: null,
      regiondata: null
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.getRankData = this.getRankData.bind(this);
    this.createRank = this.createRank.bind(this);
    this.createCateButton = this.createCateButton.bind(this);
    this.HandleCate = this.HandleCate.bind(this);
    this.createRegionButton = this.createRegionButton.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.getRankData(this.state.regionid, this.state.cate);
  }
  refreshProps(props) {
    if (props.userinfo == null) return;
    this.state.userInfo = props.userinfo;
    this.state.cate =
      props.userinfo.role == 1 ? props.userinfo.cate : this.state.cate;
    this.setState(this.state);
  }
  getRankData(regionid, cate) {
    api.getAdminPersonRank(regionid, cate).then(res => {
      if (res.code == 200) {
        // this.state.cate = res.result.cate;
        this.state.regionid = res.result.regionid;
        this.state.rankdata = res.result.list;
        this.state.regiondata = res.result.region;
      } else {
      }
      this.setState(this.state);
    });
  }
  createRank() {
    if (this.state.rankdata == null || this.state.cate == null) return;
    var cont = this;
    var itemNodes = this.state.rankdata.map(function(itemBase, index) {
      return (
        <div className={style.RowBase} scroll='true'>
          <div className={style.ColumnBase} style={{ width: "20%" }} scroll='true'>
            <div
              className={style.RowIcon}
              scroll='true'
              style={{ backgroundImage: "url(" + tablerowicon + ")" }}>
              第{itemBase.rank}名
            </div>
          </div>
          <div className={style.ColumnBase} style={{ width:cont.state.regionid==0? "50%":"20%" }}>
            <div
              className={style.RowIcon}
              scroll='true'
              style={{ backgroundImage: "url(" + tablerowicon + ")" }}>
              {itemBase.username}{cont.state.regionid==0?'('+itemBase.regionid+')':''}
            </div>
          </div>
          {cont.state.regionid==0?'':<div className={style.ColumnBase} style={{ width: "40%" }}>
            <div
              className={style.RowIcon}
              scroll='true'
              style={{ backgroundImage: "url(" + tablerowicon + ")" }}>
              第{itemBase.region_rank}名
            </div>
          </div>}
          <div className={style.ColumnBase} style={{ width: "20%" }}>
            <div
              className={style.RowIcon}
              scroll='true'
              style={{ backgroundImage: "url(" + tablerowicon + ")" }}>
              {itemBase.score}积分
            </div>
          </div>
        </div>
      );
    });
    return itemNodes;
  }
  createCateButton() {
    if (this.state.userInfo == null || this.state.regiondata == null) return;
    let itemNodes = [];
    for (const key in this.state.regiondata) {
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
  createRegionButton() {
    if (this.state.userInfo == null || this.state.regiondata == null) return;

    var cont = this;
    var itemNodes = this.state.regiondata.map(function(
      itemBase,
      index
    ) {
      return (
        <div
          onClick={cont.HandleRegion.bind(cont, itemBase.id)}
          className={[
            style.RegionButton,
            cont.state.regionid == itemBase.id ? style.actRegionButton : ""
          ].join(" ")}>
          {itemBase.name}
        </div>
      );
    });
    return itemNodes;
  }
  HandleRegion(regionid) {
    this.state.regionid = regionid;
    this.getRankData(this.state.regionid, this.state.cate);
    this.setState(this.state);
  }
  getTotalData(){
    api.getPersonRank().then(res => {
      if (res.code == 200) {
        this.state.rankdata = res.result[this.state.cate];
      } else {
        alert(res.message);
      }
      this.setState(this.state);
    });
  }
  HandleTotalRank(regionid){
    this.state.regionid = regionid;
    this.getTotalData()
    this.setState(this.state);
  }
  render() {
    return [
      <div className={style.Box}>
        <div className={style.cateGroupBox}>
        {/* {this.createCateButton()} */}
        <div
          className={[
            style.cateButton,
            this.state.cate == 'KLK' ? style.actbutton : ""
          ].join(" ")}
          onClick={this.HandleCate.bind(this, 'KLK')}>
          KLK
        </div>
        <div
          className={[
            style.cateButton,
            this.state.cate == 'UTI' ? style.actbutton : ""
          ].join(" ")}
          onClick={this.HandleCate.bind(this, 'UTI')}>
          UTI
        </div>
        </div>
        <div
          className={style.Tittle}
          style={{ backgroundImage: "url(" + button + ")" }}>
          个人排行榜
        </div>
        <div className={style.RegionButtonGroup}>
          {this.createRegionButton()}
          {/* <div
            onClick={this.HandleTotalRank.bind(this, null)}
            className={[
              style.RegionButton,
              this.state.regionid == null ? style.actRegionButton : ""
            ].join(" ")}>
            总榜
          </div> */}
        </div>
        <div className={style.TabbleBody}>
          <div className={style.RowBase}>
            <div className={style.ColumnBase} style={{ width: "20%" }}>
              <div
                className={style.HeadIcon}
                style={{ backgroundImage: "url(" + tableheadicon + ")" }}>
                {this.state.regionid==0?'总排名':'区排名'}
              </div>
            </div>
            <div className={style.ColumnBase} style={{ width: "20%" }}>
              <div
                className={style.HeadIcon}
                style={{ backgroundImage: "url(" + tableheadicon + ")" }}>
                姓名
              </div>
            </div>
            {this.state.regionid==0?'':<div className={style.ColumnBase} style={{ width: "40%" }}>
              <div
                className={style.HeadIcon}
                style={{ backgroundImage: "url(" + tableheadicon + ")" }}>
                总排名
              </div>
            </div>}
            <div className={style.ColumnBase} style={{ width: "20%" }}>
              <div
                className={style.HeadIcon}
                style={{ backgroundImage: "url(" + tableheadicon + ")" }}>
                积分
              </div>
            </div>
          </div>
          <div className={style.TableContent}>{this.createRank()}</div>

          {/* <div className={style.RowBase}>
            <div className={style.ColumnBase} style={{ width: "33%" }}>
              <div
                className={style.RowIcon}
                style={{ backgroundImage: "url(" + tablerowicon + ")" }}>
                第一名
              </div>
            </div>
            <div className={style.ColumnBase} style={{ width: "33%" }}>
              <div
                className={style.RowIcon}
                style={{ backgroundImage: "url(" + tablerowicon + ")" }}>
                洪思宇
              </div>
            </div>
            <div className={style.ColumnBase} style={{ width: "33%" }}>
              <div
                className={style.RowIcon}
                style={{ backgroundImage: "url(" + tablerowicon + ")" }}>
                5积分
              </div>
            </div>
          </div> */}
        </div>
      </div>
    ];
  }
}
export default AdminPerson;

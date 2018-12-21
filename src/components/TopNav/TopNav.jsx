import React, { Component } from "react";
import style from "./TopNav.scss";
import logotop from "assest/logotop.png";
import returnbutton from "assest/returnbutton.png";
import userbutton from "assest/userbutton.png";
import PropTypes from "prop-types";
import music from "assest/music.png";
import bkgmusic from "assest/bkg.m4a";

export class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: null,
      musicon: false
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.JumpUrl = this.JumpUrl.bind(this);
    this.audioAutoPlay = this.audioAutoPlay.bind(this);
    this.handlemusic = this.handlemusic.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.audioAutoPlay();
  }
  refreshProps(props) {
    this.state.userinfo = this.context.getUserInfo();
    this.setState(this.state);
  }
  JumpUrl(url) {
    window.location.hash = url;
  }
  audioAutoPlay() {
    var audio = this.refs.music;
    let self = this;
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        audio.currentTime = 0.0;
        audio.play();
        self.state.musicon = true;
        self.setState(self.state);
      },
      false
    );
    document.addEventListener(
      "YixinJSBridgeReady",
      function() {
        audio.currentTime = 0.0;
        audio.play();
        self.state.musicon = true;
        self.setState(self.state);
      },
      false
    );
  }
  handlemusic() {
    this.state.musicon = this.state.musicon;
    if (this.state.musicon) {
      this.refs.music.play();
    } else {
      this.refs.music.pause();
    }
  }
  render() {
    return (
      <div className={style.TopNavBox}>
        <img src={logotop} className={style.logotop} alt="" />

        <audio ref="music" src={bkgmusic} autoPlay loop />

        <div className={style.HandleGroupButton}>
          
          {this.state.userinfo && window.location.hash != "#/login" ? (
            <div
              className={style.ButtonGroup}
              style={{ justifyContent: "flex-start" }}>
              {window.location.hash == "#/" ? (
                ""
              ) : (
                <div
                  className={style.Button}
                  onClick={this.JumpUrl.bind(this, "/")}>
                  <img src={returnbutton} className={style.iconbase} alt="" />
                  返回首页
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          {/* <img
            src={music}
            className={[
              style.musicicon,
              this.state.musicon ? style.actmusicicon : ""
            ].join(" ")}
          /> */}
          {this.state.userinfo && window.location.hash != "#/login" ? (
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
          ) : (
            ""
          )}
        </div>
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

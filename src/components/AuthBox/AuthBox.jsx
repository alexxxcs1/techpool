import React, { Component } from "react";
import { api } from "common/app";
import { HashRouter, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import shareicon from './shareicon.png'

export class AuthBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: 1
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.isAuth = this.isAuth.bind(this);
    this.setShare = this.setShare.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.setShare();
  }
  refreshProps(props) {
    if (!props.user) {
      this.getUserInfo();
      // this.isAuth();
    }
  }
  setShare() {
    var share_url = window.location.href;
    var share_img =
      "http://h5.rup-china.com/techpool2019/public/html/static/media/" +
      shareicon.split("/")[3];
    var share_title = "每日一练";
    var share_content = "2019年4月1日-2019年11月30日";
    api.getShare(window.location.href).then(
      response => {
        window.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: response.data.appid, // 必填，公众号的唯一标识
          timestamp: response.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: response.data.noncestr, // 必填，生成签名的随机串
          signature: response.data.signature, // 必填，签名，见附录1
          jsApiList: [
            "chooseImage",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "previewImage",
            "uploadImage",
            "checkJsApi",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "hideMenuItems",
            "startRecord",
            "stopRecord",
            "onVoiceRecordEnd",
            "playVoice",
            "pauseVoice",
            "onVoicePlayEnd",
            "uploadVoice",
            "downloadVoice"
          ]
        });
        window.wx.ready(function() {
          window.wx.onMenuShareAppMessage({
            title: share_title, // 分享标题
            desc: share_content, // 分享描述
            link: share_url, // 分享链接
            imgUrl: share_img, // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });

          window.wx.onMenuShareTimeline({
            title: share_title, // 分享标题
            desc: share_content, // 分享描述
            link: share_url, // 分享链接
            imgUrl: share_img, // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
        });
        window.wx.error(function(res) {});
      },
      err => {}
    );
  }
  getUserInfo() {
    api.getUserInfo().then(
      res => {
        if (res.code == 200) {
          this.state.isUser = res.result.is_user;
          this.context.setUserInfo(res.result);
          if (res.result.is_user == 0) {
              window.location.hash = '/login'
          }
        }else if(res.code == 4002){
          this.isAuth();
        }
        this.setState(this.state);
      },
      err => {
        this.state.isUser = 0;
        this.setState(this.state);
      }
    );
  }
  isAuth(){
    api.isAuth().then(res=>{
      if (res.code != 200) {
        api.getAuthUrl(window.location.href).then(res=>{
          if (res.code == 200) {
            window.location.href = res.data.url;
          }
        })
      }
    })
  }
  render() {
    return (
      <div style={{ display: "none" }}>
        {/* {this.state.isUser == 0 ? <Redirect to="/login" /> : ""} */}
      </div>
    );
  }
}
AuthBox.contextTypes = {
  alert: PropTypes.func,
  getUserInfo: PropTypes.func,
  setUserInfo: PropTypes.func
};
export default AuthBox;

import React, { Component } from "react";
import { api } from "common/app";
import { HashRouter, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";

export class AuthBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: 1
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    if (!props.user) {
      this.getUserInfo();
    }
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
        }
        this.setState(this.state);
      },
      err => {
        this.state.isUser = 0;
        this.setState(this.state);
      }
    );
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

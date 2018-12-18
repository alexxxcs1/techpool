import React, { Component } from "react";
import { Link} from 'react-router-dom';
import style from "./Answer.scss";

import AnswerBox from "./components/AnswerBox";
import RuleBox from "./components/RuleBox";
import PropTypes from "prop-types";
import QuestionComplete from "assest/QuestionComplete.png";
import {api} from 'common/app'

export class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.customRoute = this.customRoute.bind(this);
    this.setRouteStatus = this.setRouteStatus.bind(this);
  }
  getChildContext() {
    return {
      setRouteStatus: this.setRouteStatus
    };
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    
  }
  customRoute() {
    switch (this.state.status) {
      case 0:
        return <RuleBox />;
      case 1:
        return <AnswerBox />;
      case 2:
        return [<img className={style.Complete} src={QuestionComplete} />, <Link to='/'> <div className={style.ReturnIndex}>返回首页</div> </Link>];
    }
  }
  setRouteStatus(status) {
    this.state.status = status;
    this.setState(this.state);
  }
  render() {
    return <div className={style.AnswerBox}>{this.customRoute()}</div>;
  }
}
Answer.childContextTypes = {
  setRouteStatus: PropTypes.func
};
export default Answer;

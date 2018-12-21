import React, { Component } from "react";
import style from "./Rule.scss";
import button from "assest/button.png";
import rule from "assest/rule.png";
import slidetips from "assest/slidetips.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export class Rule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshProps = this.refreshProps.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.context.BKG(0);
  }
  refreshProps(props) {}
  render() {
    return (
      <div className={style.RuleBox}>
        <div className={style.RuleDetialBox}>
          <div
            className={style.Tittle}
            style={{ backgroundImage: "url(" + button + ")" }}>
            活动规则
          </div>
          <div className={style.Detial}>
            <img src={rule} className={style.rulepng} scroll="true" alt="" />
          </div>
          <div className={style.slideTipsBox}>
              上拉滑动
              <img src={slidetips} className={style.slideTips} alt="" />
            </div>
          <Link to="/">
            <div className={style.ReturnButton}>返回首页</div>
          </Link>
        </div>
      </div>
    );
  }
}
Rule.contextTypes = {
  BKG: PropTypes.func
};
export default Rule;

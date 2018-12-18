import React, { Component } from "react";
import style from "./RuleBox.scss";
import PropTypes from "prop-types";
import button from "assest/button.png";

export class RuleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshProps = this.refreshProps.bind(this);
    this.HandleStartAnswer = this.HandleStartAnswer.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  HandleStartAnswer() {
    this.context.setRouteStatus(1);
  }
  render() {
    return [
      <div
        className={style.TittleIcon}
        style={{ backgroundImage: "url(" + button + ")" }}>
        天道酬勤
      </div>,
      <div className={style.RuleBox}>
        <div className={style.RuleDetial}>
          <div className={style.RuleTittle}>得分规则:</div>
          <div className={style.RuleContent}>
            每天4题，（此处为详细得分规则）
            <br />
            1.选手通过填写姓名工号登陆系统，参与此环节。
            <br />
            2.选手参与答题，每日答4题，4题全部答对
            可得1分，答错可以纠错提示重新作答。
            <br /> 3. 连续5天答对后，可额外增加1分，
            连续10天答对后，可额外增加2分，连续15天答对后，可额外增加3分，
            连续20天答对后，可额外增加4分，
            即本环节满分为30分（20分基础分+10分额外加分）
            <br />
            4.选手的积分到达相应的标准，可获得与分值相对应的称谓。
            <br />
            5.本环节的个人成绩将延续至线下比赛当中。
          </div>
        </div>
      </div>,
      <div className={style.StartAnswer} onClick={this.HandleStartAnswer}>
        开始答题
      </div>
    ];
  }
}
RuleBox.contextTypes = {
  setRouteStatus: PropTypes.func
};
export default RuleBox;

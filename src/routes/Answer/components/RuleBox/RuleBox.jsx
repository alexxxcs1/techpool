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
          <div className={style.RuleContent}>
            <p>活动时间：</p> 
            <p>试运行：2019年4月1日-2019年4月30日</p> 
            <p>正式活动时间：2019年5月1日-2019年12月31日</p> 
            <br/>
            <p>规则如下：</p> 
            <p>1. 选手通过填写姓名工号登陆系统，参与答题。</p> 
            <p>2. 选手参与答题，每日答4题，每题1分，答对得分，答错不得分。4题全部答对可得4分。	</p> 
            <p>3. 本环节大区成绩为大区所有选手的分数平均值。</p> 
            <p>4. 排行榜出现同分情况，按照答题时间先后排名。</p> 
            <p>5. 每月最后一天18:00时至第二天9:00时为系统维护时间。选手无法在此时段参与答题。</p> 
            <p>6. 每月最后一天积分清零。</p> 
            <br/>
            <p className={style.SmTips}>备注：操作过程中如有遇到问题请联系工作人员Lee</p> 
            <p className={style.SmTips}>邮箱：956536920@qq.com</p> 
            <p className={style.SmTips}>电话：13916153363</p> 
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

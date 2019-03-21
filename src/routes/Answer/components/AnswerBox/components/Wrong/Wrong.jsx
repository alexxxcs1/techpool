import React, { Component } from "react";
import style from "./Wrong.scss";
import DarkBox from "components/DarkBox";
import PropTypes from "prop-types";
import clickicon from "assest/click.png";

export class Wrong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipsurl:null,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.showTips = this.showTips.bind(this);
    this.next = this.next.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    this.state.tipsurl = props.tips;
    this.setState(this.state);
  }
  next(){
    this.props.onClose();
  }
  showTips(){
    // this.props.onClose();
    // this.context.PicView({
    //   show:true,
    //   url:this.state.tipsurl,
    //   callback:()=>{

    //   }
    // })
  }
  render() {
    return (
      <DarkBox>
        <div className={style.WrongBox}>
          <div className={style.TitleBox}>
            <div className={style.Tittleleft} />
            <div className={style.TittleValue}>回答错误</div>
            <div className={style.Tittleright} />
          </div>
          <div className={style.ResultBox}>
            <div>很遗憾!</div>
            <div>回答错误</div>
          </div>
          <div className={style.ResultAnswer}>
            <span>纠错提示：</span>
            <span >本题正确答案选择 {this.state.tipsurl}</span>
            {/* <div className={style.clickicon}>
             点击 <img src={clickicon} className={style.icon} alt=""/>
            </div> */}
          </div>
          <div className={style.NextButton} onClick={this.next}>下一题</div>
        </div>
      </DarkBox>
    );
  }
}
Wrong.contextTypes = {
  PicView: PropTypes.func,
};
export default Wrong;

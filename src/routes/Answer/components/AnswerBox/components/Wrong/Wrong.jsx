import React, { Component } from "react";
import style from "./Wrong.scss";
import DarkBox from "components/DarkBox";

export class Wrong extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshProps = this.refreshProps.bind(this);
    this.next = this.next.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  next(){
    this.props.onClose();
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
            <span>本题知识点详细解答</span>
          </div>
          <div className={style.NextButton} onClick={this.next}>重新答题</div>
        </div>
      </DarkBox>
    );
  }
}
export default Wrong;

import React, { Component } from "react";
import style from "./Correct.scss";
import DarkBox from "components/DarkBox";

export class Correct extends Component {
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
        <div className={style.CorrectBox} >

            <div className={style.TitleBox}>
                <div className={style.Tittleleft}></div>
                <div className={style.TittleValue}>回答正确</div>
                <div className={style.Tittleright}></div>
            </div>
            <div className={style.ResultBox}>
                <div>恭喜您！</div>
                <div>回答正确</div>
            </div>
            <div className={style.NextButton}  onClick={this.next}>
                下一题
            </div>
        </div>
      </DarkBox>
    );
  }
}
export default Correct;

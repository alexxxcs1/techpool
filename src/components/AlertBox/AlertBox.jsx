import React, { Component } from "react";
import style from "./AlertBox.scss";
import DarkBox from "components/DarkBox";

export class AlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        AlertValue:null,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.onAgree = this.onAgree.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
      if (props.option) {
          this.state.AlertValue = props.option.value;
          this.state.CallBack = props.option.callback;
          this.setState(this.state)
      }
  }
  onAgree(){
    this.state.CallBack();
  }
  render() {
    return (
      <DarkBox>
        <div className={style.AlertBox} >
            <div className={style.AlertValue}>
                {this.state.AlertValue}
            </div>
            <div className={style.Button} onClick={this.onAgree}>
                确定
            </div>
        </div>
      </DarkBox>
    );
  }
}
export default AlertBox;

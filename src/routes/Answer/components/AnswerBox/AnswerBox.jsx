import React, { Component } from "react";
import style from "./AnswerBox.scss";
import button from "assest/button.png";
import Correct from "./components/Correct";
import Wrong from "./components/Wrong";
import {api} from 'common/app'

import PropTypes from "prop-types";

export class AnswerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onAjax:false,
      result: null,
      data: [],
      steep: 0,
      UserAnswer: [[], [], [], []]
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.HandleSelectOption = this.HandleSelectOption.bind(this);
    this.HandleSteep = this.HandleSteep.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.getQuestData = this.getQuestData.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.getQuestData();
  }
  refreshProps(props) {
    
  }
  HandleSelectOption(OptionID) {
    if (this.state.data[this.state.steep].type === 'checkbox') {
        if (this.state.UserAnswer[this.state.steep].includes(OptionID)) {
          console.log('splice');
          
          this.state.UserAnswer[this.state.steep].splice(this.state.UserAnswer[this.state.steep].indexOf(OptionID),1);
        }else{
          console.log('asd');
          
          this.state.UserAnswer[this.state.steep].push(OptionID);
        }
    }else{
      this.state.UserAnswer[this.state.steep] = [OptionID];
      
    }
    this.setState(this.state);
  }
  HandleSteep() {
    if(this.state.onAjax) return;
    if (this.state.UserAnswer[this.state.steep].length === 0) {
      this.context.alert({
        show: true,
        value: "请选择至少一个答案！",
        callback: () => {}
      });
    } else {
      let qid = this.state.data[this.state.steep].id;
      let answer = '';
      this.state.UserAnswer[this.state.steep].forEach((value)=>{answer+=value});
      let rightanswer = this.state.data[this.state.steep].success;
      this.state.onAjax = true;
      api.answerAllQuestion(qid,answer).then(res=>{
        if (res.code === 200) {
          // if (answer === this.state.data[this.state.steep].success) {
          //     this.state.result = 1;
          // } else {
          //   this.state.result = 0;
          // }
          this.state.result = res.result;
          this.state.onAjax = false;
          this.setState(this.state);
        }else{
          alert(res.message);
          this.state.onAjax = false;
          this.setState(this.state);
        }
        this.setState(this.state);
      },err=>{
        alert('服务器错误,请稍后重试');
      })
      
    }
    this.setState(this.state);
  }
  getQuestData() {
    api.getQuestion().then(res=>{
      if (res.code == 200) {
        this.state.data = res.result;
        this.setState(this.state);
      }else{
        this.context.alert({
          show: true,
          value: res.message,
          callback: () => {
            this.context.setRouteStatus(2);
          }
        });
      }
    })
    this.setState(this.state);
  }
  createQuestion() {
    if (this.state.data.length == 0) return;
    let result = [];
    result.push(
      <div className={style.QuestionTittle}>
        {this.state.data[this.state.steep].type=='radio'?'(单选题)':'(多选题)'}{this.state.data[this.state.steep].title}
      </div>
    );
    result.push(
      <div className={style.QuestionOption}>
        {(() => {
          let optionarr = [];
          let obj = this.state.data[this.state.steep].check;
          for (const key in obj) {
            optionarr.push(
              <div
                className={[
                  style.OptionBox,
                  this.state.UserAnswer[this.state.steep].includes(key)
                    ? style.actOption
                    : ""
                ].join(" ")}
                onClick={this.HandleSelectOption.bind(this, key)}>
                <div className={style.OptionKey}>{key}.</div>
                <div className={style.OptionKeyValue}>{obj[key]}</div>
              </div>
            );
          }
          return optionarr;
        })()}
      </div>
    );
    return result;
  }
  HandleCloseResult(type) {
    this.state.result = null;
    if (this.state.steep + 1 == this.state.data.length) {
      this.context.setRouteStatus(2);
    } else {
      this.state.steep += 1;
    }
    this.setState(this.state);
  }
  render() {
    return [
      <div className={style.AnswerBox}>
        {this.state.result == 1 ? (
          <Correct onClose={this.HandleCloseResult.bind(this)} />
        ) : (
          ""
        )}
        {this.state.result == 0 ? (
          <Wrong onClose={this.HandleCloseResult.bind(this)} tips={this.state.data[this.state.steep].success}/>
        ) : (
          ""
        )}
        <div
          className={style.TittleIcon}
          style={{ backgroundImage: "url(" + button + ")" }}>
          天道酬勤
        </div>
        {this.createQuestion()}
        <div className={style.QuestionNumber}>
          （{this.state.steep + 1}/{this.state.data.length}）
        </div>
      </div>,
      <div className={style.nextQuestion} onClick={this.HandleSteep.bind(this)}>
        提交
      </div>
    ];
  }
}
AnswerBox.contextTypes = {
  alert: PropTypes.func,
  setRouteStatus: PropTypes.func
};
export default AnswerBox;

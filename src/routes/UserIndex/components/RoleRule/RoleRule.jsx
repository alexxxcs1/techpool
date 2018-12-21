import React, { Component } from 'react'
import style from './RoleRule.scss'
import DarkBox from "components/DarkBox";
import rolemale from 'assest/role-male.png'
import rolefemale from 'assest/role-female.png'
import button from 'assest/button.png'
  
export class RoleRule extends Component {
constructor(props) {
  super(props);
  this.state = {
    userinfo:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleClose = this.HandleClose.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  console.log(props.info);
  
  this.state.userinfo = props.info;
  this.setState(this.state);
}
HandleClose(){
  this.props.onClose();
}
render() {
  return (
    <DarkBox>
        <div className={style.RoleRuleBox} >
            <div className={style.closebutton} onClick={this.HandleClose}></div>
            <div className={style.Tittle} style={{backgroundImage:'url('+button+')'}}>称谓规则</div>
            <img src={this.state.userinfo?(this.state.userinfo.sex=='男'?rolemale:rolefemale):rolemale} className={style.roleimg} alt=""/>
        </div>
      </DarkBox>
   )
   }
}
export default RoleRule
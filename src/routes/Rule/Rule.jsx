import React, { Component } from 'react'
import style from './Rule.scss'
import button from 'assest/button.png'
import { Link } from "react-router-dom";
  
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
}
refreshProps(props) {
  
}
render() {
  return (
    <div className={style.RuleBox}>
        <div className={style.RuleDetialBox}>
            <div className={style.Tittle} style={{backgroundImage:'url('+button+')'}}>活动规则</div>
            <div className={style.Detial}></div>
            <Link to='/home'><div className={style.ReturnButton}>返回</div></Link>
        </div>
    </div>
   )
   }
}
export default Rule
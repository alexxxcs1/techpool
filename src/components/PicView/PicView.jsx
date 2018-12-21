import React, { Component } from 'react'
import style from './PicView.scss'
import DarkBox from 'components/DarkBox'
  
export class PicView extends Component {
constructor(props) {
  super(props);
  this.state = {
    url:null,
    CallBack:()=>{},
    overflow:false
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.onClose = this.onClose.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props); 
}
refreshProps(props) {
    if (props.option) {
        this.state.url = props.option.url;
        this.state.CallBack = props.option.callback;
        this.setState(this.state)
    }
    if (window.document.body.clientWidth/this.refs.pic.clientWidth*this.refs.pic.clientHeight/window.document.body.clientHeight>1) {
        this.state.overflow = true;
        this.setState(this.state);
    }
}
onClose(){
    this.state.CallBack();
}
render() {
  return (
    <DarkBox>
        <div className={style.CloseButton} onClick={this.onClose}></div>
        <div className={style.PicViewBox} style={{justifyContent:this.state.overflow?'flex-start':'center'}}>
            <img ref='pic' className={style.ViewPic} src={this.state.url} alt=""/>
        </div>
    </DarkBox>
   )
   }
}
export default PicView
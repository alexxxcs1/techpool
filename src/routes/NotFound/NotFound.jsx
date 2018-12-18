
import React, { Component } from 'react'
import style from './NotFound.scss'

export class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageonload:false,
    };
  }
  componentDidMount()
  {
    this.setState({
      pageonload:true,
    })
  }
  render() {
    return (
      <div>
        <div className={style.NotFoundBox}>
            <span>404NOTFOUND</span>
        </div>

      </div>
    )
  }
}

export default NotFound

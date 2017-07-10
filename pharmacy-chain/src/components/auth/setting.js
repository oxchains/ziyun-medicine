/**
 * Created by finch on 7/10/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserInfo from './userinfo';
import PwdReset from './pwdreset';
import  '../css/setting.css';
import {
  Route,
  Link
} from 'react-router-dom'

import {userPwdAction, userInfoAction} from '../../actions/signup';

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgFile: false,
      index: 0
    };

    this.silderBar = silderBar.bind(this);
  }

  handleClick(index) {

    if (index === 0) {
      this.setState({
        index: 0
      })
    } else {
      this.setState({
        index: 1
      })
    }
  }


  render() {
    return (
      <div>
        <div style={{marginLeft: '360px', marginTop: '75px'}}>
          <div className="container">
            <div className="row">
              <div className="col-xs-4">
                {this.silderBar()}
              </div>

              <Route exact path={`${this.props.match.url}`} component={UserInfo}/>
              <Route path={`${this.props.match.url}/pwdreset`} component={PwdReset}/>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

function silderBar() {
  return (
    <div style={{width: '300px', height: '170px', border: '1px solid #6c6c6c'}}>
      <div style={{textAlign: 'center', paddingBottom: '16px', paddingTop: '16px'}}>
        <img src="/public/img/user-icon.png"/>
        <label style={{marginLeft: '24px'}}>用户设置</label>
      </div>
      <div style={{height: '1px', marginLeft: '26px', marginRight: '26px', backgroundColor: '#6c6c6c'}}></div>
      <ul>
        <li style={{marginTop: '16px', marginBottom: '16px'}}>
          <Link to={`${this.props.match.url}`} id={this.state.index == 0 ? 'color-blue' : 'color-white'}
                onClick={() => this.handleClick(0)}>个人信息</Link>
        </li>
        <li style={{marginTop: '16px', marginBottom: '16px'}}>
          <Link to={`${this.props.match.url}/pwdreset`} id={this.state.index == 1 ? 'color-blue' : 'color-white'}
                onClick={() => this.handleClick(1)}>修改密码</Link>
        </li>
      </ul>
    </div>
  )
}


export default connect(null)(Setting);
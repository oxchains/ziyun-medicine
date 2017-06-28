import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import AllianceList from './alliance_list';

class Welcome extends  Component {

  renderUserInfo() {
    if(this.props.authenticated) {
      const user = JSON.parse(localStorage.getItem('user'));
      return <span>{user.name}</span>
    } else {
      return <div></div>
    }
  }

  render() {

    return (
      <div className="container">
        <section className="content">
          <div className="row">
            <div className="col-md-3"><AllianceList/></div>
            <div className="col-md-9 text-center">
              <h3>欢迎您, {this.renderUserInfo()}</h3>
              <p>现在时间是: <Moment locale="zh-cn" format="lll"></Moment></p>
              <p>请点击上方导航栏开始使用</p>
            </div>
          </div>
        </section>
      </div>);
  }

}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Welcome);
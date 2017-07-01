import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavTop } from './nav_top';


class Header extends  Component {

  renderUserInfo() {
    if(this.props.authenticated) {
      const username = localStorage.getItem('username');
      return <div className="container user-info">
        <div className="pull-left">欢迎加入全国医药流通行业区块链联盟</div>
        <div className="pull-right">
          <span className="margin-r-10"><i className="fa fa-user"></i> {username}</span>
          <Link to="/setting" className="margin-r-10 link-gray">用户设置</Link>
          <Link to="/unaudit" className="margin-r-10 link-gray">待审查列表</Link>
          <Link to="/signout" className="link-gray">退出</Link>
        </div>
      </div>
    } else {
      return <div></div>
    }
  }

  render() {

    return (
      <div className="site-header" role="banner">
        <section data-type="background" data-speed="5">
          <article>
            <div className="container clearfix">
              <div className="row">
                <div className="col-sm-12 text-center">
                  <h1 className="title">全国医药流通行业区块链联盟</h1>
                  <h5 className="sub-title text-uppercase">National pharmaceutical distribution industry block chain alliance</h5>
                </div>
              </div>
            </div>
          </article>
        </section>

        <NavTop />

        {this.renderUserInfo()}

      </div>);
  }

}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
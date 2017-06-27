import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends  Component {

  renderUserInfo() {
    if(this.props.authenticated) {
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

        <div className="navbar-wrapper">
          <div className="navbar navbar-default" role="navigation">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li className="active"><a href="/">平台首页</a></li>
                  <li><a href="/">联盟动态</a></li>
                  <li><a href="/">节点管理</a></li>
                  <li><a href="/">追溯查证</a></li>
                  <li><a href="/">链上统计</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>);
  }

}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
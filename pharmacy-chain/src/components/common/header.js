import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavTop } from './nav_top';


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

        <NavTop />

      </div>);
  }

}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
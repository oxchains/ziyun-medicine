/**
 * oxchain
 *
 *
 * Author: Jun
 * Date: 28/06/2017
 *
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export class NavTop extends Component {
  constructor(props) {
    super(props);
    this.state = {current: ''};

    this.renderLink = this.renderLink.bind(this);
  }

  handleLinkClick(e) {
    this.setState({current: e.target.id});
  }

  renderLink({path, title}) {
    return (<li key={path} className={window.location.pathname == path ? 'active' : ''}
                onClick={this.handleLinkClick.bind(this)}>
      <Link id={path} to={path} style={{fontSize: '18px', color: '#6c6c6c'}}>{title}</Link>
    </li>)
  }

  render() {
    const links = [
      {path: '/', title: '平台首页'},
      {path: '/alliance', title: '联盟动态'},
      {path: '/peer', title: '节点管理'},
      {path: '/query', title: '追溯查证'},
      {path: '/stat', title: '链上统计'}
    ];

    return (
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
              <ul className="nav navbar-nav nav-divider">
                { links.map(this.renderLink) }
              </ul>
            </div>
          </div>
        </div>
      </div>);
  }

}
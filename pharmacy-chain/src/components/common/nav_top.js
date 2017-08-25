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
    this.renderLinkquery = this.renderLinkquery.bind(this)
  }

  handleLinkClick(e) {
    this.setState({current: e.target.id});
  }
    handleLinkClickquery(e){
        this.setState({current: e.target.id});
    }

  renderLink({path, title}) {
    return (<li key={path} className={window.location.pathname == path ? 'active' : ''}
                onClick={this.handleLinkClick.bind(this)}>
      <Link id={path} to={path} style={{
        fontSize: '18px',
        color: '#6c6c6c',
        paddingLeft: '0px',
        paddingRight: '40px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginRight: '0px'
      }}>{title}</Link>
    </li>)
  }

  renderTargetLink({path, title}) {
      return (<li key={path} className={window.location.pathname == path ? 'active' : ''}>
        <a href={path} target="_blank" style={{
            fontSize: '18px',
            color: '#6c6c6c',
            paddingLeft: '0px',
            paddingRight: '40px',
            paddingTop: '0px',
            paddingBottom: '0px',
            marginRight: '0px'}}>{title}</a>
      </li>)
  }

    renderLinkquery({path, title}) {
        return (<li key={path} className={window.location.pathname == path ? 'active' : ''}
                    onClick={this.handleLinkClickquery.bind(this)}>
            <Link id={path} to={path} style={{
                fontSize: '18px',
                color: '#6c6c6c',
                paddingLeft: '0px',
                paddingRight: '40px',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginRight: '0px'
            }}>{title}</Link>
        </li>)
    }

  render() {
    const links = [
      {path: '/', title: '平台首页'},
      {path: '/alliance', title: '联盟动态'},
    ];

    const targetLinks = [
        {path: 'http://nmba-admin.ziyun56.com/', title: '节点管理'},
        {path: 'http://trace.ziyun56.com', title: '追溯查证'},
        {path: 'https://datav.aliyun.com/share/85603cadebbedbee1920046c13b971ae', title: '链上统计'},

    ]
      const querylinks = [
          {path:'/infoquery',title:'首营资料查询'}
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
                {links.map(this.renderLink) }
                {targetLinks.map(this.renderTargetLink)}
                {querylinks.map(this.renderLinkquery)}
              </ul>
            </div>
          </div>
        </div>
      </div>);
  }

}
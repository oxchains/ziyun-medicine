/**
 * oxchain
 *
 *
 * Author: Jun
 * Date: 28/06/2017
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class NavTop extends Component {

  render() {
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
              <ul className="nav navbar-nav">
                <li className="active"><a href="/">平台首页</a></li>
                <li><a href="/alliance">联盟动态</a></li>
                <li><a href="/node">节点管理</a></li>
                <li><a href="/query">追溯查证</a></li>
                <li><a href="/statistics">链上统计</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>);
  }

}
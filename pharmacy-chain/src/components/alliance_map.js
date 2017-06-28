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
import { fetchAllianceList } from '../actions/alliance';
import AMap from './amap';
import css from './css/alliance.css';

class AllianceMap extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAllianceList();
  }

  render() {
    if(this.props.all===null) {
      return <div><section className="content"><h1>Loading...</h1></section></div>
    }

    return (
      <div className="box-shadow">
        <AMap markers={this.props.all} />
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    all: state.alliance.all
  };
}

export default connect(mapStateToProps, { fetchAllianceList })(AllianceMap);
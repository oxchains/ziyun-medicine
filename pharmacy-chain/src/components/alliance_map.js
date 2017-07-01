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

const fakeData = [
    { "latitude": 39.942131, "longitude": 116.40825 },
    { "latitude": 22.687483, "longitude": 114.380001 },
    { "latitude": 31.190012, "longitude": 121.563775 },
    { "latitude": 39.918058, "longitude": 116.397026 },
    { "latitude": 29.04177,  "longitude": 111.693665 },
    { "latitude": 22.746781, "longitude": 114.134808 },
    { "latitude": 30.263842, "longitude": 120.123077 },
    { "latitude": 30.370751, "longitude": 120.166337 },
    { "latitude": 22.736781, "longitude": 114.034808 },
    { "latitude": 39.902895, "longitude": 116.427915 }
  ];

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
        <AMap markers={ this.props.all } />
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    all: state.alliance.all
  };
}

export default connect(mapStateToProps, { fetchAllianceList })(AllianceMap);
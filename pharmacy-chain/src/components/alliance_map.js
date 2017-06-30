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
    { "lat": 39.942131, "lng": 116.40825 },
    { "lat": 22.687483, "lng": 114.380001 },
    { "lat": 31.190012, "lng": 121.563775 },
    { "lat": 39.918058, "lng": 116.397026 },
    { "lat": 29.04177,  "lng": 111.693665 },
    { "lat": 22.746781, "lng": 114.134808 },
    { "lat": 30.263842, "lng": 120.123077 },
    { "lat": 30.37075, "lng": 120.166337 },
    { "lat": 22.736781, "lng": 114.034808 },
    { "lat": 39.902895, "lng": 116.427915 }
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
        {/*this.props.all*/}
        <AMap markers={ fakeData } />
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    all: state.alliance.all
  };
}

export default connect(mapStateToProps, { fetchAllianceList })(AllianceMap);
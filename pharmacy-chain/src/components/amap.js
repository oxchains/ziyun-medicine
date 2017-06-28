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

class AMap extends  Component {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.map = new window.AMap.Map(this.refs.map, {
      resizeEnable: true,
      zoom: 3
    });

    this.map.plugin(["AMap.ToolBar"], () => {
      this.map.addControl(new window.AMap.ToolBar());
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.markers && nextProps.markers.length>0) {
      /*nextProps.markers.forEach((m)=>{
        var marker = new window.AMap.Marker({
          position: [m.location.lng, m.location.lat],
          map: this.map
        });
      });
      this.map.setFitView();*/

      var markers = nextProps.markers.map((m)=>{
        return new window.AMap.Marker({
          position: [m.location.lng, m.location.lat],
          content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
          offset: new window.AMap.Pixel(-15,-15)
        })
      });

      if (this.cluster) {
        this.cluster.setMap(null);
      }
      this.cluster = new window.AMap.MarkerClusterer(this.map, markers,{gridSize:80});
      this.map.setFitView();
    }
  }

  render() {

    return (
      <div id="map" ref="map">
      </div>);
  }

}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(AMap);
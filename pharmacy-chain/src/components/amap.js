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
      center: this.props.center || [106.00001,35.042537],
      zoom: 4
    });

    this.map.plugin(["AMap.ToolBar"], () => {
      this.map.addControl(new window.AMap.ToolBar());
    });

    this.renderCluser(this.props.markers);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.markers && nextProps.markers.length>0) {
      /*nextProps.markers.forEach((m)=>{
        var marker = new window.AMap.Marker({
          position: [m.location.longitude, m.location.latitude],
          map: this.map
        });
      });
      this.map.setFitView();*/

      this.renderCluser(nextProps.markers);
      //this.map.setFitView();
    }
  }

  renderCluser(markersData) {
    var markers = markersData.map((m)=>{
      return new window.AMap.Marker({
        position: [m.longitude, m.latitude],
        content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
        offset: new window.AMap.Pixel(-15,-15)
      })
    });

    if (this.cluster) {
      this.cluster.setMap(null);
    }
    this.cluster = new window.AMap.MarkerClusterer(this.map, markers,{gridSize:80});
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
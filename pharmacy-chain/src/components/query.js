/**
 * oxchain
 * 追溯查证
 *
 * Author: Jun
 * Date: 30/06/2017
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ReactMoment from 'react-moment';
import { fetchSensorData } from '../actions/query';

import css from './css/stat.css';

class Query extends Component {
  constructor(props) {
    super(props);

    this.state = { serial:'', type:'serial', error:null, spin:false, showResult:false };
  }

  handleSubmit() {
    const { serial, type } = this.state;
    if(!serial) return;

    this.setState({ spin:true });
    this.props.fetchSensorData({ serial, type }, err => this.setState({ error: err ? err : null, spin:false, showResult: !err }));
  }

  hideResult() {
    this.setState({showResult:false});
  }

  radioChange(e) {
    this.setState({type:e.target.value});
  }


  renderAlert() {
    if (this.state.error) {
      return (
        <div className="alert alert-danger alert-dismissable">
          {this.state.error}
        </div>
      );
    }
  }

  render() {

    return (
      <div className="container">
        <div className={`box stat-box no-border no-shadow ${this.state.showResult?'hidden':''}`}>
          <div className="box-header with-border">传感器数据查询</div>
          <div className="box-body">
            <div className="row">
              <div className="col-md-12">
                <form className="form-horizontal">
                  <div className={`form-group has-feedback`}>
                    <div className="col-md-6 col-md-offset-3">
                      <label className="margin-r-5"><input name="type" type="radio" value="serial" checked={this.state.type==='serial'} onChange={this.radioChange.bind(this)}/> 传感器编号</label>
                      <label className="margin-r-5"><input name="type" type="radio" value="equipment" checked={this.state.type==='equipment'}  onChange={this.radioChange.bind(this)}/> 设备编号</label>
                    </div>
                    <div className="col-md-6 col-md-offset-3">
                      <input name="remark" type="text" className="form-control" placeholder={`请输入${this.state.type==='serial'?'传感器':'设备'}编号`}
                             value={this.state.serial} onChange={e=>this.setState({serial: e.target.value})}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                      <button type="button" onClick={this.handleSubmit.bind(this)} disabled={!this.state.serial}
                              className="btn btn-primary" style={{width:'100%'}}><i className={`fa fa-spinner fa-spin ${this.state.spin?'':'hidden'}`}></i> 查询 </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        <div className={`box stat-box no-border no-shadow ${this.state.showResult?'':'hidden'}`}>
          <div className="box-header with-border">查询{this.state.type==='serial'?'传感器':'设备'}编号: {this.state.serial}</div>
          <div className="box-body">
            <div className="row">
              <div className="col-md-12">
                <div className="form-horizontal">
                  { this.props.sensor ?
                    <div>
                      <div className={`form-group`}>
                        <label className="col-sm-3 control-label">ID</label>
                        <div className="col-sm-9 control-text">{ this.props.sensor.id }</div>
                      </div>
                      <div className={`form-group`}>
                        <label className="col-sm-3 control-label">传感器编号</label>
                        <div
                          className="col-sm-9 control-text">{ this.props.sensor.SensorNumber }</div>
                      </div>
                      <div className={`form-group`}>
                        <label className="col-sm-3 control-label">传感器类型</label>
                        <div
                          className="col-sm-9 control-text">{ this.props.sensor.SensorType }</div>
                      </div>
                      <div className={`form-group`}>
                        <label className="col-sm-3 control-label">设备编号</label>
                        <div
                          className="col-sm-9 control-text">{ this.props.sensor.EquipmentNumber }</div>
                      </div>
                      <div className={`form-group`}>
                        <label className="col-sm-3 control-label">设备类型</label>
                        <div
                          className="col-sm-9 control-text">{ this.props.sensor.EquipmentType }</div>
                      </div>
                      <div className={`form-group`}>
                        <label className="col-sm-3 control-label">温度</label>
                        <div
                          className="col-sm-9 control-text">{ this.props.sensor.Temperature }</div>
                      </div>
                      <div className={`form-group`}>
                        <label className="col-sm-3 control-label">湿度</label>
                        <div
                          className="col-sm-9 control-text">{ this.props.sensor.Humidity }</div>
                      </div>
                      <div className={`form-group`}>
                        <label className="col-sm-3 control-label">经度</label>
                        <div
                          className="col-sm-9 control-text">{ this.props.sensor.GPSLongitude }</div>
                      </div>
                      <div className={`form-group`}>
                        <label className="col-sm-3 control-label">纬度</label>
                        <div
                          className="col-sm-9 control-text">{ this.props.sensor.GPSLatitude }</div>
                      </div>
                      <div className={`form-group`}>
                        <label className="col-sm-3 control-label">时间</label>
                        <div className="col-sm-9 control-text">
                          <ReactMoment locale="zh-cn"
                                       format="YYYY-MM-DD HH:mm:ss">{ this.props.sensor.time }</ReactMoment>
                        </div>
                      </div>
                    </div>
                    :
                    <div className="alert alert-danger">
                      没有找到相关数据
                    </div>
                  }

                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-xs-9">
                      <button type="button" onClick={this.hideResult.bind(this)} className="btn btn-primary" style={{width:'210px'}}> 开始新的查询 </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>)
  }
}

function mapStateToProps(state) {
  return {
    sensor: state.query.sensor
  };
}

export default connect(mapStateToProps, { fetchSensorData })(Query);
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
import moment from 'moment';
import ReactMoment from 'react-moment';
import DatePicker from 'react-datepicker';
import { fetchSensorData } from '../actions/query';

import '../../node_modules/react-datepicker/dist/react-datepicker.css';
import css from './css/stat.css';

class Query extends Component {
  constructor(props) {
    super(props);

    this.state = { serial:'', type:'serial', error:null, spin:false, showResult:false, startDate: moment().startOf('day'), endDate: moment().endOf('day') };
  }

  handleSubmit() {
    const { serial, type } = this.state;
    const startDate = this.state.startDate.format('x');
    const endDate = this.state.endDate.format('x');
    if(!serial) return;
    const diff = this.state.endDate.diff(this.state.startDate, 'days');
    console.log(diff)
    if(startDate>endDate) {
      this.setState({ error: '开始时间不能大于截止时间' });
      return;
    }
    if(diff>=180) {
      this.setState({ error: '时长不能大于6个月' });
      return;
    }

    this.setState({ spin:true });
    this.props.fetchSensorData({ serial, type, startDate, endDate }, err => this.setState({ error: err ? err : null, spin:false, showResult: !err }));
  }

  hideResult() {
    this.setState({showResult:false});
  }

  radioChange(e) {
    this.setState({type:e.target.value});
  }


  handleStartDateChange(date) {
    this.setState({
      startDate: date.startOf('day')
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date.endOf('day')
    });
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
                  </div>
                  <div className={`form-group has-feedback`}>
                    <label className="col-sm-3 control-label">{this.state.type==='serial'?'传感器':'设备'}编号</label>
                    <div className="col-md-6">
                      <input name="remark" type="text" className="form-control" placeholder={`请输入${this.state.type==='serial'?'传感器':'设备'}编号`}
                             value={this.state.serial} style={{width:'210px'}} onChange={e=>this.setState({serial: e.target.value})}/>
                    </div>
                  </div>
                  <div className={`form-group has-feedback`}>
                    <label className="col-sm-3 control-label">起始时间</label>
                    <div className="col-sm-6">
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange.bind(this)}
                        placeholderText="起始时间"
                        dateFormat="YYYY-MM-DD"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className={`form-group has-feedback`}>
                    <label className="col-sm-3 control-label">截止时间</label>
                    <div className="col-sm-6">
                      <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange.bind(this)}
                        placeholderText="截止时间"
                        dateFormat="YYYY-MM-DD"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                      <button type="button" onClick={this.handleSubmit.bind(this)} disabled={!this.state.serial}
                              className="btn btn-primary"  style={{width:'210px'}}><i className={`fa fa-spinner fa-spin ${this.state.spin?'':'hidden'}`}></i> 查询 </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        <div className={`box no-border no-shadow ${this.state.showResult?'':'hidden'}`}>
          <div className="box-header with-border">查询{this.state.type==='serial'?'传感器':'设备'}编号: {this.state.serial}</div>
          <div className="box-body">
            <div className="row">
              <div className="col-md-12">
                  { this.props.sensor && this.props.sensor.length>0 ?
                      <table className="table table-bordered table-hover margin-b-10">
                        <tbody>
                        <tr>
                          <th>传感器编号</th>
                          <th>传感器类型</th>
                          <th>设备编号</th>
                          <th>设备类型</th>
                          <th>温度</th>
                          <th>湿度</th>
                          <th>经度</th>
                          <th>纬度</th>
                          <th>时间</th>
                        </tr>
                        { this.renderRows() }
                        </tbody>
                      </table>
                    :
                    <div className="alert alert-danger">
                      没有找到相关数据
                    </div>
                  }

                  <div className="row">
                    <div className="col-xs-12 text-center">
                      <button type="button" onClick={this.hideResult.bind(this)} className="btn btn-primary" style={{width:'210px'}}> 开始新的查询 </button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>

      </div>)
  }

  renderRows() {
    return this.props.sensor.map((row, idx) => {
      return (<tr key={idx}>
        <td>{row.SensorNumber}</td>
        <td>{row.SensorType}</td>
        <td>{row.EquipmentNumber}</td>
        <td>{row.EquipmentType}</td>
        <td>{row.Temperature.join()}</td>
        <td>{row.Humidity.join()}</td>
        <td>{row.GPSLongitude}</td>
        <td>{row.GPSLatitude}</td>
        <td><ReactMoment locale="zh-cn" format="lll">{row.Time}</ReactMoment></td>
      </tr>);
    });
  }
}

function mapStateToProps(state) {
  return {
    sensor: state.query.sensor
  };
}

export default connect(mapStateToProps, { fetchSensorData })(Query);
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
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactMoment from 'react-moment';
import { fetchStat } from '../actions/stat';

import css from './css/stat.css';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';

class Stat extends Component {
  constructor(props) {
    super(props);

    this.state = { error:null, spin:false, startDate: moment().startOf('day'), endDate: moment().endOf('day'), showResult:false };
  }

  handleSubmit() {
    const startDate = this.state.startDate.format('x');
    const endDate = this.state.endDate.format('x');
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
    this.props.fetchStat({ startDate, endDate }, err => this.setState({ error: err ? err : null, spin:false, showResult: !err }));
  }

  hideResult() {
    this.setState({showResult:false});
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
          <div className="box-header with-border">请输入统计时间段 <span className="text-purple">*统计时长不超过6个月</span></div>
          <div className="box-body">
            <div className="row">
              <div className="col-md-12">
                <form className="form-horizontal">
                  {this.renderAlert()}
                  <div className={`form-group has-feedback`}>
                    <label className="col-sm-2 control-label">起始时间</label>
                    <div className="col-sm-10">
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
                    <label className="col-sm-2 control-label">截止时间</label>
                    <div className="col-sm-10">
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
                    <div className="col-sm-2"></div>
                    <div className="col-xs-10">
                      <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-primary" style={{width:'210px'}}><i className={`fa fa-spinner fa-spin ${this.state.spin?'':'hidden'}`}></i> 统计 </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        <div className={`box stat-box no-border no-shadow ${this.state.showResult?'':'hidden'}`}>
          <div className="box-header with-border">统计结果</div>
          <div className="box-body">
            <div className="row">
              <div className="col-md-12">
                <div className="form-horizontal">
                  {this.renderAlert()}
                  <div className={`form-group`}>
                    <label className="col-sm-3 control-label">时间段</label>
                    <div className="col-sm-9 control-text">
                      <ReactMoment locale="zh-cn" format="YYYY-MM-DD">{this.state.startDate}</ReactMoment> 至 <ReactMoment locale="zh-cn" format="YYYY-MM-DD">{this.state.endDate}</ReactMoment>
                    </div>
                  </div>
                  <div className={`form-group`}>
                    <label className="col-sm-3 control-label">时长</label>
                    <div className="col-sm-9 control-text">{this.state.endDate.diff(this.state.startDate, 'days')}天</div>
                  </div>
                  <div className={`form-group`}>
                    <label className="col-sm-3 control-label">传感器数据</label>
                    <div className="col-sm-9 control-text">{this.props.stat?this.props.stat.sensordata:''}</div>
                  </div>
                  <div className={`form-group`}>
                    <label className="col-sm-3 control-label">货运单量</label>
                    <div className="col-sm-9 control-text">{this.props.stat?this.props.stat.shipping:''}</div>
                  </div>
                  <div className={`form-group`}>
                    <label className="col-sm-3 control-label">入库单量</label>
                    <div className="col-sm-9 control-text">{this.props.stat?this.props.stat.stock_in:''}</div>
                  </div>
                  <div className={`form-group`}>
                    <label className="col-sm-3 control-label">出库单量</label>
                    <div className="col-sm-9 control-text">{this.props.stat?this.props.stat.stock_out:''}</div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-xs-9">
                      <button type="button" onClick={this.hideResult.bind(this)} className="btn btn-primary" style={{width:'210px'}}> 开始新的统计 </button>
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
    stat: state.stat.data
  };
}

export default connect(mapStateToProps, { fetchStat })(Stat);
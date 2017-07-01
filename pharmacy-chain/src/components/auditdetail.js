/**
 * Created by finch on 6/30/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDetailAudit, audit} from '../actions/audit';
import {ROOT_URL} from '../actions/types';
import './css/auditdetail.css';
import {Link} from 'react-router-dom';


class AuditDetail extends Component {
  constructor(props) {
    super(props);

    this.pass = this.pass.bind(this);
    this.fail = this.fail.bind(this);
  }

  componentWillMount() {
    this.props.fetchDetailAudit({uid: this.props.match.params.uid});
  }

  pass() {
    this.props.audit({uid: this.props.match.params.uid, action: 1}, ({isSuccess}) => {
      if (isSuccess) {
        console.log("accept");
      }
      this.props.history.replace("/");
    })
  }

  fail() {
    this.props.audit({uid: this.props.match.params.uid, action: 0}, ({isSuccess}) => {
      if (isSuccess) {
        console.log("reject");
      }
      this.props.history.replace("/");
    })
  }

  render() {
    let {auditDetail} = this.props;
    console.log(auditDetail);
    //

    if (!auditDetail) {
      return <div></div>;
    }
    const {company, license, username, idfront, idback} = auditDetail;

    return (
      <div>
        <div className="content-main container">
          <div className={`box stat-box no-border no-shadow`}>
            <div className="box-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-horizontal">
                    <div className={`form-group`}>
                      <label className="col-sm-3 control-label">公司名称</label>
                      <div className="col-sm-9 control-text">
                        {company ? company : ''}
                      </div>
                    </div>
                    <div className={`form-group`}>
                      <label className="col-sm-3 control-label">入盟申请书</label>
                      <div className="col-sm-9 control-text">
                        <a className="btn btn-default btn-audit"
                           href={`${ROOT_URL}/user/${this.props.match.params.uid}/application`}
                           download="allianceFile">点击下载</a>
                      </div>
                    </div>
                    <div className={`form-group`}>
                      <label className="col-sm-3 control-label">营业执照</label>
                      <div className="col-sm-9 control-text">
                        <img src={license ? license : ""} alt="营业执照" style={{width: '200px', height: '120px'}}/>
                      </div>
                    </div>
                    <div className={`form-group`}>
                      <label className="col-sm-3 control-label">法人姓名</label>
                      <div className="col-sm-9 control-text">
                        {username ? username : ""}
                      </div>
                    </div>
                    <div className={`form-group`}>
                      <label className="col-sm-3 control-label">法人正反身份证</label>
                      <div className="col-sm-9 control-text">
                        <img src={idfront ? idfront : ""} alt="法人正面身份证" style={{width: '173px', height: '104px'}}/>
                        <img src={idback ? idback : ""} alt="法人反面身份证"
                             style={{width: '173px', height: '104px', marginLeft: '15px'}}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-xs-9">
                        <button type="button" className="btn btn-primary"
                                style={{width: '135px'}} onClick={this.pass}> 通过
                        </button>
                        <button type="button" className="btn btn-primary"
                                style={{width: '135px', marginLeft: '15px'}} onClick={this.fail}> 拒绝
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    auditDetail: state.alliance.auditDetail
  }
}

export default connect(mapStateToProp, {fetchDetailAudit, audit})(AuditDetail)

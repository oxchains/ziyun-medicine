/**
 * Created by finch on 6/30/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDetailAudit, audit, fetchImg} from '../actions/audit';
import {ROOT_URL} from '../actions/types';
import './css/auditdetail.css';
import {Link} from 'react-router-dom';


class AuditDetail extends Component {
  constructor(props) {
    super(props);

    this.pass = this.pass.bind(this);
    this.fail = this.fail.bind(this);

    this.state = {
      img1: null,
      img2: null,
      img3: null
    }
    this.encodeObjectUrl = this.encodeObjectUrl.bind(this);
  }

  componentWillMount() {
    this.props.fetchDetailAudit({uid: this.props.match.params.uid}, () => {
      const {license, identityface, identityback} = this.props.auditDetail;
      this.props.fetchImg({img1: license, img2: identityface, img3: identityback}, ({res1, res2, res3}) => {
        this.setState({
          img1: res1,
          img2: res2,
          img3: res3
        })
      });
    });
  }

  str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  encodeObjectUrl(response) {
    var arrayBufferView = new Uint8Array(response);
    var blob = new Blob([arrayBufferView], {type: "image/png"});
    var urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  }

  pass() {
    this.props.audit({uid: this.props.match.params.uid, action: 1}, ({isSuccess}) => {
      if (isSuccess) {
        console.log("accept");
      }
      this.props.history.replace("/unaudit");
    })
  }

  fail() {
    this.props.audit({uid: this.props.match.params.uid, action: 0}, ({isSuccess}) => {
      if (isSuccess) {
        console.log("reject");
      }
      this.props.history.replace("/unaudit");
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
                        <img src={this.state.img1 ? this.encodeObjectUrl(this.state.img1.data) : null} alt="营业执照"
                             style={{width: '200px', height: '120px'}}/>
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
                        <img src={this.state.img2 ? this.encodeObjectUrl(this.state.img2.data) : null} alt="法人正面身份证"
                             style={{width: '173px', height: '104px'}}/>
                        <img src={this.state.img3 ? this.encodeObjectUrl(this.state.img3.data) : null} alt="法人反面身份证"
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

export default connect(mapStateToProp, {fetchDetailAudit, audit, fetchImg})(AuditDetail)

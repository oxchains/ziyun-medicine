/**
 * Created by oxchain on 2017/8/25.
 */
/**
 * Created by zhangxiaojing on 8/24/17.
 */
import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {fetchDetailProduct, audit, fetchImg} from '../actions/audit';
import {ROOT_URL} from '../actions/types';
import './css/firstcamp.css';

class FirstCampCirculate extends Component {
    render() {
        return (
            <div>
                <div className="content-main container">
                    <div className={`box stat-box no-border no-shadow`}>
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-horizontal">
                                        <div className="text-left">首营资料查询</div>
                                        <hr/>
                                        <div className="">
                                            <div className="query">
                                                <span>首营资料查询</span>
                                                <i className="fa fa-angle-right fa-lg" ></i>
                                            </div>
                                            <span>流通企业首营资料</span>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">企业名称 :</label>
                                            <div className="col-sm-8 control-text">
                                                河南奥林特药业有限公司
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">区块链编码 :</label>
                                            <div className="col-sm-8 control-text">
                                                h9eqy32riucegw0qy89ciuwqgf989vh0qgf78q40b
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">营业执照编号 :</label>
                                            <div className="col-sm-8 control-text">
                                                91410100169958206w
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">
                                                <img src="./favicon.ico" alt="营业执照"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a className="download"
                                                   href=""
                                                   download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">税务登记证编号 :</label>
                                            <div className="col-sm-8 control-text">
                                                暂无信息
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">
                                                <img src="/public/img/noInfo.png" alt="营业执照"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a className="download undownload"
                                                   href=""
                                                   download="allianceFile">
                                                    <img src="/public/img/undownload.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">组织机构代码编号 :</label>
                                            <div className="col-sm-8 control-text">
                                                91410100169958206w
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">
                                                <img src="./favicon.ico" alt="营业执照"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a className="download"
                                                   href=""
                                                   download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">质量保证书附件 :</label>
                                            <div className="col-sm-8 control-text">
                                                <img src="./favicon.ico" alt="营业执照"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a className="download"
                                                   href=""
                                                   download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">药品生产质量管理规范附件 :</label>
                                            <div className="col-sm-8 control-text">
                                                <img src="./favicon.ico" alt="营业执照"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a className="download"
                                                   href=""
                                                   download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">年纳税报表 :</label>
                                            <div className="col-sm-8 control-text">
                                                2017/03/13
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">

                                                <img src="./favicon.ico" alt="营业执照"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a className="download"
                                                   href=""
                                                   download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">企业质量情况调查表 :</label>
                                            <div className="col-sm-8 control-text">
                                                2016/08/15
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">
                                                <img src="./favicon.ico" alt="营业执照"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a className="download"
                                                   href=""
                                                   download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 text-center">
                                                <span className="text-danger ">* 首营资料查询展示的"暂无信息"为企业没有上传附件。</span>
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
export default FirstCampCirculate;

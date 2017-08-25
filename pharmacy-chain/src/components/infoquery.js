/**
 * Created by oxchain on 2017/8/24.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import css from './css/firstcamp.css';
import {ROOT_URL} from '../actions/types';
class Infoquery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index :0,
            inputValue:'',
            radioValue:'',
        }
        this.handleRadio = this.handleRadio.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlequery = this.handlequery.bind(this)
        this.prevpage = this.prevpage.bind(this)
    }
        handleRadio(e) {
        this.setState({
            radioValue : e.target.value,
        })
    }
    handleinputvalue(e){
            inputValue : e.target.value
    }
    handleSubmit(e) {
    e.preventDefault();
    var formData = {
        input:this.refs.goodInput.value,
        radio:this.state.radioValue,
    }
    console.log('+++++++' ,formData)
}

    handlequery() {
        let {index} = this.state;
        index++;
        if (index > 1) {
            index = 1;
        }
        this.setState({
            index
        })
        console.log('-------' ,index)
    }
    prevpage(){
        let {index} = this.state;
        index--;
        this.setState({
            index
        })
    }
    render() {
        return (
            <div>
                {/*第一页*/}
            <div className={`container ${this.state.index == 0? "show" : "hidden"}`}>
                <section className="content">
                    <div className="widthdiv">
                        <p className="headerp">首营资料查询</p>
                    </div>
                    <div className="divmain">
                        <div className="formposition ">
                            <form onSubmit={this.handleSubmit} >
                                <RadioButtons ref="goodRadio" handleRadio = {this.handleRadio}/>
                                <lable className="namelable">产品名称&nbsp; &nbsp;</lable>
                                <input type="text" className="inputborder" onChange={this.handleinputvalue} ref="goodInput" placeholder="请输入产品名称" /><br/>
                                <button type="submit" className="btnquery" onClick={this.handlequery}>查询</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
             {/*第二页*/}
                <div className={`content-main container ${this.state.index == 1? "show" : "hidden"}`}>
                    <div className={`box stat-box no-border no-shadow`}>
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-horizontal">
                                        <div className="headerpa">首营资料查询</div>
                                        <div className="">
                                            <div className="query">
                                                <span onClick={this.prevpage}>首营资料查询</span>
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
                                                    <img src="../public/img/download.png" style={{width: '14px', height: '14px'}}/>
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
                                                    <img src="../public/img/undownload.png" style={{width: '14px', height: '14px'}}/>
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
                                                    <img src="../public/img/download.png" style={{width: '14px', height: '14px'}}/>
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
                                                    <img src="../public/img/download.png" style={{width: '14px', height: '14px'}}/>
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
                                                    <img src="../public/img/download.png" style={{width: '14px', height: '14px'}}/>
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
                                                    <img src="../public/img/download.png" style={{width: '14px', height: '14px'}}/>
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
                                                    <img src="../public/img/download.png" style={{width: '14px', height: '14px'}}/>
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



            </div>)
    }

}

var RadioButtons = React.createClass({
    render:function () {
        return (
            <div className="formwidth">
                <input type="radio" name="infoquery" onChange={this.props.handleRadio}  value="chanpin" />
                <lable> &nbsp;产品首营资料 &nbsp;&nbsp;</lable>
                <input type="radio" name="infoquery" onChange={this.props.handleRadio}  value="shengchan" />
                <lable> &nbsp;生产企业首营资料 &nbsp;&nbsp;</lable>
                <input type="radio" name="infoquery" onChange={this.props.handleRadio}  value="liutong" />
                <lable> &nbsp;流通企业首营资料 </lable>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Infoquery);
/**
 * Created  on 2017/8/24.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import  './css/firstcamp.css';

import {ROOT_URL,QQQROOT_URL} from '../actions/types';
import {fetchFirstCampProduct,fetchFirstCampEnterprise} from '../actions/query';

class Infoquery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index :0,
            inputValue:'',
            radioValue:'chanpin',
        }
        this.handleRadio = this.handleRadio.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlequery = this.handlequery.bind(this)
        this.prevpage = this.prevpage.bind(this)
        // this.handlelook = this.handlelook.bind(this)
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
        const InputChoice= this.refs.goodInput.value ;
        const radioChoice= this.state.radioValue ;
        if(this.state.radioValue == "chanpin"){
            this.props.fetchFirstCampProduct({InputChoice},()=>{});
        }
        else {
            this.props.fetchFirstCampEnterprise({InputChoice,radioChoice},()=>{});
        }
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
    }
    prevpage(){

        location.reload();

        let {index} = this.state;
        index--;
        this.setState({
            index
        });
    }


    render() {
            // if(this.props.status == 0 ){
            //     setTimeout( function(){
            //         return (
            //             <div className="compty-div"><p className="pppp">暂无权限查看</p></div>
            //         )
            //     },1000)
            // }
        // console.log(this.props.product)
            const status = this.props.status
            const product = this.props.product
            const ProductName = product && product.ProductName
            const txId = product && product.txId

            const ApprovalUrl = product && product.ApprovalUrl
            const ProductPatentCertificateUrl = product && product.ProductPatentCertificateUrl
            const TaxRegistrationCode = product && product.TaxRegistrationCode
            const ProductTrademarkDocumentsUrl = product && product.ProductTrademarkDocumentsUrl
            const ProductMiniPackageUrl = product && product.ProductMiniPackageUrl
            const DrugInstructionsUrl = product && product.DrugInstructionsUrl
            const GeneralTaxpayerRecordsUrl = product && product.GeneralTaxpayerRecordsUrl
            const LegalPowerOfAttorneyUrl = product && product.LegalPowerOfAttorneyUrl
            const IdCardUrl = product && product.IdCardUrl
            const PurchaseAndSaleContractUrl = product && product.PurchaseAndSaleContractUrl
            const ApprovalNo = product && product.ApprovalNo
            const ProductPackageAndManualUrl = product && product.ProductPackageAndManualUrl
            const ProudctProduceStandardUrl = product && product.ProudctProduceStandardUrl

            const company = this.props.company
            const EnterpriseName = company && company.EnterpriseName
            const EnterpriseLicenseNo = company && company.EnterpriseLicenseNo
            const EnterprisePatentCertificateUrl = company && company.ProductPatentCertificateUrl
            const EnterpriseLicenseUrl = company && company.EnterpriseLicenseUrl
            const OrganizationCode = company && company.OrganizationCode
            const OrganizationCodeCertificateUrl = company && company.OrganizationCodeCertificateUrl
            const QualityAssuranceUrl = company && company.QualityAssuranceUrl
            const GoodManufacturPracticesUrl = company && company.GoodManufacturPracticesUrl
            const DrugOperatingLicenseNo = company && company.DrugOperatingLicenseNo
            const DrugProductionLicenseUrl = company && company.DrugProductionLicenseUrl
            const BankAccountNumber = company && company.BankAccountNumber
            const OpenBank = company && company.OpenBank
            const EnterpriseAdress = company && company.EnterpriseAdress
            const EnterprisePhone = company && company.EnterprisePhone
            const TaxpayerIdentificationNumber = company && company.TaxpayerIdentificationNumber
            const BillingUnit = company && company.BillingUnit
            const TaxRegistrationCertificateUrl = company && company.TaxRegistrationCertificateUrl

            const img1 = ProductPatentCertificateUrl? `${QQQROOT_URL}/user/${ProductPatentCertificateUrl}/downloadfile` :`/public/img/noInfo.png`
            const img2=ApprovalUrl? `${QQQROOT_URL}/user/${ApprovalUrl}/downloadfile`:`/public/img/noInfo.png`
            const img4=ProductTrademarkDocumentsUrl? `${QQQROOT_URL}/user/${ProductTrademarkDocumentsUrl}/downloadfile` :`/public/img/noInfo.png`
            const img5=ProductMiniPackageUrl? `${QQQROOT_URL}/user/${ProductMiniPackageUrl}/downloadfile` :`/public/img/noInfo.png`
            const img6=DrugInstructionsUrl? `${QQQROOT_URL}/user/${DrugInstructionsUrl}/downloadfile` :`/public/img/noInfo.png`
            const img7=GeneralTaxpayerRecordsUrl?`${QQQROOT_URL}/user/${GeneralTaxpayerRecordsUrl}/downloadfile` :`/public/img/noInfo.png`
            const img8=LegalPowerOfAttorneyUrl? `${QQQROOT_URL}/user/${LegalPowerOfAttorneyUrl}/downloadfile` :`/public/img/noInfo.png`
            const img9=IdCardUrl? `${QQQROOT_URL}/user/${IdCardUrl}/downloadfile` :`/public/img/noInfo.png`
            const img10=PurchaseAndSaleContractUrl? `${QQQROOT_URL}/user/${PurchaseAndSaleContractUrl}/downloadfile`:`/public/img/noInfo.png`
            const img11=ProductPackageAndManualUrl? `${QQQROOT_URL}/user/${ProductPackageAndManualUrl}/downloadfile` :`/public/img/noInfo.png`
            const img12=ProudctProduceStandardUrl? `${QQQROOT_URL}/user/${ProudctProduceStandardUrl}/downloadfile` :`/public/img/noInfo.png`
            const img13=EnterprisePatentCertificateUrl? `${QQQROOT_URL}/user/${EnterprisePatentCertificateUrl}/downloadfile` :`/public/img/noInfo.png`
            const img14=EnterpriseLicenseUrl? `${QQQROOT_URL}/user/${EnterpriseLicenseUrl}/downloadfile` :`/public/img/noInfo.png`
            const img15=OrganizationCodeCertificateUrl? `${QQQROOT_URL}/user/${OrganizationCodeCertificateUrl}/downloadfile` :`/public/img/noInfo.png`
            const img16=QualityAssuranceUrl? `${QQQROOT_URL}/user/${QualityAssuranceUrl}/downloadfile` :`/public/img/noInfo.png`
            const img17=GoodManufacturPracticesUrl? `${QQQROOT_URL}/user/${GoodManufacturPracticesUrl}/downloadfile` :`/public/img/noInfo.png`
            const img18=DrugProductionLicenseUrl? `${QQQROOT_URL}/user/${DrugProductionLicenseUrl}/downloadfile` :`/public/img/noInfo.png`
            const img19=TaxRegistrationCertificateUrl? `${QQQROOT_URL}/user/${TaxRegistrationCertificateUrl}/downloadfile`:`/public/img/noInfo.png`
        return (
            <div>
                {/*第一页*/}
            <div className={`container ${this.state.index == 0? " " : "hidden"}`}>
                <section className="content">
                    <div className="widthdiv">
                        <p className="headerp">首营资料查询</p>
                    </div>
                    <div className="divmain">
                        <div className="formposition ">
                            <form onSubmit={this.handleSubmit} >
                                <RadioButtons ref="goodRadio" handleRadio = {this.handleRadio}/>
                                <lable className="namelable">{this.state.radioValue=="chanpin" ? "产品" : "企业"}名称&nbsp; &nbsp;</lable>
                                <input type="text" className="inputborder" onChange={this.handleinputvalue} ref="goodInput" placeholder={this.state.radioValue=="chanpin" ? "请输入产品名称" : "请输入企业名称"} /><br/>
                                <button type="submit" className="btnquery" onClick={this.handlequery}>查询</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>

                {/*第二页产品首营*/}


                <div className={`compty-div ${this.state.index == 1 & status != 0?"show" : "hidden"}`}><p className="pppp">暂无权限查看</p></div>

                    {/*{this.handlelook()}*/}

                    <div className={`content-main container ${this.state.index == 1 & status == 0 & this.state.radioValue == "chanpin"? "show" :"hidden"}`}>

                        <div className={`box stat-box no-border no-shadow`}>
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-horizontal">
                                            <div className="text-left">首营资料查询</div>
                                            <hr/>
                                            <div className="">
                                                <div className="query">
                                                    <span onClick={this.prevpage}>首营资料查询</span>
                                                    <i className="fa fa-angle-right fa-lg" ></i>
                                                </div>
                                                <span>{this.state.radioValue =='chanpin'?'产品首营资料':this.state.radioValue =='produce_enterprise'?'生产企业首营资料':'流通企业首营资料'}</span>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">产品名称 :</label>
                                                <div className="col-sm-8 control-text">
                                                    {ProductName?ProductName:'暂无信息'}
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">区块链编码 :</label>
                                                <div className="col-sm-8 control-text">
                                                    {txId?txId:'暂无信息'}
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">所属产品 :</label>
                                                <div className="col-sm-8 control-text">
                                                    {ProductName?ProductName:'暂无信息'}
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">产品批号 :</label>
                                                <div className="col-sm-8 control-text">
                                                    {ApprovalNo?ApprovalNo:'暂无信息'}
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">产品批号附件 :</label>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img2}  alt="产品批号附件"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${ApprovalUrl?"show":"hidden"}`}
                                                        href={ApprovalUrl ? img2 :""}
                                                        download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">产品专利附件 :</label>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img1}  alt="产品专利附件"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${ProductPatentCertificateUrl?"show":"hidden"}`}
                                                       href={ProductPatentCertificateUrl ? img1 :""}
                                                       download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">商标文件附件 :</label>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img4}  alt="商标文件附件"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${ProductTrademarkDocumentsUrl?"show":"hidden"}`}
                                                        href={ProductTrademarkDocumentsUrl ? img4 :""}
                                                        download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">最小包装图 :</label>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img5}  alt="最小包装图"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${ProductMiniPackageUrl?"show":"hidden"}`}
                                                        href={ProductMiniPackageUrl ? img5 :""}
                                                        download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>

                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">药品说明书附件 :</label>
                                                    <div className="col-sm-8 control-text">
                                                        <img src={img6}  alt="药品说明书附件"
                                                             style={{width: '200px', height: '190px'}}/>
                                                        <a  className={`download      ${DrugInstructionsUrl?"show":"hidden"}`}
                                                            href={DrugInstructionsUrl ? img6 :""}
                                                            download="allianceFile">
                                                            <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                            下载附件</a>
                                                    </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">一般纳税人认定记录附件:</label>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img7}  alt="一般纳税人认定记录附件"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${GeneralTaxpayerRecordsUrl?"show":"hidden"}`}
                                                        href={GeneralTaxpayerRecordsUrl ? img7 :""}
                                                        download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">法人委托书附件 :</label>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img8}  alt="法人委托书附件"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${LegalPowerOfAttorneyUrl?"show":"hidden"}`}
                                                        href={LegalPowerOfAttorneyUrl ? img8 :""}
                                                        download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">身份证附件 :</label>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img9}  alt="身份证附件"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${IdCardUrl?"show":"hidden"}`}
                                                        href={IdCardUrl ? img9 :""}
                                                        download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">产品生产标准附件 :</label>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img12}  alt="产品生产标准附件"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${ProudctProduceStandardUrl?"show":"hidden"}`}
                                                        href={ProudctProduceStandardUrl ? img12 :""}
                                                        download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">购销合同附件 :</label>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img10}  alt="购销合同附件"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${PurchaseAndSaleContractUrl?"show":"hidden"}`}
                                                        href={PurchaseAndSaleContractUrl ? img10 :""}
                                                        download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">产品包装说明书附件 :</label>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img11}  alt="产品包装说明书附件"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${ProductPackageAndManualUrl?"show":"hidden"}`}
                                                        href={ProductPackageAndManualUrl ? img11 :""}
                                                        download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>

                                            {/*<div className={`form-group section`}>*/}
                                                {/*<label className="col-sm-4 control-label">省级产品检验报告 :</label>*/}
                                                {/*<div className="col-sm-8 control-text">*/}
                                                    {/*2016/08/15*/}
                                                {/*</div>*/}
                                                {/*<label className="col-sm-4 control-label"></label>*/}
                                                {/*<div className="col-sm-8 control-text">*/}
                                                    {/*<img src={`${ROOT_URL}/user/downloadfile/${IdCardUrl}`} alt="省级产品检验报告"*/}
                                                         {/*style={{width: '200px', height: '190px'}}/>*/}
                                                    {/*<a className="download"*/}
                                                       {/*href={`${ROOT_URL}/user/downloadfile/${IdCardUrl}`}*/}
                                                       {/*download="allianceFile">*/}
                                                        {/*<img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>*/}
                                                        {/*下载附件</a>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            {/*<div className={`form-group section`}>*/}
                                                {/*<label className="col-sm-4 control-label">产品物件文件 :</label>*/}
                                                {/*<div className="col-sm-8 control-text">*/}
                                                    {/*2016/08/15*/}
                                                {/*</div>*/}
                                                {/*<label className="col-sm-4 control-label"></label>*/}
                                                {/*<div className="col-sm-8 control-text">*/}
                                                    {/*<img src={`${ROOT_URL}/user/downloadfile/${IdCardUrl}`} alt="产品物件文件"*/}
                                                         {/*style={{width: '200px', height: '190px'}}/>*/}
                                                    {/*<a className="download"*/}
                                                       {/*href={`${ROOT_URL}/user/downloadfile/${IdCardUrl}`}*/}
                                                       {/*download="allianceFile">*/}
                                                        {/*<img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>*/}
                                                        {/*下载附件</a>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            {/*<div className={`form-group section`}>*/}
                                                {/*<label className="col-sm-4 control-label">每批产品厂检报告 :</label>*/}
                                                {/*<label className="col-sm-4 control-label"></label>*/}
                                                {/*<div className="col-sm-8 control-text">*/}
                                                    {/*<img src={`${ROOT_URL}/user/downloadfile/${IdCardUrl}`} alt="每批产品厂检报告"*/}
                                                         {/*style={{width: '200px', height: '190px'}}/>*/}
                                                    {/*<a className="download"*/}
                                                       {/*href={`${ROOT_URL}/user/downloadfile/${IdCardUrl}`}*/}
                                                       {/*download="allianceFile">*/}
                                                        {/*<img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>*/}
                                                        {/*下载附件</a>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            {/*<div className={`form-group section`}>*/}
                                                {/*<label className="col-sm-4 control-label">购销员资格证书 :</label>*/}
                                                {/*<label className="col-sm-4 control-label"></label>*/}
                                                {/*<div className="col-sm-8 control-text">*/}
                                                    {/*<img src={`${ROOT_URL}/user/downloadfile/${IdCardUrl}`} alt="购销员资格证书"*/}
                                                         {/*style={{width: '200px', height: '190px'}}/>*/}
                                                    {/*<a className="download"*/}
                                                       {/*href={`${ROOT_URL}/user/downloadfile/${IdCardUrl}`}*/}
                                                       {/*download="allianceFile">*/}
                                                        {/*<img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>*/}
                                                        {/*下载附件</a>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
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

             {/*第三页生产企业*/}

                {/*<div className={`compty-div ${this.state.index == 1 & status != 0?"show" : "hidden"}`}><p className="pppp">暂无权限查看</p></div>*/}
                <div className={`content-main container ${this.state.index == 1 & status == 0 & this.state.radioValue == "produce_enterprise"? "show" :"hidden"}` }>

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
                                            <span>{this.state.radioValue =='chanpin'?'产品首营资料':this.state.radioValue =='produce_enterprise'?'生产企业首营资料':'流通企业首营资料'}</span>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">企业名称 :</label>
                                            <div className="col-sm-8 control-text">
                                                {EnterpriseName?EnterpriseName:'暂无数据'}
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">区块链编码 :</label>
                                            <div className="col-sm-8 control-text">
                                                {txId?txId:'暂无数据' }
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">营业执照编号 :</label>
                                            <div className="col-sm-8 control-text">
                                                {EnterpriseLicenseNo?EnterpriseLicenseNo:'暂无数据'}
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">
                                                <img src={img14}  alt="营业执照证书"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a  className={`download      ${EnterpriseLicenseUrl?"show":"hidden"}`}
                                                    href={EnterpriseLicenseUrl ? img14 :""}
                                                    download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">税务登记证编号 :</label>
                                            <div className="col-sm-8 control-text">
                                                {TaxRegistrationCode?TaxRegistrationCode:'暂无数据'}
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">
                                                <img src={img19}  alt="税务登记证"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a  className={`download      ${TaxRegistrationCertificateUrl?"show":"hidden"}`}
                                                    href={TaxRegistrationCertificateUrl ? img19 :""}
                                                    download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">组织机构代码编号 :</label>
                                            <div className="col-sm-8 control-text">
                                                {OrganizationCode?OrganizationCode:'暂无数据'}
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">
                                                <img src={img15}  alt="组织机构代码"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a  className={`download      ${OrganizationCodeCertificateUrl?"show":"hidden"}`}
                                                    href={OrganizationCodeCertificateUrl ? img15 :""}
                                                    download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">质量保证书附件 :</label>
                                            <div className="col-sm-8 control-text">
                                                <img src={img16}  alt="质量保证书"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a  className={`download      ${QualityAssuranceUrl?"show":"hidden"}`}
                                                    href={QualityAssuranceUrl ? img16 :""}
                                                    download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">药品生产质量管理规范附件 :</label>
                                            <div className="col-sm-8 control-text">
                                                <img src={img17}  alt="药品生产质量管理规范"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a  className={`download      ${GoodManufacturPracticesUrl?"show":"hidden"}`}
                                                    href={GoodManufacturPracticesUrl ? img17 :""}
                                                    download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        {/*<div className={`form-group section`}>*/}
                                            {/*<label className="col-sm-4 control-label">年纳税报表 :</label>*/}
                                            {/*<label className="col-sm-4 control-label"></label>*/}
                                            {/*<div className="col-sm-8 control-text">*/}

                                                {/*/!*<img src={`${ROOT_URL}/user/downloadfile/${GoodManufacturPracticesUrl}`} alt="年纳税报表"*!/*/}
                                                     {/*/!*style={{width: '200px', height: '190px'}}/>*!/*/}
                                                {/*<a className="download"*/}
                                                   {/*href={`${ROOT_URL}/user/downloadfile/${GoodManufacturPracticesUrl}`}*/}
                                                   {/*download="allianceFile">*/}
                                                    {/*<img src="../public/img/download.png" style={{width: '14px', height: '14px'}}/>*/}
                                                    {/*下载附件</a>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                        {/*<div className={`form-group section`}>*/}
                                            {/*<label className="col-sm-4 control-label">企业质量情况调查表 :</label>*/}
                                            {/*/!*<div className="col-sm-8 control-text">*!/*/}
                                                {/*/!*2016/08/15*!/*/}
                                            {/*/!*</div>*!/*/}
                                            {/*<label className="col-sm-4 control-label"></label>*/}
                                            {/*<div className="col-sm-8 control-text">*/}
                                                {/*/!*<img src="./favicon.ico" alt="企业质量情况调查表"*!/*/}
                                                     {/*/!*style={{width: '200px', height: '190px'}}/>*!/*/}
                                                {/*<a className="download"*/}
                                                   {/*href={`${ROOT_URL}/user/downloadfile/${GoodManufacturPracticesUrl}`}*/}
                                                   {/*download="allianceFile">*/}
                                                    {/*<img src="../public/img/download.png" style={{width: '14px', height: '14px'}}/>*/}
                                                    {/*下载附件</a>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
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

                {/*第四页流通企业*/}
                {/*<div className={`compty-div ${this.state.index == 1 & status != 0?"show" : "hidden"}`}><p className="pppp">暂无权限查看</p></div>*/}
                <div className={`content-main container ${this.state.index == 1 & status == 0 & this.state.radioValue == "circulation_enterprises"? "show" :"hidden"}`}>
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
                                            <span>{this.state.radioValue =='chanpin'?'产品首营资料':this.state.radioValue =='produce_enterprise'?'生产企业首营资料':'流通企业首营资料'}</span>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">企业名称 :</label>
                                            <div className="col-sm-8 control-text">
                                                {EnterpriseName?EnterpriseName:'暂无数据'}
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">区块链编码 :</label>
                                            <div className="col-sm-8 control-text">
                                                {txId?txId:'暂无数据' }
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">营业执照编号 :</label>
                                            <div className="col-sm-8 control-text">
                                                {EnterpriseLicenseNo?EnterpriseLicenseNo:'暂无数据'}
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">
                                                <img src={img13}  alt="营业执照"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a  className={`download      ${EnterprisePatentCertificateUrl?"show":"hidden"}`}
                                                    href={EnterprisePatentCertificateUrl ? img13 :""}
                                                    download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">税务登记证编号 :</label>
                                            <div className="col-sm-8 control-text">
                                                {TaxRegistrationCode?TaxRegistrationCode:'暂无数据'}
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">
                                                <img src={img19}  alt="税务登记证"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a  className={`download      ${TaxRegistrationCertificateUrl?"show":"hidden"}`}
                                                    href={TaxRegistrationCertificateUrl ? img19 :""}
                                                    download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">组织机构代码编号 :</label>
                                            <div className="col-sm-8 control-text">
                                                {OrganizationCode?OrganizationCode:'暂无数据'}
                                            </div>
                                            <label className="col-sm-4 control-label"></label>
                                            <div className="col-sm-8 control-text">
                                                <img src={img15}  alt="组织机构代码"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a  className={`download      ${OrganizationCodeCertificateUrl?"show":"hidden"}`}
                                                    href={OrganizationCodeCertificateUrl ? img15 :""}
                                                    download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">药品经营许可证编号 : </label>
                                                <div className="col-sm-8 control-text">
                                                    {DrugOperatingLicenseNo?DrugOperatingLicenseNo:'暂无数据'}
                                                </div>
                                                <label className="col-sm-4 control-label"></label>
                                                <div className="col-sm-8 control-text">
                                                    <img src={img18}  alt="药品经营许可证"
                                                         style={{width: '200px', height: '190px'}}/>
                                                    <a  className={`download      ${DrugProductionLicenseUrl?"show":"hidden"}`}
                                                        href={DrugProductionLicenseUrl ? img18 :""}
                                                        download="allianceFile">
                                                        <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                        下载附件</a>
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">开户行 :</label>
                                                <div className="col-sm-8 control-text">
                                                    {OpenBank?OpenBank:'暂无数据'}
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">开户行账号 :</label>
                                                <div className="col-sm-8 control-text">
                                                    {BankAccountNumber?BankAccountNumber:'暂无数据'}
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">开票单位 :</label>
                                                <div className="col-sm-8 control-text">
                                                    {BillingUnit?BillingUnit:'暂无数据'}
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">纳税人识别号 :</label>
                                                <div className="col-sm-8 control-text">
                                                    {TaxpayerIdentificationNumber?TaxpayerIdentificationNumber:'暂无数据'}
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">企业电话 :</label>
                                                <div className="col-sm-8 control-text">
                                                    {EnterprisePhone?EnterprisePhone:'暂无数据'}
                                                </div>
                                            </div>
                                            <div className={`form-group section`}>
                                                <label className="col-sm-4 control-label">企业地址 :</label>
                                                <div className="col-sm-8 control-text">
                                                    {EnterpriseAdress?EnterpriseAdress:'暂无数据'}
                                                </div>
                                            </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">质量保证书附件 :</label>
                                            <div className="col-sm-8 control-text">
                                                <img src={img16}  alt="质量保证书"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a  className={`download      ${QualityAssuranceUrl?"show":"hidden"}`}
                                                    href={QualityAssuranceUrl ? img16 :""}
                                                    download="allianceFile">
                                                    <img src="/public/img/download.png" style={{width: '14px', height: '14px'}}/>
                                                    下载附件</a>
                                            </div>
                                        </div>
                                        <div className={`form-group section`}>
                                            <label className="col-sm-4 control-label">药品生产质量管理规范附件 :</label>
                                            <div className="col-sm-8 control-text">
                                                <img src={img17}  alt="药品生产质量管理规范附件"
                                                     style={{width: '200px', height: '190px'}}/>
                                                <a  className={`download      ${GoodManufacturPracticesUrl?"show":"hidden"}`}
                                                    href={GoodManufacturPracticesUrl ? img17 :""}
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
        )
    }
}

var RadioButtons = React.createClass({
    render:function () {
        return (
            <div className="formwidth">
                <input type="radio" name="infoquery" onClick={this.props.handleRadio}  defaultChecked value="chanpin" />
                <lable> &nbsp;产品首营资料 &nbsp;&nbsp;</lable>
                <input type="radio" name="infoquery" onClick={this.props.handleRadio}  value="produce_enterprise" />
                <lable> &nbsp;生产企业首营资料 &nbsp;&nbsp;</lable>
                <input type="radio" name="infoquery" onClick={this.props.handleRadio}  value="circulation_enterprises" />
                <lable> &nbsp;流通企业首营资料 </lable>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        product: state.query.product,
        company: state.query.company,
        status: state.query.status
    };
}

export default connect(mapStateToProps,{fetchFirstCampProduct,fetchFirstCampEnterprise})(Infoquery);
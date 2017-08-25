/**
 * Created by oxchain on 2017/8/24.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import css from './css/alliance.css';

class Infoquery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue:'',
            radioValue:'',
        }
        this.handleRadio = this.handleRadio.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
    render() {
        return (
            <div className="container">
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
                                <button type="submit" className="btnquery">查询</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>);
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
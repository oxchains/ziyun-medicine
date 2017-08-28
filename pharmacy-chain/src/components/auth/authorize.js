import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../css/authorize';
import {fetchAuthorizeCompany,updateAuthorize} from '../../actions/audit';
import {Alert} from 'react-bootstrap';

class Authorize extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            alertVisible: false,
            checked:true,
            company:'',
        }
        this.handleCheckbox=this.handleCheckbox.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillMount() {
        this.props.fetchAuthorizeCompany()

    }
    handleCheckbox(e){
        this.setState({
            company:e.target.value,
        })

    }
    handleSubmit(e){
        e.preventDefault();
        const formData={
            Username:this.state.company
        }
        this.props.updateAuthorize({formData});
        this.setState({
            alertVisible: true,
        });
    }
    renderRows() {
        // console.log(this.props.authorize)
        const username = localStorage.getItem('username');
        // if(this.props.authorize===null){
        //      return;
        // }
        return this.props.authorize.map((row, idx) => {
            if(row.username==username){
                return
                <div></div>
            }
            return <li key={idx}>
                <input type="radio" name="company" onClick={this.handleCheckbox}  value={row.username} />
                <label >{row.username}</label>
            </li>;
        });


    }
    renderAlert() {
        return (
            <Alert bsStyle="success" onDismiss={() => {
                this.setState({alertVisible: false})
            }}>
                <h2 style={{textAlign: 'center'}}>{this.props.update_error}</h2>
            </Alert>
        )
    }
    render() {
        if(this.props.authorize===null) {
            return <div><section className="content"><h1>Loading...</h1></section></div>
        }
        return (
            <div className="container">
                <section className="content">
                    <div className="widthdiv">
                        <p className="headerp">授权公司</p>
                    </div>
                    <div className="divmain">
                        <div className="formposition ">
                            <div className="authorize_com">
                                <form onSubmit={this.handleSubmit}>
                                    <ul>
                                        {
                                            this.state.alertVisible ? this.renderAlert() : <div></div>
                                        }
                                        {this.renderRows()}
                                        <li>
                                            <button type="submit"  className="btn btn-primary">授权</button>
                                        </li>

                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
           );
    }

}

function mapStateToProps(state) {
    return {
        authorize: state.alliance.authorize,
        update_error:state.alliance.update_error
    };
}

export default connect(mapStateToProps,{updateAuthorize,fetchAuthorizeCompany})(Authorize);
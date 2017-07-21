/**
 * oxchain ivoice app
 *
 *
 * Author: Jun
 * Date: 13/04/2017
 *
 */

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'
import { signinAction } from '../../actions/auth'
import AllianceList from '../alliance_list';
import cssSignin from '../css/signin.css';

class Signin extends Component {

  handleFormSubmit({ username, password }) {
    if(username && password)
      this.props.signinAction({ username, password }, ()=>{ console.log('signin callback');});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger alert-dismissable">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  renderField({ input, label, type, icon, meta: { touched, error } }) {
    return (
    <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      <span className={`glyphicon glyphicon-${icon} form-control-feedback`}></span>
    </div>
  )}

  render() {
    const { handleSubmit} = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if(this.props.loggedIn) {
      return <Redirect to={from}/>;
    }

    return (
      <div className="container">
        <section className="content">

          <div className="row">
              <div className="col-md-6 col-md-offset-3 text-center">
                <div className="login-box">
                <div className="login-box-body">
                  <p className="login-box-msg" style={{fontSize: 24+'px'}}>欢迎,请登录</p>

                  {this.renderAlert()}

                  <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  <Field name="username" component={this.renderField} type="text"  label="用户名" icon="user" />
                  <Field name="password" component={this.renderField} type="password" label="密码" icon="lock" />
                    <div className="row margin-b-10">
                      <div className="col-xs-12">
                        <button type="submit" className="btn btn-primary btn-block btn-flat shadow">登录</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6"><a href="/signup" className="pull-left">立即注册</a></div>
                      <div className="col-xs-6"><a href="/forget" className="text-gray pull-right">忘记密码?</a></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


const validate = values => {
  const errors = {};

  if(!values.username) {
    errors.username = 'username required'
  }

  if(!values.password) {
    errors.password = 'password required'
  }

  return errors
};

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.authenticated,
    errorMessage: state.auth.error
  };
}

const reduxSignForm = reduxForm({
  form: 'SignForm',
  validate
})(Signin);

export default connect(mapStateToProps, { signinAction })(reduxSignForm);
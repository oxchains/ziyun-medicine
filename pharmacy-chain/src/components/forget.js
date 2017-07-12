/**
 * Created by finch on 7/11/17.
 */

import React, {Component} from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {resetCodeAction, resetPwdAction} from '../actions/signup';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';

const MAX_REMAIN = 60;
class Forget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      remain: MAX_REMAIN,
      email: '',
      alertVisible: false,
      errorMessage: ''
    }
    this.renderDangerAlert = this.renderDangerAlert.bind(this);
  }

  handleFormSubmit({email, code, newpwd}) {
    if (email && newpwd && code)
      this.props.resetPwdAction({email: email, vcode: code, password: newpwd}, ({status, message}) => {
        if (status === 1) {
          this.props.history.push('/');
        } else {
          this.setState({
            alertVisible: true,
            errorMessage: message
          });
        }
      });
  }

  renderDangerAlert() {
    return (
      <Alert bsStyle="danger" onDismiss={() => {
        this.setState({alertVisible: false})
      }}>
        <h2 style={{textAlign: 'center'}}>{this.state.errorMessage}</h2>
      </Alert>
    )
  }

  isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
  }

  renderField({input, label, type, meta: {touched, error}}) {
    return (
      <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
        <label className="col-sm-3 control-label"><strong>{label}</strong></label>
        <div className="col-sm-6">
          <input {...input} placeholder={label} type={type} className="form-control"/>
          <div className="help-block with-errors">{touched && error ? error : ''}</div>
        </div>
      </div>
    )
  }

  handleClick() {
    let email = this.emailInput.value;
    if (!this.isEmail(email)) {
      return;
    }

    this.props.resetCodeAction(email, () => {
      this.setState({
        isLoading: true,
        email
      });

      var interval = setInterval(() => {
        let remain = parseInt(this.state.remain);
        remain--;
        if (remain < 0) {
          this.setState({
            isLoading: false,
            remain: MAX_REMAIN
          });

          clearInterval(interval);
        } else {
          this.setState({
            isLoading: true,
            remain: remain
          })
        }
      }, 1000)
    });
  }

  renderEmail({input, label, type, meta: {touched, error}}) {
    return (
      <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
        <label className="col-sm-3 control-label"><strong>{label}</strong></label>
        <div className="col-sm-6">
          <div className="col-sm-8" style={{paddingLeft: '0px'}}>
            <input {...input} placeholder={label} type={type} className="form-control"
                   ref={(input) => this.emailInput = input}/>
            <div className="help-block with-errors">{touched && error ? error : ''}</div>
          </div>

          <div className="col-sm-4" style={{paddingRight: '0px'}}>
            <button className={`btn btn-primary btn-block btn-flat ${this.state.isLoading ? 'disabled' : ''}`}
                    type="button"
                    style={{backgroundColor: 'white', color: '#9e29cd'}}
                    onClick={() => {
                      this.handleClick()
                    }}>发送验证码
            </button>
          </div>
        </div>
        <div className="col-sm-3">
          <button className="btn btn-default disabled">倒计时{this.state.remain}s</button>
        </div>
      </div>
    )
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div style={{maxWidth: '760px', margin: '0 auto'}}>
        {
          this.state.alertVisible ? this.renderDangerAlert() : <div></div>
        }
        <form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="email" component={this.renderEmail.bind(this)} type="email" label="邮箱"/>
          <Field name="code" component={this.renderField} type="text" label="邮箱验证码"/>
          <Field name="newpwd" component={this.renderField} type="password" label="请输入新密码"/>
          <Field name="confirmpwd" component={this.renderField} type="password" label="请再次输入新密码"/>

          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-4">
              <button type="submit" className="btn btn-primary btn-block btn-flat">确认</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'email required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.code) {
    errors.code = 'code required'
  }

  if (!values.newpwd) {
    errors.newpwd = 'new password required';
  }

  if (!values.confirmpwd) {
    errors.confirmpwd = 'repeatpassword required';
  }

  if (values.newpwd !== values.confirmpwd) {
    errors.confirmpwd = 'password is not equal';
  }

  return errors
};


const reduxForgetForm = reduxForm({
  form: 'forgetForm',
  validate
})(Forget);

export default connect(null, {resetCodeAction, resetPwdAction})(reduxForgetForm)
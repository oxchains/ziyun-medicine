/**
 * Created by finch on 7/10/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {userPwdAction} from '../../actions/signup';
import {Alert} from 'react-bootstrap';

class PwdReset extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alertVisible: false,
      errorMessage: ''
    };

    this.renderDangerAlert = this.renderDangerAlert.bind(this);
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

  //校验数据提交表单
  handleFormSubmit({oldpwd, newpwd}) {
    if (oldpwd && newpwd) {
      this.props.userPwdAction({oldpwd, newpwd}, ({status, message}) => {
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
  }

  renderField({input, label, type, meta: {touched, error}}) {
    return (
      <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
        <label className="col-sm-2 control-label"><strong>{label}</strong></label>
        <div className="col-sm-6">
          <input {...input} placeholder={label} type={type} className="form-control"/>
          <div className="help-block with-errors">{touched && error ? error : ''}</div>
        </div>
      </div>
    )
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

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="col-xs-8">
        {
          this.state.alertVisible ? this.renderDangerAlert() : <div></div>
        }
        <div className="row margin-b-20">
          <div className="col-sm-2"></div>
          <div className="col-sm-6" style={{textAlign: 'center'}}>
            <label style={{color: '#6c6c6c', fontWeight: 'bold'}}>
              {`当前用户名：${localStorage.getItem('company')}公司`}
            </label>
          </div>
        </div>
        <form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="oldpwd" component={this.renderField} type="password" label="请输入当前密码"/>
          <Field name="newpwd" component={this.renderField} type="password" label="请输入新密码"/>
          <Field name="confirmpwd" component={this.renderField} type="password" label="确认新密码"/>

          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-6">
              <button type="submit" className="btn btn-primary btn-block btn-flat">保存</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {};

  if (!values.oldpwd) {
    errors.oldpwd = 'password required'
  }

  if (!values.newpwd) {
    errors.newpwd = 'new password required'
  }

  if (!values.confirmpwd) {
    errors.confirmpwd = 'new password required'
  }

  if (values.newpwd !== values.confirmpwd) {
    errors.confirmpwd = 'password is not equal'
  }

  return errors
};

const reduxPwdForm = reduxForm({
  form: 'pwdForm',
  validate
})(PwdReset);

export default connect(null, {userPwdAction})(reduxPwdForm);

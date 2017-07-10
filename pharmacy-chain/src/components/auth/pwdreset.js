/**
 * Created by finch on 7/10/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {userPwdAction} from '../../actions/signup';

class PwdReset extends Component {
  constructor(props) {
    super(props);


  }

  //校验数据提交表单
  handleFormSubmit({currentPwd, newPwd}) {
    if (currentPwd && newPwd) {
      //this.props.userPwdAction();

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

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger alert-dismissable">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="col-xs-8">
        {
          this.renderAlert()
        }
        <div className="row margin-b-20">
          <div className="col-sm-2"></div>
          <div className="col-sm-6" style={{textAlign: 'center'}}>
            <label style={{color: '#6c6c6c'}}>
              {`当前用户名：xxxxxxxx公司`}
            </label>
          </div>
        </div>
        <form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="oldpwd" component={this.renderField} type="password" label="请输入当前密码"/>
          <Field name="newpwd" component={this.renderField} type="password" label="请输入新密码"/>
          <Field name="confirmpwd" component={this.renderField} type="password" label="确认新密码"/>
        </form>

        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-6">
            <button type="submit" className="btn btn-primary btn-block btn-flat">保存</button>
          </div>
        </div>
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

/**
 * Created by finch on 7/10/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgFile: false,
    };

    this.handleFiles = this.handleFiles.bind(this);
  }

  handleFormSubmit({telephone, email, urlImg}) {
    if (telephone && email && urlImg) {


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

  handleFiles(e) {
    window.URL = window.URL || window.webkitURL;
    console.log(e.target.files[0]);

    const img = document.querySelector('img');

    if (e.target.files[0]) {
      img.src = window.URL.createObjectURL(e.target.files[0]);

      img.onload = function () {
        window.URL.revokeObjectURL(this.src);
      }
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div className="col-xs-8">
        <form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div >
            <input type="file" name="logo-file" id="logofile" accept="image/*" style={{margin: '0 auto'}}
                   onChange={this.handleFiles}/>
          </div>
          <div className="row margin-b-20">
            <div className="col-sm-2"></div>
            <div className="col-sm-6" style={{textAlign: 'center'}}>
              <img id='img' style={{width: '115px', height: '115px', border: '1px solid gray'}}
              />
            </div>
          </div>
          <Field name="email" component={this.renderField} type="email" label="邮件" icon="user"/>
          <Field name="telephone" component={this.renderField} type="phone" label="电话" icon="lock"/>

          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-6">
              <button type="submit" className="btn btn-primary btn-block btn-flat">修改</button>
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
  }

  if (!values.telephone) {
    errors.telephone = 'telephone required'
  }

  return errors
};

const reduxUserForm = reduxForm({
  form: 'SettingForm',
  validate
})(UserInfo);


export default connect(null)(reduxUserForm);
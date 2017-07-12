/**
 * Created by finch on 7/10/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {updateInfoAction} from '../../actions/signup';
import {Alert} from 'react-bootstrap';
import '../css/userinfo.css';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgFile: false,
      files: [],
      alertVisible: false,
      errorMessage: ''
    };

    this.renderDangerAlert = this.renderDangerAlert.bind(this);
  }

  handleFormSubmit({telephone, email}) {
    if (this.state.files.length <= 0) {
      return;
    }

    if (telephone && email) {
      this.props.updateInfoAction({"logo": this.state.files[0], telephone, email}, ({status, message}) => {
        if (status == 1) {
          this.props.history.push('/');
        } else {
          console.log('err', message);
          this.setState({
            alertVisible: true,
            errorMessage: message
          });
        }
      });
    }
  }

  onDrop(files) {
    console.log('files', files);
    this.setState({
      files
    })
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
        <form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="row" style={{marginBottom: '32px'}}>
            <div className="col-sm-4">
            </div>

            <div className="col-sm-6">
              <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone" accept="image/png,image/jpeg,image/jpg">
                {({isDragActive, isDragReject, acceptedFiles, rejectedFiles}) => {
                  return (
                    <div>
                      <img src="/public/img/add.png" alt="logo" style={{marginLeft: '32px', marginTop: '28px'}}/>
                      <p style={{
                        textAlign: 'center',
                        marginTop: '8px',
                        color: 'gray'
                      }}>{acceptedFiles.length > 0 ? acceptedFiles[0].name : '修改logo'}</p>
                    </div>
                  )
                }}
              </Dropzone>
            </div>
          </div>
          {
            this.state.imgFile && this.state.files.length <= 0 ? renderAlert('select logo') : <div></div>
          }

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


export default connect(null, {updateInfoAction})(reduxUserForm);
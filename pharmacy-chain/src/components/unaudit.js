/**
 * Created by finch on 6/30/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAuditList} from '../actions/audit';
import './css/unauditlist.css';
import {Link} from 'react-router-dom';

class UnAuditList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAuditList({authenticated: false});
  }

  renderRows() {
    if (this.props.allianceList) {
      return this.props.allianceList.map((item, index) => {
        return (
          <tr key={index}>
            <td>{`${item.company}公司提交了入盟申请`}</td>
            <td>{item.applydate}</td>
            <td><Link to={`${this.props.match.url}/user/${item.username}`}>查看</Link></td>
          </tr>
        )
      })
    }
  }

  render() {
    let {allianceList} = this.props;


    console.log(allianceList);
    return (
      <div className="table-content">
        <table className="table table-hover">
          <tbody>
          {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allianceList: state.alliance.not_alliance_list
  }
}

export default connect(mapStateToProps, {fetchAuditList})(UnAuditList);
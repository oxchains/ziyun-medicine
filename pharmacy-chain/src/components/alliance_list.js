/**
 * oxchain
 *
 *
 * Author: Jun
 * Date: 27/06/2017
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllianceList } from '../actions/alliance';
import css from './css/alliance.css';

class AllianceList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAllianceList();
  }

  renderRows() {
    return this.props.all.map((row, idx) => {
      return <li key={idx}><i className="fa fa-circle"></i> {row.company}</li>;
    });
  }

  render() {
    console.log(this.props.all)
    if(this.props.all===null) {
      return <div><section className="content"><h1>Loading...</h1></section></div>
    }

    return (
      <div className="alliance box-shadow">
        <div className="alliance-header"><i className="fa fa-group"></i> 联盟成员名单</div>
        <ul>
          {this.renderRows()}
        </ul>
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    all: state.alliance.all
  };
}

export default connect(mapStateToProps, { fetchAllianceList })(AllianceList);
/**
 * oxchain
 *
 *
 * Author: Jun
 * Date: 30/06/2017
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Moment from 'react-moment';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { fetchPeerInfo } from '../actions/peer';

class PeerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error:null,
      spin:false
    };
  }

  componentWillMount() {
    this.props.fetchPeerInfo();
  }

  render() {
    if(this.props.info == null){
      return <div className="container"><section className="content"><h1>Loading...</h1></section></div>
    }

    const item = this.props.info;

    return (
      <div className="container">
        <section className="content">
          <div className="row">
            <div className="col-xs-12 col-md-8 col-md-offset-2">
              <div className="panel panel-default">
                <div className="panel-heading">节点信息</div>
                <div className="panel-body">
                  <dl className="dl-horizontal">
                    <dt>ID</dt>
                    <dd>{item.id}</dd>
                    <dt>EndPoint</dt>
                    <dd>{item.endpoint}</dd>
                    <dt>状态</dt>
                    <dd>{item.status}</dd>
                    <dt>链</dt>
                    <dd>{item.chains.join(', ')}</dd>
                    <dt>合约</dt>
                    <dd>{item.chaincodes.join(', ')}</dd>
                  </dl>
                </div>
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
    info: state.peer.info
  };
}
export default connect(mapStateToProps, { fetchPeerInfo })(PeerInfo);
/**
 * oxchain
 *
 *
 * Author: Jun
 * Date: 28/06/2017
 *
 */

import React from 'react';
import AllianceList from './alliance_list';
import AllianceMap from './alliance_map';

export default () => {
  return (
    <div className="container">
      <section className="content">
        <div className="row">
          <div className="col-md-3"><AllianceList/></div>
          <div className="col-md-9">
            <AllianceMap />
          </div>
        </div>
      </section>
    </div>);
};
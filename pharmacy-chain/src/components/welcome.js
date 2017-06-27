import React from 'react';
import Moment from 'react-moment';
import AllianceList from './alliance_list';

export default () => {
  return (
  <div className="container">
    <section className="content">
      <div className="row">
        <div className="col-md-3"><AllianceList/></div>
        <div className="col-md-9 text-center">
          <h3>欢迎使用九州通医药集团系统</h3>
          <div>现在时间是: <Moment locale="zh-cn" format="lll"></Moment></div>
        </div>
      </div>
    </section>
  </div>);
};
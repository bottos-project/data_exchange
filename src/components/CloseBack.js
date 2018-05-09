import React, { Component } from 'react';
import { Icon } from 'antd';
import { hashHistory } from 'react-router'

function back() {
  console.log('hashHistory', hashHistory);
  hashHistory.goBack()
}

function CloseBack(props) {
  var style = props.style
  return (
    <div onClick={back} className='close-back' {...props}>
      <Icon type="close" style={{ fontSize: 18 }} />
    </div>
  );

}

export default CloseBack;

import React, { Component } from 'react';
import { Button } from 'antd'

const style = {
  padding: '0 30px',
  backgroundImage: '-webkit-linear-gradient(7deg, #5F72D8 0%, #6366C7 31%, #6E479D 100%)',
  boxShadow: '0 0 5px 0 #896ACF',
  borderRadius: 5,
  color: 'white',
}

function ConfirmButton(props) {
  console.log('props', props);
  return (
    <Button {...props} size='large' style={style}>
      {props.children}
    </Button>
  )
}

export default ConfirmButton;

import React from 'react';
import './style.less'

function ColorfulButton(props) {
  // console.log('props', props);
  const { className: _className, ..._props } = props
  const className = 'btn-colorful ' + (_className || '')
  return (
    <button className={className} {..._props}>
      {props.children}
    </button>
  )
}

export default ColorfulButton;

import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

const duration = 300;

const defaultStyle = {
  transition: `height ${duration}ms ease-in-out`,
  height: 0,
  willChange: 'height',
}

const timeout={
 enter: 100,
 exit: duration,
}

class BTTransitionHeight extends Component {

  render() {
    const { show, height, children, ..._props } = this.props

    const transitionStyles = {
      entering: null,
      entered: {
        height,
      },
      exiting: null,
      exited: null,
    }

    return (
      <Transition
        in={show}
        timeout={timeout}
        unmountOnExit
        >
          {state => (
            <div style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }} {..._props}>
              {children}
            </div>
          )}
        </Transition>
    );
  }

}

BTTransitionHeight.defaultProps = {
  show: false
};

BTTransitionHeight.propTypes = {
  show: PropTypes.bool.isRequired,
  height: PropTypes.number,
};

export default BTTransitionHeight;

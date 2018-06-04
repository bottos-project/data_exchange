/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
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
    const { show, height, children, style, ..._props } = this.props

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
              ...transitionStyles[state],
              ...style
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

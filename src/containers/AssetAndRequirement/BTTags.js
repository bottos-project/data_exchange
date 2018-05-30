import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BTTags extends Component {

  render() {

    let tags = this.props.tags.map((tag, index) =>
      tag && <span className='bt-tag' key={index}>{tag}</span>
    )

    return (
      <div>
        {tags}
      </div>
    );
  }

}

BTTags.propTypes = {
  tags: PropTypes.array
};

export default BTTags;

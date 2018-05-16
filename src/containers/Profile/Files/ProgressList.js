import React, { Component, PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Icon } from 'antd'



class UploadingFile extends PureComponent {
  render() {
    const { name, status, percent } = this.props
    const __percent = (percent || 0) - 100 + '%'
    return <div className='file-upload-item' style={{'--percent': __percent}}>
      <div></div>
      <span>
        {status == 'uploading' && <Icon type="loading" />}
      </span>
      <div className='file-upload-item-name'>{name}</div>
      <span className='file-upload-item-close'>
        <Icon type="close" />
      </span>
    </div>
  }
}

// UploadingFile.propTypes = {
//   percent: PropTypes.number,
// };

UploadingFile.defaultProps = {
  percent: 0
};

class ProgressList extends Component {

  render() {

    const { fileList, progressMap } = this.props

    const list = fileList.map((file) => {

      return <UploadingFile key={file.uid} {...file} percent={progressMap[file.guid]} />;
    })

    return (
      <div className='file-upload-list'>{list}</div>
    );
  }

}

function mapStateToProps(state) {
  const { fileList, progressMap } = state.uploaderState
  return { fileList, progressMap };
}

export default connect(mapStateToProps)(ProgressList);

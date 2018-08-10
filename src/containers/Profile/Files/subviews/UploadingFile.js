import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { deleteFile, updateFile } from '@/redux/actions/uploaderAction'

class UploadingFile extends PureComponent {
  constructor(props) {
    super(props);
    this.deleteFileFormList = this.deleteFileFormList.bind(this)
    this.handlePlayOrPause = this.handlePlayOrPause.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  deleteFileFormList() {
    const { deleteFile, id } = this.props
    deleteFile(id)
    if (uploader.getFiles().some(file => file.id == id)) {
      uploader.removeFile(id)
    }
  }

  handlePlayOrPause(e) {
    const { id, status, updateFile } = this.props
    let info = Object.assign({}, this.props)
    delete info.updateFile
    delete info.deleteFile
    if (status == 'uploading') {
      uploader.stop(id)
      updateFile({...info, status: 'interrupt'})
    } else if (status == 'error') {
      // let file = uploader.getFiles().find(file => file.id == id)
      // if (!file) {
      //
      // }
      // uploader.retry(file)
    } else if (status == 'interrupt' ) {
      uploader.upload(id)
      updateFile({...info, status: 'uploading'})
    } else if (status == 'cache') {
      // console.log('cache file info', info);
      uploader.upload(id)
    }
  }

  handleClose(e) {
    e.stopPropagation()
    const { deleteFile, id, status, percent } = this.props
    // console.log('status', status);
    if (status == 'uploading' && percent != 100) {
      return ;
    }
    deleteFile(id)
    deleteFileCache(id)
    // if (uploader.getFiles().findIndex(f => f.id == id) != -1) {
      uploader.cancelFile(id)
    // }
  }

  render() {
    let { name, status, percent, cache, progressing_slice_chunk, hashList } = this.props
    if (cache && percent < 90) {
      let remanentRate = progressing_slice_chunk.length / hashList.length
      let hasDoneRate = 1 - remanentRate
      percent = 90 * hasDoneRate + remanentRate * percent
    }
    const __percent = (percent || 0) - 100 + '%'
    return <div className='file-upload-item' style={{'--percent': __percent}}>
      <div></div>
      <span>
        {BeforeIcon({status, percent})}
      </span>
      <div className='file-upload-item-name'>{name}</div>
      <div className='file-upload-functional-icons'>
        {/* <Popconfirm
          title={<FormattedMessage {...PersonalAssetMessages.SureToDelete} />}
          onConfirm={this.deleteFileFormList}
          placement="topRight"
          > */}
          <span className='file-upload-item-pause' onClick={this.handlePlayOrPause}>
            { PlayAndPauseIcon({status}) }
          </span>
          <span className='file-upload-item-close' onClick={this.handleClose}>
            <Icon type="close" />
          </span>
          {/* </Popconfirm> */}
      </div>
    </div>
  }
}

UploadingFile.propTypes = {
  status: PropTypes.oneOf(['inited', 'uploading', 'done', 'error', 'interrupt', 'cache']),
};

UploadingFile.defaultProps = {
  percent: 0
};

function mapStateToProps(state) {
  const { fileList, progressMap } = state.uploaderState
  return { fileList, progressMap };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteFile(f) {
      dispatch( deleteFile(f) )
    },
    updateFile(file) {
      dispatch( updateFile(file) )
    }
  }
}

export default connect(null, mapDispatchToProps)(UploadingFile);

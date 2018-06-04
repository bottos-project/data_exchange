import React, { Component, PureComponent } from 'react';
import { deleteFile } from '@/redux/actions/uploaderAction'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Icon, Popconfirm } from 'antd'
import { FormattedMessage } from 'react-intl'
import messages from '@/locales/messages'
const PersonalAssetMessages = messages.PersonalAsset
import uploader from '../uploader'

function BeforeIcon({percent, status}) {
  if (percent == 100 || status == 'done') {
    return <Icon type="check" />
  } else if (status == 'uploading') {
    return <Icon type="loading" />;
  } else if (status == 'error') {
    return <Icon type="exclamation-circle-o" />
  }
}

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
    // const { id, status } = this.props
    // if (status == 'uploading') {
    //   uploader.stop(this.props.id)
    // } else if (status == 'error') {
    //   let file = uploader.getFiles().find(file => file.id == id)
    //   if (!file) {
    //
    //   }
    //   uploader.retry(file)
    // } else if (status == 'pause') {
    //   uploader.upload(id)
    // }
  }

  handleClose(e) {
    const { deleteFile, id, status, percent } = this.props
    console.log('status', status);
    if (status == 'done' || status == 'error' || percent == 100) {
      deleteFile(id)
      e.stopPropagation()
    }
  }

  render() {
    const { name, status, percent } = this.props
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
            {
              status != 'done' && (
                status == 'uploading' ? <Icon type="pause" /> : <Icon type="play-circle-o" />
              )
            }
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
  status: PropTypes.oneOf(['uploading', 'done', 'error', 'interrupt']),
};

UploadingFile.defaultProps = {
  percent: 0
};

class ProgressList extends Component {

  render() {

    const { fileList, progressMap, deleteFile } = this.props

    const list = fileList.map((file) => {
      return <UploadingFile
        key={file.guid || file.id}
        {...file}
        percent={progressMap[file.guid]}
        deleteFile={deleteFile}
      />;
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

function mapDispatchToProps(dispatch) {
  return {
    deleteFile(f) {
      dispatch( deleteFile(f) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressList);

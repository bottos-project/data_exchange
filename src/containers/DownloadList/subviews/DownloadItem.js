import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteDownload, updateDownload } from '../../../redux/actions/downloadAction'
import { Icon } from 'antd';
import ProgressICON from './ProgressICON';
const { shell } = window.electron

class DownloadItem extends Component {

  handleClose = (e) => {
    const { status, filePath } = this.props.item
    console.log('status', status);
    if (status == 'done' || status == 'inexistence') {
      this.props.deleteDownload(filePath)
    }
  }

  componentDidMount() {

    const { item, updateDownload } = this.props
    const { status, filePath } = item

    if (status == 'done' && !window.existsSync(filePath)) {
      updateDownload({
        ...item,
        status: 'inexistence',
      })
    }

  }

  openFolder = () => {
    const { filePath } = this.props.item
    shell.showItemInFolder(filePath)
  }

  statusIcon = () => {
    const { status } = this.props.item
    switch (status) {
      case 'inexistence':
        return null;
      case 'done':
        return <span className='download-list-item-open' onClick={this.openFolder}>
          <Icon type="folder-open" />
        </span>
      default:
        return <ProgressICON {...this.props.item} />
    }
  }

  render() {
    const { filePath, status, basename } = this.props.item
    // const { status,  }
    // console.log('filePath', filePath);
    let pathArr = filePath.split('\\')
    let name = basename || pathArr.pop()
    // console.log('name', name);
    // let name = basename(filePath) ? basename(filePath) : filePath
    return (
      <div className='download-list-item'>
        <span className={status}>
          {name}
        </span>

        <span className='download-list-item-status'>
          {this.statusIcon()}
        </span>

        <span className='download-list-item-close' onClick={this.handleClose}>
          <Icon type="close" />
        </span>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDownload(f) {
      dispatch( updateDownload(f) )
    },
    deleteDownload(filePath) {
      dispatch( deleteDownload(filePath) )
    },
  }
}

export default connect(null, mapDispatchToProps)(DownloadItem);

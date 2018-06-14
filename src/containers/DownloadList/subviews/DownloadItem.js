import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteDownload, updateDownload } from '../../../redux/actions/downloadAction'
import { Progress, Icon } from 'antd';
import { basename } from 'path'

// console.log('basename', basename);
const { ipcRenderer, shell } = window.electron

class DownloadItem extends Component {
  constructor(props) {
    super(props);
    // let status = props.item.status
    this.state = {
      percent: 0,
      // status
    };
  }

  componentDidMount() {

    const { status, filePath, urlList } = this.props.item

    if (status == 'done') {
      return ;
    }

    this.channel = 'file_download:' + filePath

    ipcRenderer.on(this.channel, (event, message) => {
      // console.log('message', message);
      let urlList = message.urlList
      // console.log('urlList', urlList);
      let chunks = urlList.length
      let total = urlList[0].totalBytes * chunks
      let received = 0
      for (var i = 0; i < urlList.length; i++) {
        received += urlList[i].receivedBytes
      }
      if (received > urlList[0].totalBytes * (chunks - 1)) {
        total = urlList.map(el => el.totalBytes).reduce(function (accumulator, currentValue) {
          return accumulator + currentValue
        })
      }
      // console.log('received', received);
      // console.log('total', total);
      let percent = Number.parseInt(received / total * 100)
      this.setState({ percent })
    })

  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(this.channel)
  }

  openFolder = () => {
    const { filePath } = this.props.item
    shell.showItemInFolder(filePath)
  }

  handleClose = (e) => {
    const { status, filePath } = this.props.item

    console.log('status', status);

    if (status == 'done') {
      this.props.deleteDownload(filePath)

    }
  }

  render() {
    const { filePath, status, basename } = this.props.item
    // const { status,  }
    // console.log('filePath', filePath);
    // console.log('basename(filePath)', basename(filePath));
    // let name = basename(filePath) ? basename(filePath) : filePath
    return (
      <div className='download-list-item'>
        <span className=''>
          {filePath}
        </span>

        <span className='download-list-item-status'>
          {
            status == 'done'
            ?
            <span className='download-list-item-open' onClick={this.openFolder}>
              <Icon type="folder-open" />
            </span>
            :
            <Progress showInfo={false} type="circle" width={20} percent={this.state.percent} />
          }
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

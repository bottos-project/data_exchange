import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Progress, Icon } from 'antd';

const { ipcRenderer } = window.electron

class DownloadItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 10,
    };
  }
  componentDidMount() {

    const { status, filePath } = this.props.item

    if (status == 'done') {
      return ;
    }

    let channel = 'file_download:' + filePath

    ipcRenderer.on(channel, (event, message) => {
      console.log('message', message);
      this.setState({ percent: 100 })
      let status = message.status
      if (status == 'done') {
        this.props.updateDownload(message)
      }
    })

  }

  render() {
    const { filePath } = this.props.item
    return (
      <div className='download-list-item'>
        <span className=''>
          {filePath}
        </span>
        <Progress type="circle" width={30} percent={this.state.percent} />

        <span className='download-list-item-close'>
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
    }
  }
}

export default connect(null, mapDispatchToProps)(DownloadItem);

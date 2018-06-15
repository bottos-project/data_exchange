import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress, Icon } from 'antd';
const { ipcRenderer } = window.electron


class ProgressICON extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
    };
  }


  pause = (e) => {
    console.log('e target pause', e.target);
  }

  restart = (e) => {
    console.log('e target restart', e.target);
  }

  componentDidMount() {
    const { status, filePath } = this.props

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

  render() {
    const { status } = this.props

    return <div className='download-list-item-progress'>
      <Progress showInfo={false} type="circle" width={20} percent={this.state.percent} />
      {/* {
        status == 'downloading' ?
        <Icon type="pause" onClick={this.pause} /> :
        <Icon type="caret-right" onClick={this.restart} />
      } */}

    </div>

  }
}

ProgressICON.propTypes = {
  status: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired,
};

export default ProgressICON

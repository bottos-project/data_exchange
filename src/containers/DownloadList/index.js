import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateDownload } from '../../redux/actions/downloadAction'
import { Collapse, List } from 'antd';
import DownloadItem from './subviews/DownloadItem'
const { ipcRenderer } = window.electron

import './style.less'

const Panel = Collapse.Panel;

/**
 * 这个组件是显示所有已下载的文件
 * 目前先放在页面的右下角
 * 之后再改位置
 * @extends Component
 */
class DownloadList extends Component {

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(this.channel)
  }

  componentDidMount() {
    this.channel = 'file_download'

    ipcRenderer.on(this.channel, (event, message) => {
      console.log('message', message);
      // this.setState({ percent: 100 })
      let status = message.status
      if (status == 'done') {
        this.props.updateDownload(message)
      }
    })

    // const { downloads } = this.props
    //
    // downloads.forEach(el => {
    //   if (el.status == 'done') {
    //
    //   }
    // })

  }

  render() {
    const { downloads } = this.props
    return (
      <div className='download-list-simple'>
        <Collapse>
          <Panel header="This is Download List" key="1">
            <List
              dataSource={downloads}
              renderItem={item => (
                <List.Item key={item.filePath}>
                  <DownloadItem item={item} />
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const downloads = state.downloadState.downloads
  return { downloads }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDownload(f) {
      dispatch( updateDownload(f) )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList);

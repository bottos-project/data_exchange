import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateDownload } from '../../redux/actions/downloadAction'
import { Collapse, List } from 'antd';
import DownloadItem from './subviews/DownloadItem'
const { ipcRenderer } = window.electron

import './style.less'

const Panel = Collapse.Panel;

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  </p>
);

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  overflow: 'hidden',
};

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
/**
 * 这个组件是显示所有已下载的文件
 * 目前先放在页面的右下角
 * 之后再改位置
 * @extends Component
 */
class DownloadList extends Component {

  componentDidMount() {
    let channel = 'file_download'

    ipcRenderer.on(channel, (event, message) => {
      console.log('message', message);
      // this.setState({ percent: 100 })
      let status = message.status
      if (status == 'done') {
        this.props.updateDownload(message)
      }
    })
  }

  render() {
    const { downloads } = this.props
    return (
      <div className='download-list-simple'>
        <Collapse>
          <Panel header="This is Download List" key="1">
            {/* {text} */}
            <List
              // header={<div>Header</div>}
              // bordered
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

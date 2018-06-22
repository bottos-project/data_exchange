import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteDownload, updateDownload } from '../../../redux/actions/downloadAction'
import { Icon } from 'antd';
import Base from 'webuploader/base'

const { shell } = window.electron


class HasDownloaded extends Component {
  constructor(props) {
    super(props);
    let total = props.item.urlList.map(el => el.totalBytes).reduce(function (accumulator, currentValue, currentIndex) {
      if (currentValue == undefined) {
        currentValue = urlList[0].totalBytes
      }
      return accumulator + currentValue
    })

    this.total = Base.formatSize(total)
  }

  handleClose = (e) => {
    const { status, filePath } = this.props.item
    console.log('status', status);
    if (status == 'done' || status == 'inexistence') {
      this.props.deleteDownload(filePath)
    } else {
      console.error('status', status);
    }
  }

  componentDidMount() {

    const { item, updateDownload } = this.props
    const { status, filePath } = item

    if (status == 'done' && !window.existsSync(filePath)) {
      console.log('不存在啊');
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
        <span className='download-item-icon'>
          <img src='./img/unkown.svg' />
          
        </span>

        <div className='download-item-info-container'>
          <div className={status}>
            {name}
          </div>

          <div> {this.total} </div>

          {
            status == 'done' &&
            <span className='download-list-item-open' onClick={this.openFolder}>
              <Icon type="folder-open" />
            </span>
          }
        </div>


        <span className='download-list-toggle-icon' onClick={this.handleClose}>
          <Icon type="close-circle-o" />
        </span>

      </div>
    );
  }

}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDownload, deleteDownload}, dispatch)
}

export default connect(null, mapDispatchToProps)(HasDownloaded);

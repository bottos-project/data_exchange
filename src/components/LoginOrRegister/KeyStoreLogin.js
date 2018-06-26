import React, { Component } from 'react';
import { Icon, Input, Button, Row, Col } from 'antd'
import {FormattedMessage} from 'react-intl'
import messages from '@/locales/messages'
import BTIPcRenderer from '@/tools/BTIpcRenderer'

const { TextArea } = Input;
const LoginMessages = messages.Login;
const HeaderMessages = messages.Header;

const electron = window.electron
const clipboard = electron.clipboard

const rowStyle = {
  maxWidth: 560,
  marginTop: 20,
}

class KeyStoreLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }

  pasteKeystore = ()=>{
    let keyStore = clipboard.readText()
    // console.log('keyStore', keyStore)
    this.props.changeKeyStore(keyStore)
  }

  importKeyStore = () => {
    let keyStoreInfo = BTIPcRenderer.importFile()
    if(!keyStoreInfo.error){
      let {username, result} = keyStoreInfo
      this.setState({ username })
      this.props.changeKeyStore(result)
      window.message.success(window.localeInfo["Header.ImportKeyStoreSuccess"])
    }else{
      message.error(window.localeInfo["Header.ImportKeyStoreFaild"])
    }
  }

  render() {
    return (
      <div>
        <span onClick={() => this.props.changeMode('username')}
          style={{position: 'absolute', top: 5, left: 15, fontSize: 24, cursor: 'pointer'}}>
          <Icon type="arrow-left" />
        </span>
        <Row style={rowStyle}>
          <Col span={5} style={{ textAlign: 'right' }}>
            <span className='label'><FormattedMessage {...LoginMessages.Keystore} /></span>
          </Col>
          <Col span={18}>
            <TextArea
              disabled={!!this.state.username}
              placeholder={window.localeInfo["Header.PleaseEnterTheKeystore"]}
              rows={6}
              value={this.props.keyStore}
              onChange={(e)=>this.props.changeKeyStore(e.target.value)}
            />
          </Col>
        </Row>

        {this.state.username && <div className='flex center'>
          <Icon type="file" />{this.state.username}.keystore
        </div>}

        <Row style={rowStyle}>
          {/* <Col span={5} style={{height: '100%'}}></Col> */}
          <Col span={18} offset={5}>
            <Row type='flex' justify='space-around'>
              <Button type='primary' onClick={this.pasteKeystore}>
                <FormattedMessage {...LoginMessages.PasteTheKeyStore}/>
              </Button>

              <Button type='primary' onClick={this.importKeyStore}>
                <FormattedMessage {...LoginMessages.ImportTheKeyStore}/>
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

}

export default KeyStoreLogin;

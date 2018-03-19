import React,{PureComponent} from 'react'
import {Modal} from 'antd'

import BTUploadAsset from './BTUploadAsset'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const PersonalAssetMessages = messages.PersonalAsset;
export default class BTPublishAssetModal extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:false
        }
    }

    onCancel(){
        this.setState({
            visible:false
        })
    }

    render(){
        return(
            <Modal
                visible={this.state.visible}
                onCancel={()=>this.onCancel()}
                className="modalAsset"
                okText = "立即发布"
                cancelText = "取消"
                footer={null}
                title={<FormattedMessage {...PersonalAssetMessages.PublishAsset}/>}
            >
                <BTUploadAsset/>
            </Modal>
        )
    }
}
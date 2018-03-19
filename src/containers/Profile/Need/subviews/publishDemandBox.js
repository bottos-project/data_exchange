import React,{PureComponent} from 'react'
import moment from "moment"
import {Upload,Modal,Form, Icon, Input, Button,DatePicker,TimePicker} from 'antd'
import BTUploadNeed from "./BTUploadAsset"
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const PersonalDemandMessages = messages.PersonalDemand;

export default class BTPublishDemand extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            visible:false
        }
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }

    handleOk(){
        this.setState({
            visible:false
        })
    }

    render(){
        return(
            <Modal visible={this.state.visible}
                   onCancel={()=>this.handleCancel()}
                   className="modalAsset"
                   okText = "立即发布"
                   cancelText = "取消"
                   footer={null}
                   title={<FormattedMessage {...PersonalDemandMessages.PublishTheDemand}/>}
            >
                <BTUploadNeed/>
            </Modal>
        )
    }
}


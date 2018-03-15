import React,{PureComponent} from 'react'
import moment from "moment"
import {Upload,Modal,Form, Icon, Input, Button,DatePicker,TimePicker} from 'antd'
import BTUploadNeed from "./BTUploadAsset"


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
                   title="发布需求"
            >
                <BTUploadNeed/>
            </Modal>
        )
    }
}


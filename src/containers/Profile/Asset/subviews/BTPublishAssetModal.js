import React,{PureComponent} from 'react'
import {Modal} from 'antd'

import BTUploadAsset from './BTUploadAsset'

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

    onOk(){
        /*this.setState({
            visible:false
        })*/
    }

    render(){
        return(
            <Modal
                visible={this.state.visible}
                onCancel={()=>this.onCancel()}
                onOk = {()=>this.onOk()}
                className="modalAsset"
            >
                <BTUploadAsset/>
            </Modal>
        )
    }
}
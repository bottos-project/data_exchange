import React,{PureComponent} from 'react'

import {Modal} from 'antd'

import BTUploadAsset from './BTUploadAsset'

export default class BTPublishAssetModal extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Modal visible="true">
                <BTUploadAsset/>
            </Modal>
        )
    }
}
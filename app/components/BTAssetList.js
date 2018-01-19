import React,{PureComponent} from 'react'
import { Radio, Row, Col,Modal } from 'antd';
const RadioGroup = Radio.Group;

export default class BTAssetList extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:false
        }
    }

    handleOk(){
        this.setState({
            visible:false
        })
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }

    onChange(){

    }

    render(){
        return(
            <Modal visible={this.state.visible}
                onOk={()=>this.handleOk()}
                onCancel={()=>this.handleCancel()}
            >
                <div style={{height:300,overflow:"auto",margin:20}}>
                    <RadioGroup style={{ width: '100%' }} onChange={()=>this.onChange()}>
                        <Col>
                        <Row span={8}><Radio value="A">人物表情图片.zip</Radio></Row>
                        <Row span={8}><Radio value="B">道路识别图片.zip</Radio></Row>
                        <Row span={8}><Radio value="C">婴儿叫声.zip</Radio></Row>
                        <Row span={8}><Radio value="D">暴力视频过滤素材.zip</Radio></Row>
                        <Row span={8}><Radio value="E">英语阅读模仿.zip</Radio></Row>
                        <Row span={8}><Radio value="16">英语阅读模仿.zip</Radio></Row>
                        <Row span={8}><Radio value="2">英语阅读模仿.zip</Radio></Row>
                        <Row span={8}><Radio value="3">英语阅读模仿.zip</Radio></Row>
                        <Row span={8}><Radio value="4">英语阅读模仿.zip</Radio></Row>
                        <Row span={8}><Radio value="5">英语阅读模仿.zip</Radio></Row>
                        <Row span={8}><Radio value="6">英语阅读模仿.zip</Radio></Row>
                        <Row span={8}><Radio value="7">英语阅读模仿.zip</Radio></Row>
                        <Row span={8}><Radio value="8">英语阅读模仿.zip</Radio></Row>
                        <Row span={8}><Radio value="9">英语阅读模仿.zip</Radio></Row>
                        <Row span={8}><Radio value="10">英语阅读模仿.zip</Radio></Row>
                        </Col>
                    </RadioGroup>
                </div>
            </Modal>
        )
    }
}
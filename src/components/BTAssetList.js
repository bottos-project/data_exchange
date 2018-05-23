import React,{PureComponent} from 'react'
import { Radio, Row, Col, Modal, Button, message } from 'antd';
import {getAccount} from "../tools/localStore";
import {Link} from 'react-router'
const RadioGroup = Radio.Group;

export default class BTAssetList extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            value:'',
            type:'',
            hash:''
        }
    }

    async handleOk(){
        this.setState({
            visible:false,
        });

        let type = this.state.type || 'other'
        let callBackData = {
            type,
            value:this.state.value,
            hash:this.state.hash,
        }
        //获取url路径
        this.props.handleFile(callBackData);
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }

    onChange(e){
      // console.log('radio checked', e.target.value);
      let index = e.target.value
      let fileInfo = this.props.newdata[index]
        this.setState({
            value: fileInfo.file_name,
            hash: fileInfo.file_hash,
        });
    }

    render() {
        const data=this.props.newdata||[];
        // console.log(newdata);

        const list = data.map((value, index) => (
          <Row key={index} span={8}>
            <Radio value={index}>{value.file_name}</Radio>
          </Row>
        ))

        return(
            <Modal visible={this.state.visible}
                onOk={()=>this.handleOk()}
                onCancel={()=>this.handleCancel()}
            >
                <div style={{height:300,overflow:"auto",margin:20}}>
                    <RadioGroup style={{ width: '100%' }}  onChange={(e)=>this.onChange(e)} defaultValue=''>
                        <Col>{list}</Col>
                    </RadioGroup>
                    {/*<Button  onClick={()=>this.file()}><Link to='/profile/asset'>上传资源文件</Link></Button>*/}
                </div>
            </Modal>
        )
    }
}

/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
import React,{PureComponent} from 'react'
import { Radio, Row, Col, Modal, Button } from 'antd';
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

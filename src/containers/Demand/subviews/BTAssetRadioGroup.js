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
import { Radio, Row, Col, Modal, message } from 'antd';
import BTFetch from "../../../utils/BTFetch";
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'

const RadioGroup = Radio.Group;

export default class BTAssetRadioGroup extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            value:'',
            type:'',
        }
    }
    handleOk(){
        this.setState({
            visible:false
        });

        this.props.handleFile(this.state.value);
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    onChange(e){
        this.setState({value:e.target.value});
    }

    render(){
        // console.log(this.props);
        let exampledata=this.props.exampledata;
        // console.log('exampledata', exampledata);
        return(
            <Modal visible={this.state.visible}
                   onOk={()=>this.handleOk()}
                   onCancel={()=>this.handleCancel()}
                   okText={<FormattedMessage {...messages.OK} />}
                   cancelText={<FormattedMessage {...messages.Cancel} />}
            >
                <div style={{height:300,overflow:"auto",margin:20}}>
                    <RadioGroup style={{ width: '100%' }}  onChange={(e)=>this.onChange(e)} defaultValue=''>
                        <Col>
                            {
                                exampledata.map((value, index)=>{
                                  console.log('value', value);
                                    return (
                                        <Row key={value.asset_id} span={8}><Radio value={value.asset_id}>{value.asset_name}</Radio></Row>
                                    )
                                })
                            }
                        </Col>
                    </RadioGroup>
                </div>
            </Modal>
        )
    }
}

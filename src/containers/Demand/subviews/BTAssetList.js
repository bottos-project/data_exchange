import React,{PureComponent} from 'react'
import { Radio, Row, Col,Modal } from 'antd';
import BTFetch from "../../../utils/BTFetch";
import {message} from "antd/lib/index";
const RadioGroup = Radio.Group;

export default class BTAssetList extends PureComponent{
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
        let getvalue=this.state.value.split(',')
        let callBackData = {};
            callBackData = {
                type:'asset_id',
                value:getvalue[0],
                name:getvalue[1]
            }

        this.props.handleFile(callBackData);
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    onChange(e){
        this.setState({value:e.target.value});
    }
    componentDidMount(){
    }
    render(){
        // console.log(this.props);
        let exampledata=this.props.exampledata||[];
        console.log(exampledata);
        return(
            <Modal visible={this.state.visible}
                   onOk={()=>this.handleOk()}
                   onCancel={()=>this.handleCancel()}
            >
                <div style={{height:300,overflow:"auto",margin:20}}>
                    <RadioGroup style={{ width: '100%' }}  onChange={(e)=>this.onChange(e)} defaultValue=''>
                        <Col>
                            {
                                exampledata.map((value,index)=>{
                                    return (
                                        <Row key={index} span={8}><Radio value={value.asset_id+','+value.asset_name}>{value.asset_name}</Radio></Row>
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
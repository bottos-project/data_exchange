import React,{PureComponent} from 'react'
import { Radio, Row, Col, Modal, message } from 'antd';
import BTFetch from "../../../utils/BTFetch";
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
        console.log('exampledata', exampledata);
        return(
            <Modal visible={this.state.visible}
                   onOk={()=>this.handleOk()}
                   onCancel={()=>this.handleCancel()}
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

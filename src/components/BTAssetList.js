import React,{PureComponent} from 'react'
import { Radio, Row, Col,Modal } from 'antd';
import BTFetch from "../utils/BTFetch";
import {message} from "antd/lib/index";
const RadioGroup = Radio.Group;

export default class BTAssetList extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            value:'',
            type:'',
            // data:this.props.examplefile||[]
            exampledata:[],
        }
    }

    handleOk(){
        this.setState({
            visible:false
        })

        let callBackData = {}
        if(this.state.type=='asset'){
            callBackData = {
                type:'asset',
                value:this.state.value
            }
        }else if(this.state.type == 'assetTemp'){
            callBackData = {
                type:'assetTemp',
                value:this.state.value
            }
        }else{
            callBackData = {
                type:'other',
                value:this.state.value
            }
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
        // console.log(this.state.value);

    }

    componentDidMount(){
        // console.log(this.state.data)
        let param={
            userName:'btd121',
            random:Math.ceil(Math.random()*100),
            signature:'0xxxx'
        };
        BTFetch('/asset/queryUploadedData','post',param,{service:'service'})
            .then(res=>{
                if(res.code==1){
                    this.setState({
                        exampledata:JSON.parse(res.data),
                    })
                    // console.log(this.state.exampledata)

                }else{
                    message.warning('获取文件资源库失败')
                    return;
                }
            })
            .catch(error=>{
                message.warning('获取文件资源库失败')
            })
    }
    render(){
        this.setState({data:this.props.examplefile});
        const data=this.props.examplefile||[];
        // console.log(data);
        return(
            <Modal visible={this.state.visible}
                onOk={()=>this.handleOk()}
                onCancel={()=>this.handleCancel()}
            >
                <div style={{height:300,overflow:"auto",margin:20}}>
                    <RadioGroup style={{ width: '100%' }}  onChange={(e)=>this.onChange(e)} defaultValue=''>
                        <Col>
                            {
                                this.state.exampledata.map((value,index)=>{
                                        return (
                                            <Row key={index} span={8}><Radio value={value.file_name}>{value.file_name}</Radio></Row>
                                        )
                                    })
                            }
                            {/*<Row span={8}><Radio value="B">人物表情图片.zip</Radio></Row>*/}
                        </Col>
                    </RadioGroup>
                </div>
            </Modal>
        )
    }
}
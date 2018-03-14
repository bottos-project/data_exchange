import React,{PureComponent} from 'react'
import { Radio, Row, Col,Modal } from 'antd';
const RadioGroup = Radio.Group;

export default class BTAssetList extends PureComponent{
    constructor(props){
        super(props)
<<<<<<< HEAD
        this.state = {
            visible:false,
            value:'',
            type:'',
            data:[{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"说明.js","file_number":1,"file_policy":"policytest","file_size":1606},{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"11.txt","file_number":1,"file_policy":"policytest","file_size":366},{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"liu132618","file_number":1,"file_policy":"policytest","file_size":1766},{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"biying.js","file_number":1,"file_policy":"policytest","file_size":7611},{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"新建文本文档 (2).txt","file_number":1,"file_policy":"policytest","file_size":991},{"authorized_storage":"10.104.14.169:9000","file_hash":"filehashtest","file_name":"速记.txt","file_number":1,"file_policy":"policytest","file_size":683}]
=======

        this.state = {
            visible:false
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
        }
    }

    handleOk(){
        this.setState({
            visible:false
        })
<<<<<<< HEAD

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
=======
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }

<<<<<<< HEAD
    onChange(e){
        this.setState({value:e.target.value});
        // console.log(this.state.value);

    }

    componentDidMount(){
        // this.setState({data:this.props.fileall})
        // console.log(this.state.data)
    }
    render(){
        // console.log(this.state.data)
=======
    onChange(){

    }

    render(){
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
        return(
            <Modal visible={this.state.visible}
                onOk={()=>this.handleOk()}
                onCancel={()=>this.handleCancel()}
            >
                <div style={{height:300,overflow:"auto",margin:20}}>
<<<<<<< HEAD
                    <RadioGroup style={{ width: '100%' }}  onChange={(e)=>this.onChange(e)} defaultValue=''>
                        <Col>
                            {
                                this.state.data.map((value,index)=>{
                                        return (
                                            <Row key={index} span={8}><Radio value={value.file_name}>{value.file_name}</Radio></Row>
                                        )
                                    })
                            }
                            {/*<Row span={8}><Radio value="B">人物表情图片.zip</Radio></Row>*/}
=======
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
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
                        </Col>
                    </RadioGroup>
                </div>
            </Modal>
        )
    }
}
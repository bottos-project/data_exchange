import React,{PureComponent} from 'react'
import { Radio, Row, Col, Modal, Button, message } from 'antd';
import BTFetch from "../utils/BTFetch";
import {getAccount} from "../tools/localStore";
import {Link} from 'react-router'
const RadioGroup = Radio.Group;
const getUrl = async(reqUrl,params)=>{
    return await BTFetch(reqUrl,'POST',params)
};
export default class BTAssetList extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            value:'',
            type:'',
            file_hash:'',
            exampledata:[],
            getRealUrl:'',
            getExampleUrl:'',
            username:'',
        }
    }
   async handleOk(){
        this.setState({
            visible:false,
            username:''
        });

        //判断是asset还是assetTemp
        let callBackData = {};
        if(this.state.type=='asset'){
            let filename={
                userName:getAccount().username,
                fileName:this.state.value
            };
            let url= await getUrl('/asset/getDownLoadURL',filename);
            if(url.code==1){
                this.setState({
                    getRealUrl:url.data,
                })
            }
            callBackData = {
                type:'asset',
                value:this.state.value,
                hash:this.state.file_hash,
                getRealUrl:this.state.getRealUrl,
            };
        }else if(this.state.type == 'assetTemp'){
            let filename1={
                userName:getAccount().username,
                fileName:this.state.value
            };
            let url= await getUrl('/asset/getDownLoadURL',filename1);
            if(url.code==1){
                this.setState({
                    getExampleUrl:url.data,
                })
            }
            callBackData = {
                type:'assetTemp',
                value:this.state.value,
                hash:this.state.file_hash,
                getExampleUrl:this.state.getExampleUrl,
            };
        }else{
            callBackData = {
                type:'other',
                value:this.state.value,
                hash:this.state.file_hash
            }
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
        this.setState({
            value:e.target.value.split(',')[0],
            file_hash:e.target.value.split(',')[1],
        });
    }

    componentDidMount(){
        if(getAccount()){
            this.setState({
                username:getAccount().username
            })
        }
       /* let username1 = ''
        if(window.localStorage.account_info!=undefined){
            username1 = JSON.parse(window.localStorage.account_info).username;
            this.setState({
                username:username1
            })
            console.log(this.state.username)

        }*/

        /*let param={
            userName:getAccount().username,
            random:Math.ceil(Math.random()*100),
            signature:'0xxxx'
        };
        BTFetch('/asset/queryUploadedData','post',param)
            .then(res=>{
                if(res.code==0){
                    if(res.data.rowCount==0){
                        message.warning(window.localeInfo["Header.ThereIsNoFileResourceSetForTheTimeBeing"]);
                        return;
                    }
                    this.setState({
                        exampledata:res.data.row,
                    })
                    console.log(this.state.exampledata)
                }else{
                    message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
                    return;
                }
            })
            .catch(error=>{
                message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
            })*/
    }
    file(){
        this.setState({
            visible:false,
        });
    }
    render(){
        // this.setState({data:this.props.examplefile});
        const data=this.props.newdata||[];
        // console.log(this.props.newdata);
        return(
            <Modal visible={this.state.visible}
                onOk={()=>this.handleOk()}
                onCancel={()=>this.handleCancel()}
            >
                <div style={{height:300,overflow:"auto",margin:20}}>
                    <RadioGroup style={{ width: '100%' }}  onChange={(e)=>this.onChange(e)} defaultValue=''>
                        <Col>
                            {
                                data.map((value,index)=>{
                                        return (
                                            <Row key={index} span={8}><Radio value={value.file_name+','+value.file_hash}>{value.file_name}</Radio></Row>
                                        )
                                    })
                            }
                            {/*<Row span={8}><Radio value="B">人物表情图片.zip</Radio></Row>*/}
                        </Col>
                    </RadioGroup>
                    {/*<Button  onClick={()=>this.file()}><Link to='/profile/asset'>上传资源文件</Link></Button>*/}
                </div>
            </Modal>
        )
    }
}

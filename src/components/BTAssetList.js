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
      // console.log('radio checked', e.target.value);
      let index = e.target.value
      let fileInfo = this.props.newdata[index]
        this.setState({
            value: fileInfo.file_name,
            file_hash: fileInfo.file_hash,
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

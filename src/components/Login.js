<<<<<<< HEAD
import React,{PureComponent} from 'react'
import {Modal,Input,Button,Upload,Icon,message} from 'antd'
import path from 'path'
import BTCryptTool from '../tools/BTCryptTool'
import BTFetch from '../utils/BTFetch';
import {setAccount,getAccount,isLogin} from '../tools/localStore'
import BTIPcRenderer from '../tools/BTIpcRenderer'
import {importFile} from '../utils/BTUtil'
import ecc from 'eosjs-ecc'
const Buffer = require('buffer').Buffer;
=======
// import React,{PureComponent} from 'react'
// import {Modal,Form, Icon, Input, Button} from 'antd'
// const FormItem = Form.Item;
// import './styles.less'

// const formItemLayout = {
//     labelCol: {
//         xs: { span: 24 },
//         sm: { span: 5 },
//     },
//     wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 18 },
//     },
// };
// function ajax(url,method,data){
//     let myHeaders=new Headers();
//     myHeaders.append('Content-Type','application/json');
//     myHeaders.append('Accept','applicate/json');
//     let request=new Request(url,
//         {
//             method:method||'post',
//             mode:'no-cors',
//             body:JSON.stringify(data),
//             headers:myHeaders
//         });
//     return request;
// }
// export default class IsLogin extends PureComponent{
//     constructor(props){
//         super(props);
//         this.state={
//             visible:false,
//             username:'',
//             password:'',
//             code:'',
//             error:'',
//             img:'http://47.88.228.233:8080/bottosapp-0.0.1-SNAPSHOT/getSysManageLoginCode?time='+new Date()
//         }
//     }

//     user(e){
//         // this.refs.input.focus();
//         this.setState({
//             username:e.target.value
//         })
//     }
//     password(e){
//         this.setState({
//             password:e.target.value
//         })
//     }
//     code(e){
//         this.setState({
//             code:e.target.value
//         })
//     }
//     handleOk(){
//         if( this.state.username===''){
//             this.refs.input.focus();
//             this.setState({
//                error:'请输入用户名'
//             });
//             return
//         }
//         if( this.state.password===''){
//             this.refs.password.focus();
//             this.setState({
//                 error:'请输入密码'
//             });
//             return
//         }
//         if( this.state.code===''){
//             this.refs.code.focus();
//             this.setState({
//                 error:'请输入验证码'
//             });
//             return
//         }
//         this.setState({error:''});
//         console.log(this.state.username,this.state.password,this.state.code);
//         fetch(
//             ajax('http://10.104.14.169:8080/bottosapp-0.0.1-SNAPSHOT/user/login?random='+Math.round(Math.random()*100),'post',{
//                 "name": this.state.username,
//                 "passwd": this.state.username,
//                 "verificationCode": this.state.code
//             })
//         )
//             .then(response=>response.json())
//             .then(result=>{
//                 console.log(result)
//             })
//             .catch(error=>{
//                 console.log(error)
//             })
//     }
//     componentDidMount(){

//     }
//     handleCancel(){
//         this.setState({
//             visible:false
//         })
//     }
//     flushValidateCode(){
//         this.setState({
//             img:'http://47.88.228.233:8080/bottosapp-0.0.1-SNAPSHOT/getSysManageLoginCode?time='+new Date()
//         })
//     }
//     render(){
//         return (<Modal visible={this.state.visible}
//                       onOk={()=>this.handleOk()}
//                       onCancel={()=>this.handleCancel()}
//                        title='登录'
//                        okText='登录'
//                        cancelText='取消'
//                        maskClosable='false'
//                  >
//                 <Form>
//                     {/*<header>登录</header>*/}
//                     <FormItem
//                         {...formItemLayout}
//                         label="用户名"
//                     >
//                         <Input placeholder="请输入用户名" ref='input' value={this.state.username} onChange={(e)=>this.user(e)} id="error" />
//                     </FormItem>

//                     <FormItem
//                         {...formItemLayout}
//                         label="密码"
//                     >
//                         <Input placeholder="请输入密码"  type='password' ref='password' value={this.state.password} onChange={(e)=>this.password(e)} id="error1" />
//                     </FormItem>
//                     <FormItem
//                         {...formItemLayout}
//                         label="验证码"
//                         style={{margin:0}}
//                         className='mycode'
//                     >
//                         <Input style={{width:'80%',}} placeholder="请输入验证码" type='' ref='code' value={this.state.code} onChange={(e)=>this.code(e)} id="error2" />
//                         <img className="img1" ref='img' id="codeValidateImg" onClick={(e)=>this.flushValidateCode(e)} src={this.state.img} />
//                     </FormItem>
//                     <p className='error'>{this.state.error}</p>
//                 </Form>
//         </Modal>)
//     }
// }



import React,{PureComponent} from 'react'
import {Modal,Input,Button,Upload,Icon} from 'antd'
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471

export default class Login extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
<<<<<<< HEAD
            visible:false,
            password:'',
            keyStore:'',
            hasKeystore:false
        }
    }

    async onHandleUnlock(){
        console.log('onHandleUnlock')
        if(this.state.password == ''){
            message.error('请输入密码')
            return
        }

        let blockInfo = await this.getBlockInfo();
        let data = await this.getDataInfo()
        let keyStoreResult = BTIPcRenderer.getKeyStore('keystore');
        if(keyStoreResult.error){
            message.error('请先导入keyStore文件')
            return;
        }
        let keyStore = keyStoreResult.result;

        let keyStoreObj = JSON.parse(keyStore)
        // 用密码解密keyStore
        try{
            let decryptoStr = BTCryptTool.aesDecrypto(keyStoreObj,this.state.password);
            let decryptoData = JSON.parse(decryptoStr);
            if(decryptoData.code!='0'){
                message.error('密码错误，请重新输入密码')
                return;
            }
            
            let url = '/user/login'
    
            let params = {
                // blockInfo,
                // data
            }
    
            BTFetch(url,'POST',params)
            .then(response=>{
                if(response && response.code=='0'){
                    message.success('登录成功')
                    let accountInfo = {
                        username:decryptoData.account_name,
                        token:response.token
                    }
                    setAccount(accountInfo)
                    this.setState({
                        visible:false,
                        password:''
                    })

                    this.props.onHandleLogin(true)
                }else{
                    message.error('登录失败')
                }
            })
        }catch(error){
            message.error('密码错误，请重新输入密码')
        } 
    }

    // 获取区块信息
    async getBlockInfo(){
        let reqUrl = '/user/GetBlockInfo'
        return await BTFetch(reqUrl,'GET')
    }

    // 获取data信息
    async getDataInfo(){
        let reqUrl = '/user/GetBin'
        let params = {
            // username:'btd352'
        }
        return await BTFetch(reqUrl,'POST')
=======
            visible:false
        }
    }

    onHandleUnlock(){
        alert("onHandleUnlock")
    }

    onHandleUploadKeystore(){
        alert("onHandleUploadKeystore")
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
    }

    closeModal(){
        this.setState({
<<<<<<< HEAD
            visible:false,
            password:''
        })
    }

    importKeyStore(){
        let keyStore = BTIPcRenderer.ipcImportFile()
        BTIPcRenderer.setKeyStore('keystore',keyStore)
    }

=======
            visible:false
        })
    }

>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
    render(){
        return(
            <Modal 
                visible={this.state.visible}
                footer={null}
                onCancel={()=>this.closeModal()}
            >
                <div className="marginRight">
                    <div className="container row">
<<<<<<< HEAD
                       <Input type="password" placeholder="请输入密码" className="marginRight" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/> 
                        <Button type="danger" onClick={()=>this.onHandleUnlock()}>解锁</Button>
                    </div>
                    {
                        this.state.hasKeystore ? <div></div> : (<div style={{marginTop:20}}><Button onClick={()=>this.importKeyStore()}>导入keystore文件</Button></div>)
                    }
=======
                        <Input placeholder="请输入密码" className="marginRight"/> 
                        <Button type="danger" onClick={()=>this.onHandleUnlock()}>解锁</Button>
                    </div>
                    <div className="marginTop">
                        <Upload>
                            <Button>
                            <Icon type="upload" /> 上传Key-Store
                            </Button>
                        </Upload>
                        {/* <Button type="primary" onClick={()=>{this.onHandleUploadKeystore()}}>上传key-store</Button> */}
                    </div>
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
                </div>
            </Modal>
        )
    }
}
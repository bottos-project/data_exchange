import React,{PureComponent} from 'react'
import {Button} from 'antd'
import BTLogin from './Login'
import { FormattedMessage} from 'react-intl';
import messages from "../locales/messages";
const HeaderMessages = messages.Header;
export default class BTUnlogin extends PureComponent{
    constructor(props){
        super(props)
    }

    onHandleLogin(){
        this.isLoginShow.setState({
            visible:true
        })
    }

    render(){
        return(
            <div className='container center column'>
                    <div>
                        <img style={{width:200,height:200}}  src="./img/unloginLogo.png" alt=""/>
                    </div>
                    <div style={{marginTop:10,marginBottom:20}}>
                        <FormattedMessage {...HeaderMessages.PleaseLogInFirst}/>
                    </div>
                    {/* <div className="flex">
                        <Button type="denger" onClick={()=>{this.onHandleLogin()}}>立即登录</Button>
                    </div> */}
            </div>
        )
    }
}
import React,{PureComponent} from 'react'
import './style.less'

export default class BTHeader extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="headerStyle">
                <div className="logoStyle">Logo</div>
                <div className="loginBtnStyle">
                    <div style={{backgroundColor:'green',padding:15,borderRadius:10}}>发布需求</div>
                    <div style={{width:10}}></div>
                    <div>登录/注册</div>
                </div>
            </div>
        )
    }
}
import React,{PureComponent} from 'react'
import './style.less'

import {bindActionCreators} from 'redux'
import * as headerActions from '../redux/actions/HeaderAction'
import {connect} from 'react-redux'
import {Button,Modal} from 'antd'
import BTRowMenu from '../components/BTRowMenu'

class BTHeader extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:true
        }
    }

    componentDidMount(){
        this.hidLoginView()
    }

    onLoginHandler(){
        this.showLoginView()
    }

    showLoginView(){
        this.props.headerActions.showLoginView({
            isShow:true
        })
    }

    hidLoginView(){
        this.props.headerActions.showLoginView({
            isShow:false
        })
    }

    handleOk(){
        this.props.headerActions.showLoginView({
            isShow:false
        })
    }

    handleCancel(e){
        this.props.headerActions.showLoginView({
            isShow:false
        })
    }

    render(){
        return(
            <div className="headerStyle">
                <Modal
                    title="Basic Modal"
                    visible={this.props.headerState.isShow}
                    onOk={()=>this.handleOk()}
                    onCancel={()=>this.handleCancel()}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

                <div className="logoMenuStyle">
                    <div className="logoStyle">BOTTOS</div>
                </div>
                <div className="loginBtnStyle">
                    <div style={{backgroundColor:'green',padding:10,borderRadius:10}}>发布需求</div>
                    <div style={{width:10}}></div>
                    <div>
                        <Button onClick={()=>this.onLoginHandler()}>登录</Button>
                        <Button>注册</Button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        headerState:state.headerState
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        headerActions:bindActionCreators(headerActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BTHeader)
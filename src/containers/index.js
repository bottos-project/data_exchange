import React,{PureComponent} from 'react'
import BTHeader from '../components/BTHeader'
import BTMenu from '../components/BTMenu'
import * as homeActions from '../redux/actions/HomeAction'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button} from 'antd'
import './styles.less'

// 获取package.json

const pkg = require('../../package.json')

 
class App extends PureComponent{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        let storage = window.localStorage;
        let locale = storage.getItem('locale');
        this.props.homeActions.setLocale({headerState:{locale:locale}})
    }

    setLocale(){
        let storage = window.localStorage;
        let locale = storage.getItem('locale');
        if(locale == 'en-US'){
            storage.setItem('locale','zh-CN')
            this.props.homeActions.setLocale({headerState:{locale:'zh-CN'}})
        }else{
            storage.setItem('locale','en-US')
            this.props.homeActions.setLocale({headerState:{locale:'en-US'}})
        }
    }

    render(){
        let homeState = this.props.homeState
        let headerState = homeState.headerState
        return(
            <div className="container column">
               {/* <div className="header"> */}
                    <BTHeader setLocale={()=>this.setLocale()} {...headerState}/>
               {/* </div> */}
               <div className="container content">

                   <div className="menu" style={{position: 'relative'}}>
                    <BTMenu/>
                    <div style={{position: 'absolute', bottom: 0, marginLeft: 20}}>
                      版本号：{pkg.version}
                      <br />
                      发布日期：{pkg.publishDate}
                    </div>
                   </div>

                   <div className="container contentbody">
                    {this.props.children}
                   </div>
               </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        homeState:state.homeState
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        homeActions:bindActionCreators(homeActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

import React,{PureComponent} from 'react'
import BTHeader from '../components/BTHeader'
import BTMenu from '../components/BTMenu'
import BTRowMenu from '../components/BTRowMenu'

import './styles.less'

export default class App extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container column">
               <div className="header">
                    <BTHeader/>
               </div>
               <div className="container content">
                   <div className="menu">
                    <BTMenu/>
                   </div>
                   <div className="container contentbody">
                    {this.props.children}
                   </div>
               </div>
            </div>
        )
    }
}

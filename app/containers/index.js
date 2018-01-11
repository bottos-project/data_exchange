import React,{PureComponent} from 'react'
import BTHeader from '../components/BTHeader'
import BTMenu from '../components/BTMenu'

// import './styles.less'

export default class App extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container">
               <div className="headerStyle">
                    <BTHeader/>
               </div>
               <div className="contentStyle">
                   <div className="menuStyle">
                    <BTMenu/>
                   </div>
                   <div className="content">
                    {this.props.children}
                   </div>
               </div>
            </div>
        )
    }
}

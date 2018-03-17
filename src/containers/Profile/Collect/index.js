import React,{PureComponent} from 'react'
import BTList from '../../../components/BTList'
import CollectHeader from "./collectHeader";


export default class BTCollect extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
                <div style={{width:'100%'}}>
                    <CollectHeader/>
                    <BTList/>
                </div>
        )
    }
}
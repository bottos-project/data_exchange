import React,{PureComponent} from 'react'
import BTList from '../../../components/BTList'


export default class BTCollect extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <BTList/>
            </div>
        )
    }
}
import React,{PureComponent} from 'react'

import { Table } from 'antd'

export default class BTTable extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Table style={{flex:1}} {...this.props}/>
        )
    }
}
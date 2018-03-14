import React,{PureComponent} from 'react'

import {List} from 'antd'

const dataSource = [
    {
        accountName:'BTO'
    }
]

export default class BTAccountList extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <List
                    dataSource={dataSource}
                    renderItem={(item)=>{
                        return <BTAccountListCell/>
                    }}
                />
            </div>
        )
    }
}


class BTAccountListCell extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container accountItem">
                <div className="flex accountLeft">
                    <div>
                        <span className="font25 colorTitle">{'BTO'}</span>
                        <span>可用现金</span>
                    </div>
                    <div className="font25 colorRed">{500}</div>
                </div>
                <div>
                    <Button className="marginRight" type="primary" onClick={()=>this.changePwd(this.props.accountName)}>修改密码</Button>
                    <Button type="primary" onClick={()=>this.exportAccount(this.props.accountName)}>导出账号</Button>
                </div>
            </div>
        )
    }
}
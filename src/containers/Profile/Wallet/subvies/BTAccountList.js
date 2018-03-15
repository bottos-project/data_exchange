import React,{PureComponent} from 'react'

import {List,Button} from 'antd'
import BTFetch from '../../../../utils/BTFetch';

const dataSource = [
    {
        accountName:'BTO'
    }
]

export default class BTAccountList extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            accoutList:[]
        }
    }
    componentDidMount(){
        let reqUrl = '/user/getAccount'
        let params = {
            username:'buyertest'
        }

        BTFetch(reqUrl,'POST',params).then(response=>{
            if(response && response.code=="1"){
                let data = response.data;
                let accoutList = [
                    {
                        accountName:'BTO',
                        token:data
                    }
                ]

                this.setState({
                    accoutList
                })
            }
        })
    }

    render(){
        return(
            <div className="container">
                <List
                    dataSource={this.state.accoutList}
                    style={{flex:1}}
                    renderItem={(item)=>{
                        return <BTAccountListCell {...item}/>
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
        let props = this.props;
        return(
            <div className="container">
                <div className="container accountItem" >
                    <div className="flex accountLeft">
                        <div>
                            <span className="font25 colorTitle">{props.accountName}</span>
                            <span>可用现金</span>
                        </div>
                        <div className="font25 colorRed">{props.token}</div>
                    </div>
                    <div>
                        <Button className="marginRight" type="primary" onClick={()=>this.changePwd(this.props.accountName)}>修改密码</Button>
                        <Button type="primary" onClick={()=>this.exportAccount(this.props.accountName)}>导出账号</Button>
                    </div>
                </div>
            </div>
        )
    }
}
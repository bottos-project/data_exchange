import React,{PureComponent} from 'react'
import {List} from 'antd'
import BTWalletItem from './BTWalletItem'

export default class BTWalletList extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            walletList:[]
        }
    }

    componentDidMount(){
        console.log('componentDidMount')
        let params = this.props.location.query
        const walletList = []

       for(let index in params){
           let item = params[index]
           walletList.push(item)
       }
       
        // this.setState({
        //     walletList:walletList
        // })
    }

    render(){
        let params = this.props.location.query
        let walletList = []

       for(let index in params){
           let item = params[index]
           walletList.push(item)
       }
        return(
            <div className="flex container column" style={{height:200}}>
                {/* <BTAccountListHeader/> */}
                <div>
                <List
                    style={{flex:1}}
                    dataSource={walletList}
                        renderItem = {(item,index)=>{
                            let newItem = {
                                accountName:item.slice(0,-9)
                            }
                            return(
                                <BTWalletItem {...newItem}/>
                            )
                        }}
                    />
                </div>
            </div>
        )
    }
}
import React,{PureComponent} from 'react'
import {List} from 'antd'
import BTWalletItem from './BTWalletItem'
import BTAccountListHeader from './BTAccountListHeader'

export default class BTWalletList extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            walletList:[]
        }
    }

    componentDidMount(){
        let walletList = this.getWalletList()
        this.setState({
            walletList
        })
    }

    getWalletList(){
        let params = this.props.location.query
        const walletList = []

       for (let index in params) {
           let item = params[index]
           let extern = item.slice(item.length-9,item.length)
           if (extern=='.keystore') {
             walletList.push(item)
           }
       }
       return walletList;
    }

    render() {
      if ( React.isValidElement(this.props.children) ) {
        return <div className='route-children-bg' style={{flexGrow: 1}}>{this.props.children}</div>
      }
        let walletList = this.getWalletList()
        return (
            <div className="flex container column">
              <BTAccountListHeader />
              <List style={{flex:1}}
                dataSource={walletList}
                renderItem = {(item, index) => {
                  let newItem = {
                    accountName:item.slice(0,-9)
                  }
                  return(
                    <BTWalletItem {...newItem} />
                  )
                }}
              />
            </div>
        )
    }
}

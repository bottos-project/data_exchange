/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
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

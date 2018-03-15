import React,{PureComponent} from 'react'
import {Table,Icon} from 'antd'
import Walletall from './walletall'
import '../styles.less'
import * as BTUtil from '../../../../utils/BTUtil'
import BTIpcRenderer from "../../../../tools/BTIpcRenderer";

const lists=[{
    'id':'1',
    'account':'Lidy',
    'address':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'total':500
},{
    'id':'2',
    'account':'Haoyu',
    'address':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'total':900
},{
    'id':'3',
    'account':'Yugedaren',
    'address':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'total':600
}]
export default class Wallet extends PureComponent{
    constructor(props){
        super(props);
        // this.handleClick1=this.handleClick1.bind(this);
        this.state={
            lists:lists,
            all_lists:[]
        };
    }

    handleClick1(e){
        // console.log(e)
    }
    export_file(e){
        let selectedFile = document.getElementById("files").files[0];//获取读取的File对象
        if(!selectedFile) return;
        let name = selectedFile.name;//读取选中文件的文件名
        let size = selectedFile.size;//读取选中文件的大小
        let reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(selectedFile);//读取文件的内容
        reader.onload = function(){
            let rs = this.result
            console.log(this.result)
            // callback(rs)
        }
    }
    render(){
        // let lists=this.props.account
        let all_lists=[
            {
                account_name:'btd121',
                money:this.props.acount
            }
        ];
        /*all_lists.push({ account_name:'btd121',
            money:this.props.acount});*/
        return(
               <div className='wallet'>
                   <header>总额 {this.props.acount}<span className='file'>导入钱包<input onChange={(e)=>this.export_file(e)} type="file" name="" id="files" value=""/></span></header>
                   <ul className='wallet_data'>
                       {

                           all_lists.map((data,index)=>{
                               return(
                                   <li key={index}>
                                       <span className='account'>{data.account_name}</span>
                                       <span className='address'>{data.money}</span>
                                       <span className='total'>导出</span>
                                   </li>
                               )
                           })
                       }
                       {/*{
                           this.state.lists.map(function(res){
                               return (
                                   <li key={res.id}>
                                       <span className='account'>{res.account}</span>
                                       <span className='address'>{res.address}</span>
                                       <span className='total'>{res.total}</span>
                                   </li>
                               )
                           })
                       }*/}
                   </ul>
               </div>
        )
    }
}
import React,{PureComponent} from 'react'
import Transfer from "./tranfer";
import Wallet from './wallet'
import { Pagination } from 'antd';
import '../styles.less'
import History from "./history";
import BTFetch from '../../../../utils/BTFetch'
export default class Walletall extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            acount:0,
            history:[]
        }
    }
    componentDidMount(){
        let param={
            username:'btd121'
        }
        BTFetch('/user/getAccount','POST',(param),{
            service:'service',
        }).then(res=>{
            console.log(res.data);
            if(res.code == 1){
                this.setState({
                    acount:res.data
                })
            }

        });

    }
    render(){
        return (
            <div className='all'>
                <div className='wallet_all'>
                    <Transfer />
                    <Wallet acount={this.state.acount} />
                </div>
                <History />
            </div>


        )
    }
}

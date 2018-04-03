import React,{PureComponent} from 'react'
import BTAssetList from './BTAssetList'
import {Link} from 'react-router'
import {message} from 'antd'
import BTFetch from '../../../utils/BTFetch'
import {getBlockInfo,getDataInfo} from '../../../utils/BTCommonApi'
import './styles.less'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {Icon} from 'antd'
import {getAccount} from "../../../tools/localStore";

const DemandMessages = messages.Demand;


const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
export default class BTRequireCell extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            exampledata:[],
            username:'',
            token:'',
        }
    }
    componentDidMount(){

    }
    commitAsset(){
        if(getAccount()){

        }else{
            message.error(window.localeInfo["Demand.PleaseLogInFirst"])
            return ;
        }
        let param={
            userName:getAccount().username||'',
            random:Math.ceil(Math.random()*100),
            signature:'0xxxx'
        };
        BTFetch('/asset/query','post',param)
            .then(res=>{
                if(res.code==0){
                    if(res.data.rowCount==0){
                        message.warning(window.localeInfo["Demand.ThereIsNoDataForTheTimeBeing"])
                        return;
                    };
                    this.setState({
                        exampledata:res.data.row,
                    });
                }else{
                    message.warning(window.localeInfo["Demand.FailedToGetTheFileResourceSet"])
                    return;
                }
            })
            .catch(error=>{
                message.warning(window.localeInfo["Demand.FailedToGetTheFileResourceSet"])
            })
        this.assetListModal.setState({
            visible:true
        });

    }

   async handleFile(fileInfo){
        console.log(fileInfo);
        let asset=fileInfo.value;
        if(!fileInfo.value){
            message.error(window.localeInfo["Demand.ThereIsNoAssetForTheTimeBeing"])
            return ;
        };
        let param={
            "code":"datadealmng",
            "action":"datapresale",
            "args":{
                "data_presale_id":window.uuid,
                "basic_info":{
                    "user_name":this.state.username,
                    "session_id":this.state.token,
                    "asset_id":fileInfo.value,
                    "asset_name":"assetidtest123",
                    "data_req_id":this.props.requirement_id,
                    "data_req_name":"reqtest123",
                    "consumer":"buyer",
                    "random_num":Math.ceil(Math.random()*100),
                    "signature":"sigtest"
                }
            }
        };
        let block=await getBlockInfo();
        let getDate=await getDataInfo(param);
        if(block.code!=0||getDate.code!=0){
            message.error(window.localeInfo["Demand.FailedToGetTheBlockMessages"])
            return;
        }
        let data={
            "ref_block_num": block.data.ref_block_num,
            "ref_block_prefix": block.data.ref_block_prefix,
            "expiration": block.data.expiration,
            "scope": ["datadealmng"],
            "read_scope": [],
            "messages": [{
                "code": "datadealmng",
                "type": "datapresale",
                "authorization": [],
                "data": getDate.data.bin
            }],
            "signatures": []
        };
        BTFetch('/user/AddNotice','post',data)
            .then(res=>{
                if(res.code==1&&res.data!='null'){
                    message.success(window.localeInfo["Demand.SuccessfulPromote"])
                }else{
                    message.error(window.localeInfo["Demand.FailedPromote"])
                }
            })
    }
    render(){
        let data = this.props;
        let linkto = this.props.linkto || '/';
        let path = {
            pathname:linkto,
            state:data
        }
        let time=new Date((data.expire_time)*1000).toLocaleString();
        return (
                <div className="assetList">
                    <BTAssetList exampledata={this.state.exampledata} ref={(ref)=>this.assetListModal = ref} handleFile={(fileInfo)=>this.handleFile(fileInfo)}/>
                    <div>
                        <h4 className="headAndShop"><Link to={path}>{data.requirement_name.length < 27 ? data.requirement_name:data.requirement_name.substring(0,27)+'...'}</Link></h4>
                        <p>
                            <FormattedMessage {...DemandMessages.Publisher}/>
                            {data.username}
                        </p>
                        <span>
                            <FormattedMessage {...DemandMessages.ExpireTime}/>
                            {/*{data.expire_time}*/}
                            {time}
                        </span>
                        <div>
                            <FormattedMessage {...DemandMessages.ExpectedPrice}/>
                            <span>{data.price}</span>
                            <img src="./img/token.png" width='18' style={{paddingLeft:'4px'}} alt=""/>
                        </div>
                    </div>
                </div>
        )
    }
}
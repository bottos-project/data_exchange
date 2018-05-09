import BTFetch from "../../../utils/BTFetch";
import {getBlockInfo, getDataInfo} from "../../../utils/BTCommonApi";
import React,{PureComponent} from 'react'
import { Carousel, Button, Tag, Input, message } from 'antd';
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import BTAssetList from './BTAssetList'
import './styles.less'
import {getAccount} from "../../../tools/localStore";
import uuid from 'node-uuid'
import CloseBack from '@/components/CloseBack'

const DemandMessages = messages.Demand;
const { TextArea } = Input;


export default class BTDemanDetail extends PureComponent{
  constructor(props){
      super(props)
      this.state={
          exampledata:[],
          username:''
      }
  }
  commitAsset(){
    message.destroy();
    if(!getAccount()){
        message.warning(window.localeInfo["Demand.PleaseLogInFirst"])
        return ;
    }
    this.assetListModal.setState({
        visible:true
    })
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
              })
          }else{
              message.warning(window.localeInfo["Demand.FailedToGetTheFileResourceSet"])
              return;
          }
      })
      .catch(error=>{
          message.warning(window.localeInfo["Demand.FailedToGetTheFileResourceSet"])
      })
  }

  async handleFile(fileInfo) {
    message.destroy();
    let asset=fileInfo.value;
    if(!fileInfo.value){
        message.error(window.localeInfo["Demand.ThereIsNoAssetForTheTimeBeing"])
        return ;
    };

    let param={
        "code":"datadealmng",
        "action":"datapresale",
        "args":{
            "data_presale_id":uuid.v1(),
            "basic_info":{
                "user_name":this.props.location.query.username,
                "session_id":'',
                "asset_id":fileInfo.value,
                "asset_name":fileInfo.name,
                "data_req_id":this.props.location.query.requirement_id,
                "data_req_name":this.props.location.query.requirement_name,
                "consumer":getAccount().username,
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
    BTFetch('/user/AddNotice','post',data).then(res=>{
        if(res.code==1&&res.data!='null'){
            message.success(window.localeInfo["Demand.SuccessfulPromote"])
        }else{
            message.error(window.localeInfo["Demand.FailedPromote"])
        }
    })
  }

  componentDidMount(){
    console.log('this.props.location', this.props.location);
  }

  render() {
      let data = this.props.location.query||[];
      let date=(new Date((data.expire_time)*1000)).toLocaleDateString()
      return (
          <div className='route-children-container route-children-bg'>
            <CloseBack />

            <div className="demandDetailBox">
                <BTAssetList exampledata={this.state.exampledata} ref={(ref)=>this.assetListModal = ref} handleFile={(fileInfo)=>this.handleFile(fileInfo)}/>
                <h2 className='route-children-container-title'>
                    <FormattedMessage {...DemandMessages.DataDetails}/>
                </h2>
                <div className="mainData">
                    <h1>{data.requirement_name}</h1>
                    <p>
                        <FormattedMessage {...DemandMessages.Publisher}/>
                        {data.username}
                    </p>
                    {/*<p>
                        <span>
                         <FormattedMessage {...DemandMessages.AssetType}/>
                        </span>
                        {data.feature_tag}
                    </p>*/}
                    <p>
                        <span>
                            <FormattedMessage {...DemandMessages.ExpectedPrice}/>
                        </span>
                        {data.price/Math.pow(10,10)}
                        <img src="./img/token.png" width='18' style={{paddingLeft:'4px'}} alt=""/>
                    </p>
                    <p>
                        <span>
                            <FormattedMessage {...DemandMessages.ExpireTime}/>
                        </span>
                        {date}
                    </p>
                </div>
                    <ul>
                       {/* <li>
                            <Button onClick={()=>this.download(data.sample_path)} type="danger">
                                <FormattedMessage {...DemandMessages.DownLoadTheSample}/>
                            </Button>
                        </li>*/}
                        <li>
                            <Button type="primary" onClick={()=>this.commitAsset()}>
                                <FormattedMessage {...DemandMessages.ProvideTheAsset}/>
                            </Button>
                        </li>
                    </ul>
                <div className="dataDescription">
                  <span>
                    <FormattedMessage {...DemandMessages.DataDescription}/>
                  </span>
                  <TextArea readOnly rows={4} defaultValue={data.description} />
                </div>
            </div>
          </div>
      )
  }
}

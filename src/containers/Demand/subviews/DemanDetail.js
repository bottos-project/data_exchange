import BTFetch from "../../../utils/BTFetch";
import { getBlockInfo, getSignaturedParam, getSignaturedFetchParam } from "../../../utils/BTCommonApi";
import React,{PureComponent} from 'react'
import { Carousel, Button, Tag, Input, message } from 'antd';
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import BTAssetList from './BTAssetList'
import './styles.less'
import {getAccount} from "../../../tools/localStore";
import uuid from 'node-uuid'
import CloseBack from '@/components/CloseBack'
import { PackArraySize, PackStr16, PackUint32 } from '@/lib/msgpack/msgpack'

const DemandMessages = messages.Demand;
const { TextArea } = Input;


export default class BTDemanDetail extends PureComponent{
  constructor(props){
      super(props)
      this.state={
        exampledata: [{"asset_id": "filehashtest","asset_name": "assetnametest","description": "destest","expire_time": 345,"feature_tag":12345,"op_type":1,"price":888,"sample_hash":"hasttest","sample_path":"pathtest","storage_hash":"sthashtest","storage_path":"stpathtest","upload_date": 999}],
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
    let param = {
      ...getSignaturedParam(getAccount()),
      "pageSize": 10,
      "pageNum": 1,
    };
    BTFetch('/asset/queryMyAsset', 'post', param)
      .then(res => {
          if (res.code == 1) {
              if (res.data.row_count == 0) {
                  message.warning(window.localeInfo["Demand.ThereIsNoDataForTheTimeBeing"])
                  return;
              };
              this.setState({
                  exampledata:res.data.row,
              })
          } else {
              message.warning(window.localeInfo["Demand.FailedToGetTheFileResourceSet"])
              return;
          }
      })
      .catch(error => {
          message.warning(window.localeInfo["Demand.FailedToGetTheFileResourceSet"])
      })
  }

  async handleFile(asset_id) {
    message.destroy();

    if (!asset_id) {
        window.message.error(window.localeInfo["Demand.ThereIsNoAssetForTheTimeBeing"])
        return ;
    };

    // TODO: 改到这里了，明天继续改。。。。
    let username = getAccount().username

    let fileInfo = this.state.exampledata.find(ele => ele.asset_id == asset_id)

    let requirementInfo = this.props.location.query

    let originParam = {
      "dataPresaleId": window.uuid,
      "info": {
        "userName": username,
        "assetId": asset_id,
        "dataReqId": requirementInfo.requirement_id,
        "consumer": requirementInfo.username,
        "opType": 1,
      }
    }

    let b1 = PackArraySize(2)
    let b2 = PackStr16(originParam.dataPresaleId)

    let b3 = PackArraySize(5)

    let b4 = PackStr16(originParam.info.userName)
    let b5 = PackStr16(originParam.info.assetId)
    let b6 = PackStr16(originParam.info.dataReqId)
    let b7 = PackStr16(originParam.info.consumer)
    let b8 = PackUint32(originParam.info.opType)

    let param = [...b1,...b2,...b3,...b4,...b5,...b6,...b7,...b8]
    console.log('param', param);

    let blockInfo = await getBlockInfo()

    console.log('blockInfo', blockInfo);

    let privateKey = Buffer.from(getAccount().privateKey, 'hex')

    let fetchParam = {
        "version": 1,
        ...blockInfo,
        "sender": username,
        "contract": "datadealmng",
        "method": "presale",
        "param": param,
        "sig_alg": 1
    }

    fetchParam = getSignaturedFetchParam({fetchParam, privateKey})

    BTFetch('/asset/preSaleNotice', 'post', fetchParam).then(res => {
        if (res.code==1 && res.data != 'null') {
            window.message.success(window.localeInfo["Demand.SuccessfulPromote"])
        }else{
            window.message.error(window.localeInfo["Demand.FailedPromote"])
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

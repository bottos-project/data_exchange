import React,{PureComponent} from 'react'
import { Carousel, Button, Tag, Modal, Input } from 'antd';
import BTFetch from '../../../utils/BTFetch'
import { getBlockInfo, getSignaturedParam, getSignaturedFetchParam } from '../../../utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from '../../../tools/localStore'
import { getDateAndTime } from '@/utils/dateTimeFormat'

import CloseBack from '@/components/CloseBack'

import { PackArraySize, PackStr16 } from '@/lib/msgpack/msgpack'

import { keyMap } from '@/components/BTTypeSelect'

const AssetMessages = messages.Asset;
// 此处样式在Demand/subviews/styles.less中控制
const { TextArea } = Input;
const confirm = Modal.confirm;
// const username=JSON.parse(window.localStorage.account_info).username||'';
// const token=JSON.parse(window.localStorage.account_info).token||'';
export default class BTAssetDetail extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.location.query||[],
            username: '',
            token: '',
            getAssetType: '',
            visible: false
        }
    }
    handleCancel(e) {
        this.setState({
            visible: false,
        });
    }
    showModal(e) {
        this.setState({
            visible: true,
        });
    }
    async buySureAsset() {

      let originParam = {
      	"data_deal_id": window.uuid(),
      	"basic_info": {
      		"username": getAccount().username,
      		"assetId": this.state.data.asset_id
      	}
      }

      let b1 = PackArraySize(2)
      let b2 = PackStr16(originParam.data_deal_id)

      let b3 = PackArraySize(2)

      let b4 = PackStr16(originParam.basic_info.username)
      let b5 = PackStr16(originParam.basic_info.assetId)

      let param = [...b1,...b2,...b3,...b4,...b5]

      //获取区块信息
      let blockInfo = await getBlockInfo()

      let fetchParam = {
        "version": 1,
        ...blockInfo,
        "sender": getAccount().username,
        "contract": "datadealmng",
        "method": "buydata",
        "param": param,
        "sig_alg": 1
      }

      let privateKey = Buffer.from(getAccount().privateKey, 'hex')

      BTFetch('/exchange/buyAsset', 'post', getSignaturedFetchParam({fetchParam, privateKey}))
      .then(res=>{
          console.log(res);
          if(res.code == 1){
              window.message.success(window.localeInfo["Asset.SuccessfulPurchase"])
          }else if(res.code == 4001){
              message.warning(window.localeInfo["Asset.InsufficientBalance"])
          }else{
              window.message.error(window.localeInfo["Asset.FailedPurchase"])
          }
      }).catch(error=>{

      })
    }

    async handleOk(){
        this.setState({
            visible: false,
        });
        message.destroy();
        if (!getAccount()){
            message.warning(window.localeInfo["Asset.PleaseLogInFirst"])
            return;
        }
        if (this.state.data.username == getAccount().username) {
            message.warning(window.localeInfo["Asset.YouAreNotAllowedToBuyYourOwnAssets"])
            return;
        }
        //查询是否已购买资产
        // "asset_id":this.state.data.asset_id,

        await BTFetch('/user/QueryMyBuy','post', {
          ...getSignaturedParam(getAccount()),
          "page_size": 50,
        	"page_num": 1
        }).then(res => {
          // console.log('res.data', res.data);
          // if (res.code == 1 && res.data.rowCount >= 1) {
          //     message.warning(window.localeInfo["Asset.CannotPurchaseAgain"]);
          //     return;
          // } else {
             this.buySureAsset()
          // }

        }).catch(error => {
        });

    }
    download(index) {
        let a = document.createElement('a');
        // let url = res.data;
        let filename = '样例';
        a.href = index;
        a.download = filename;
        a.click();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props == nextProps){
            return;
        }
        // let data=this.props.location.query;
        // let asset_type=data.asset_type.substring(0,2);
        // switch (asset_type){
        //     case '11':this.setState({getAssetType:'Automatic Transmission'});break;
        //     case '12':this.setState({getAssetType:'Medical'});break;
        //     case '13':this.setState({getAssetType:'Finance'});break;
        //     case '14':this.setState({getAssetType:'Retail'});break;
        //     case '15':this.setState({getAssetType:'Security'});break;
        // }
        // console.log(asset_type)
    }

    render() {
        let data=this.props.location.query;
        let time=new Date((data.expire_time)*1000).toLocaleDateString();
        let tagsArr = data.feature_tag.split('-')
        let tags = tagsArr.map((tag, index) => <Tag key={index}>{tag}</Tag>)
        return (
          <div className='route-children-container route-children-bg'>
            <CloseBack />
            <div className="assetDetailBox">
                <h2 className='route-children-container-title'>
                    <FormattedMessage {...AssetMessages.DataDetails}/>
                </h2>
                <div className="mainData">
                    <h1>{data.asset_name}</h1>
                    <p>
                        <span>
                            <FormattedMessage {...AssetMessages.AssetID}/>
                        </span>
                        {data.asset_id}
                        </p>
                    <p>
                        <FormattedMessage {...AssetMessages.Publisher}/>
                        {data.username}
                    </p>

                    <p>
                        <span>
                            <FormattedMessage {...AssetMessages.AssetType}/>
                        </span>
                        {keyMap[data.asset_type]}
                    </p>
                    <p>
                        <span>
                            <FormattedMessage {...AssetMessages.ExpectedPrice}/>
                        </span>
                        {data.price / Math.pow(10, 8)}
                        <img src='./img/token.png' width='15' style={{marginLeft:6}} />
                    </p>
                    <p>
                      <FormattedMessage {...AssetMessages.ExpireTime}/>
                      {getDateAndTime(time)}
                    </p>
                    {/*<Tag color="magenta">{data.feature_tag1}</Tag>*/}
                    <div className="tag">
                        <FormattedMessage {...AssetMessages.FeatureTag}/>
                        {/*<FormattedMessage {...AssetMessages.ExpireTime}/>*/}
                        {tags}
                    </div>

                </div>
                <ul>
                    <li>
                        <Button onClick={()=>this.showModal()} type="primary" className="buyButton">
                            <FormattedMessage {...AssetMessages.BuyAssets}/>
                        </Button>
                    </li>
                    <li>
                        <Button onClick={()=>this.download(data.sample_path)} type="primary">
                            <FormattedMessage {...AssetMessages.DownLoadTheSample}/>
                        </Button>
                        <Modal
                            visible={this.state.visible}
                            onOk={(e)=>this.handleOk(e)}
                            onCancel={(e)=>this.handleCancel(e)}
                        >
                            <p>
                                <FormattedMessage {...AssetMessages.AreYouSureToBuyThisAsset}/>
                            </p>
                        </Modal>
                    </li>
                </ul>
                <div className="dataDescription">
                  <span>
                    <FormattedMessage {...AssetMessages.DataDescription}/>
                  </span>
                  <TextArea readOnly rows={4} defaultValue={data.description} />
                </div>
            </div>
          </div>
        )
    }
}

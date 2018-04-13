import React,{PureComponent} from 'react'
import { Carousel,Button,Tag,Modal} from 'antd';
import BTFetch from '../../../utils/BTFetch'
import {getBlockInfo,getDataInfo} from '../../../utils/BTCommonApi'
import {Input} from "antd/lib/index";
import {message} from "antd/lib/index";
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from '../../../tools/localStore'
import uuid from 'node-uuid'
const AssetMessages = messages.Asset;
// 此处样式在Demand/subviews/styles.less中控制
const { TextArea } = Input;
const confirm = Modal.confirm;
// const username=JSON.parse(window.localStorage.account_info).username||'';
// const token=JSON.parse(window.localStorage.account_info).token||'';
export default class BTAssetDetail extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            data:this.props.location.query||[],
            username:'',
            token:'',
            getAssetType:'',
            visible: false
        }
    }
    handleCancel (e){
        this.setState({
            visible: false,
        });
    }
    showModal(e) {
        this.setState({
            visible: true,
        });
    }
    async buySureAsset(){
        //获取区块信息
        let _block=(await getBlockInfo());
        if(_block.code != 0){
            message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
            return;
        }
        let block=_block.data;
        //获取data信息
        let data={
            "code":"datadealmng",
            "action":"datapurchase",
            "args":{
                "data_deal_id":uuid.v1(),
                "basic_info":{
                    "user_name":getAccount().username,
                    "session_id":getAccount().token,
                    "asset_id":this.state.data.asset_id,
                    "random_num":Math.ceil(Math.random()*100),
                    "signature":"0xxxxxxxx"
                }
            }
        };
        let _getDataBin=(await getDataInfo(data));
        if(_getDataBin.code!=0){
            message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
            return;
        }
        //数组排序
        let array=[
            "assetmng",
            getAccount().username,
            this.state.data.username,
            "datadealmng",
            "datafilemng"
        ].sort();
        let param={
            "ref_block_num": block.ref_block_num,
            "ref_block_prefix": block.ref_block_prefix,
            "expiration": block.expiration,
            "scope": array,
            "read_scope": [],
            "messages": [{
                "code": "datadealmng",
                "type": "datapurchase",
                "authorization": [],
                "data": _getDataBin.data.bin
            }],
            "signatures": []
        };
        BTFetch('/exchange/consumerBuy','post',param)
            .then(res=>{
                console.log(res);
                if(res.code == 1){
                    message.success(window.localeInfo["Asset.SuccessfulPurchase"])
                }else if(res.code == 4001){
                    message.warning(window.localeInfo["Asset.InsufficientBalance"])
                }else{
                    message.error(window.localeInfo["Asset.FailedPurchase"])
                }
            }).catch(error=>{

        })
    }
    async handleOk(){
        this.setState({
            visible: false,
        });
        message.destroy();
        if(!getAccount()){
            message.warning(window.localeInfo["Asset.PleaseLogInFirst"])
            return;
        }
        if(this.state.data.username == getAccount().username){
            message.warning(window.localeInfo["Asset.YouAreNotAllowedToBuyYourOwnAssets"])
            return;
        }
        //查询是否已购买资产
        let buysure={
            "username":getAccount().username,
            "random":Math.ceil(Math.random()*100),
            "signatures":'0XXXX',
            "asset_id":this.state.data.asset_id,
        };
        await BTFetch('/asset/GetUserPurchaseAssetList','post',buysure).then(res=>{
            if(res&&res.code==0){
                if(res.data.rowCount>=1){
                    message.warning(window.localeInfo["Asset.CannotPurchaseAgain"]);
                    return;
                }else{
                   this.buySureAsset()
                }
            }
        }).catch(error=>{
        });

    }
    download(index) {
        let a = document.createElement('a');
        // let url = res.data;
        let filename = '样例';
        a.href = index;
        a.download =filename;
        a.click();
    }
    componentWillMount(){
    }
    componentWillReceiveProps(nextProps){
        if(this.props==nextProps){
            return;
        }
        let data=this.props.location.query;
        let asset_type=data.asset_type.substring(0,2);
        switch (asset_type){
            case '11':this.setState({getAssetType:'Automatic Transmission'});break;
            case '12':this.setState({getAssetType:'Medical'});break;
            case '13':this.setState({getAssetType:'Finance'});break;
            case '14':this.setState({getAssetType:'Retail'});break;
            case '15':this.setState({getAssetType:'Security'});break;
        }
        console.log(asset_type)
    }
    render(){
        let data=this.props.location.query;
        let time=new Date((data.expire_time)*1000).toLocaleDateString();
        return(
            <div className="assetDetailBox">
                <h2>
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
                        {this.state.getAssetType}
                    </p>
                    <p>
                        <span>
                            <FormattedMessage {...AssetMessages.ExpectedPrice}/>
                        </span>
                        {data.price/Math.pow(10,10)}
                    </p>
                    <p>
                        <span>
                            <FormattedMessage {...AssetMessages.ExpireTime}/>
                        </span>
                        {/*{data.expire_time}*/}{time}
                        </p>
                    {/*<Tag color="magenta">{data.feature_tag1}</Tag>*/}
                    <div className="tag">
                         <span>
                             <FormattedMessage {...AssetMessages.FeatureTag}/>
                            {/*<FormattedMessage {...AssetMessages.ExpireTime}/>*/}
                        </span>
                        <Tag>{data.feature_tag1}</Tag>
                        <Tag>{data.feature_tag2}</Tag>
                        <Tag>{data.feature_tag3}</Tag>
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
                    <TextArea disabled rows={4}>{data.description}</TextArea>
                </div>
            </div>
        )
    }
}

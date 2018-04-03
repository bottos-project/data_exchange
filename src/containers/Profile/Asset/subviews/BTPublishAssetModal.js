import React,{PureComponent} from 'react'
import {Modal} from 'antd'
import {getAccount} from "../../../../tools/localStore";
// import BTUploadAsset from './BTUploadAsset'
// import messages from '../../../../locales/messages'
import {Icon, Radio,Select, message, Button,Input, DatePicker,Cascader  } from 'antd';
import BTIcon from '../../../../components/BTIcon'
import BTAssetList from '../../../../components/BTAssetList'
import "../styles.less"
import BTCryptTool from '../../../../tools/BTCryptTool'
import {getBlockInfo,getDataInfo} from '../../../../utils/BTCommonApi'
import BTFetch from "../../../../utils/BTFetch";
import {options} from '../../../../utils/option'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import moment from "moment"
const PersonalAssetMessages = messages.PersonalAsset;
const RangePicker = DatePicker.RangePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;


const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default class BTPublishAssetModal extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:false,
            value:1,
            title:'',
            number:'',
            description:'',
            tag1:'',
            tag2:'',
            tag3:'',
            dataAssetType:'',
            getFileNameTemp:'',
            getFileName:'',
            getExampleUrl:'',
            getRealUrl:'',
            expire_time:'',
            sample_hash:'',
            storage_hash:'',
            newdata:[],
            date11:'',
            cascader:'',
        }
    }
    disabledDate(current) {
        // Can not select days before today and today
        return current < moment().endOf('day');
    }
    onCancel(){
        this.setState({
            visible:false
        })
    }
    onChangeDataAssetType(dates){
        const datas=dates[0]+dates[1]+dates[2]+dates[3];
        this.setState({
            dataAssetType:datas,
            cascader:dates,
        });
    }
    commitAsset(type){
        message.destroy()

        this.assetListModal.setState({
            visible:true,
            type:type,
            // newdata:res.data.row,
        });
       /* this.setState({
            newdata:res.data.row
        })*/
        let param={
            userName:getAccount().username,
            random:Math.ceil(Math.random()*100),
            signature:'0xxxx'
        };
         BTFetch('/asset/queryUploadedData','post',param)
            .then(res=>{
                if(res.code==0){
                    if(res.data.rowCount==0){
                        message.warning(window.localeInfo["Header.ThereIsNoFileResourceSetForTheTimeBeing"]);
                        return;
                    }
                    // return res.data.row;
                    this.setState({
                        newdata:res.data.row
                    })
                }else{
                    message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
                    return;
                }
            })
            .catch(error=>{
                message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
            })

    }
   async beFetch(){
        let param={
            userName:getAccount().username,
            random:Math.ceil(Math.random()*100),
            signature:'0xxxx'
        };
      await BTFetch('/asset/queryUploadedData','post',param)
            .then(res=>{
                if(res.code==0){
                    if(res.data.rowCount==0){
                        message.warning(window.localeInfo["Header.ThereIsNoFileResourceSetForTheTimeBeing"]);
                        return;
                    }
                    // return res.data.row;
                    this.setState({
                        newupdata:res.data.row,
                    })
                }else{
                    message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
                    return;
                }
            })
            .catch(error=>{
                message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
            })
    }
    onChange(e){
        this.setState({
            value:e.target.value
        })
    }
    title(e){
        this.setState({
            title:e.target.value,
        })
    }
    handleNumberChange = (e) => {
        const number = parseInt(e.target.value || 0, 10);
        if (isNaN(number)) {
            return;
        }
        if (!('value' in this.props)) {
            this.setState({ number });
        }
        this.triggerChange({ number });
    };
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    };
    /*price(e){
        this.setState({
            price:e.target.value,
        })
    }*/
    description(e){
        this.setState({
            description:e.target.value
        })
    }
    tag1(e){
        this.setState({
            tag1:e.target.value,
        })
    }
    tag2(e){
        this.setState({
            tag2:e.target.value,
        })
    }
    tag3(e){
        this.setState({
            tag3:e.target.value,
        })
    }
    componentDidMount(){
        /*if(getAccount()){
            this.setState({
                username:getAccount().username,
                token:getAccount().token,
            })
        }*/
    }
    getFileName(fileInfo){
        if(fileInfo.type=='asset'){
            console.log('上传资产',fileInfo)
            this.setState({
                getFileName:fileInfo.value,
                storage_hash:fileInfo.hash,
                getRealUrl:fileInfo.getRealUrl,
            })
        }else if(fileInfo.type=='assetTemp'){
            console.log('上传样例',fileInfo)
            this.setState({
                getFileNameTemp:fileInfo.value,
                sample_hash:fileInfo.hash,
                getExampleUrl:fileInfo.getExampleUrl,
            })
        }
    }
    async updata(){
        message.destroy();
        for(const key in this.state){
            if(this.state[key]==''){
                message.warning(window.localeInfo["PersonalAsset.PleaseImproveTheInformation"])
                return;
            }
        }
        if(this.state.price>0){
            message.warning('发布需求价格需大于0')
        }
        let _blockInfo = (await getBlockInfo());
        if(_blockInfo.code!=0){
            message.error(window.localeInfo["PersonalAsset.FailedToGetTheBlockMessages"])
            return;
        }
        let blockInfo=_blockInfo.data;
        let data={
            "code": "assetmng",
            "action": "assetreg",
            "args": {
                "asset_id": window.uuid,
                "basic_info": {
                    "user_name":getAccount().username||'',
                    "session_id": getAccount().token||'',
                    "asset_name": this.state.title,
                    "asset_type": this.state.dataAssetType,
                    "feature_tag1": this.state.tag1,
                    "feature_tag2": this.state.tag2,
                    "feature_tag3": this.state.tag3,
                    "sample_path": this.state.getExampleUrl,
                    "sample_hash": this.state.sample_hash,
                    "storage_path": this.state.getRealUrl,
                    "storage_hash": this.state.storage_hash,
                    "expire_time": this.state.expire_time,
                    "price": this.state.number,
                    "description": this.state.description,
                    "upload_date": 1,
                    "signature": "0xxxx"
                }
            }
        };
        console.log(data);
        let getDataBin = (await getDataInfo(data));
        if(getDataBin.code!=0){
            message.error(window.localeInfo["PersonalAsset.FailedToGetTheGetDataBin"])
            return
        }
        console.log(
            getDataBin
        );
        let block={
            "ref_block_num":blockInfo.ref_block_num,
            "ref_block_prefix":blockInfo.ref_block_prefix,
            "expiration":blockInfo.expiration,
            "scope":["assetmng"],
            "read_scope":[],
            "messages":[{
                "code":"assetmng",
                "type":"assetreg",
                "authorization":[],
                "data":getDataBin.data.bin
            }],
            "signatures":[]
        };
        console.log(block)
        BTFetch('/asset/register','POST',block,{
            service:'service'
        }).then(repsonse=>{
            if(repsonse.code==1){
                message.success(window.localeInfo["PersonalAsset.SuccessfulToRegisterTheAsset"])
                this.setState({
                    date11:'',
                    cascader:'',
                    value:1,
                    title:'',
                    number:'',
                    description:'',
                    tag1:'',
                    tag2:'',
                    tag3:'',
                    dataAssetType:'',
                    getFileNameTemp:'',
                    getFileName:'',
                    getExampleUrl:'',
                    getRealUrl:'',
                    expire_time:'',
                    sample_hash:'',
                    storage_hash:'',
                    visible:false,

                })
            }else{
                message.error(window.localeInfo["PersonalAsset.FailedToRegisterTheAsset"])
            }
            this.setState({
                data:repsonse.data
            })
        }).catch(error=>{
            message.error(window.localeInfo["PersonalAsset.FailedToRegisterTheAsset"])
            console.log(error);
        })

    }
    dataPicker(date,dateString){
        this.setState({
            expire_time:Number(new Date(dateString))/1000,
            date11:date,
        })
    }
    render(){
        return(
            <Modal
                visible={this.state.visible}
                onCancel={()=>this.onCancel()}
                className="modalAsset"
                okText = "立即发布"
                cancelText = "取消"
                footer={null}
                title={<FormattedMessage {...PersonalAssetMessages.PublishAsset}/>}
            >
                <div>
                    <BTAssetList  ref={(ref)=>this.assetListModal = ref} newdata={this.state.newdata} handleFile={(fileName)=>this.getFileName(fileName)}/>
                    <div className="uploadAsset">
                        <div className="upLoad">
                        <span className="align">
                            <FormattedMessage {...PersonalAssetMessages.UploadTheSample}/>
                        </span>
                            <Button style={{width:"170px"}} type="upload" examplefile={this.state.exampledata} onClick={()=>this.commitAsset('assetTemp')}>
                                <FormattedMessage{...PersonalAssetMessages.SetScreeningSample}/>
                            </Button>
                            <span>{this.state.getFileNameTemp}</span>
                            {/*<Button>*/}
                            {/*<span type="upload"  onClick={()=>this.commitAsset('assetTemp')}>资源库筛选</span>*/}
                            {/*</Button>*/}
                        </div>
                        <div className="upLoad">
                        <span className="align">
                             <FormattedMessage {...PersonalAssetMessages.UploadTheAsset}/>
                        </span>
                            <Button style={{width:"170px"}} exampledata={this.state.exampledata} onClick={()=>this.commitAsset('asset')}>
                                <FormattedMessage {...PersonalAssetMessages.SetScreeningFile}/>
                            </Button>
                            <span>{this.state.getFileName}</span>
                            {/*<Button>*/}
                            {/*<span onClick={()=>this.commitAsset('asset')}>资源库筛选</span>*/}
                            {/*</Button>*/}
                        </div>
                        <div>
                        <span className="align">
                            <FormattedMessage {...PersonalAssetMessages.AssetName}/>
                        </span>
                            <Input placeholder={window.localeInfo["PersonalAsset.Name"]} value={this.state.password} value={this.state.title} onChange={(e)=>this.title(e)} />
                        </div>
                        <div>
                        <span className="align">
                            <FormattedMessage {...PersonalAssetMessages.ExpectedPrice}/>
                        </span>
                            <Input placeholder={window.localeInfo["PersonalAsset.Price"]}
                                   // value={this.state.price}
                                   value={this.state.number}
                                   onChange={this.handleNumberChange}/* onChange={(e)=>this.price(e)} */
                            />
                            <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                        </div>
                        <div>
                            <span className="align">
                                <FormattedMessage {...PersonalAssetMessages.Deadline}/>
                            </span>
                            <DatePicker
                                placeholder={window.localeInfo["PersonalAsset.SelectDate"]}
                                onChange={(date,dateString)=>this.dataPicker(date,dateString)}
                                disabledDate = {(current)=>this.disabledDate(current)}
                                value={this.state.date11}
                            />
                        </div>
                        <div>
                        <span className="align90">
                            <FormattedMessage {...PersonalAssetMessages.AssetType}/>
                        </span>
                            <Cascader value={this.state.cascader} options={options} onChange={(datas)=>this.onChangeDataAssetType(datas)} placeholder={window.localeInfo["PersonalAsset.PleaseSelect"]} />
                        </div>
                        <div className="featureTag">
                        <span className="align90">
                            <FormattedMessage {...PersonalAssetMessages.AssetFeatureTag}/>
                        </span>
                            <div>
                                <Input type="text" value={this.state.tag1} onChange={(e)=>this.tag1(e)}/>
                                <Input type="text" value={this.state.tag2} onChange={(e)=>this.tag2(e)}/>
                                <Input type="text" value={this.state.tag3} onChange={(e)=>this.tag3(e)}/>
                            </div>
                        </div>
                        <div>
                        <span className="align90">
                            <FormattedMessage {...PersonalAssetMessages.AssetDescription}/>
                        </span>
                            <TextArea value={this.state.description} onChange={(e)=>this.description(e)} rows={4} />
                        </div>
                        <div className="uploadNeedSubmit">
                            <Button type="submit" onClick={(e)=>this.updata(e)}>
                                <FormattedMessage {...PersonalAssetMessages.Publish}/>
                            </Button>
                        </div>
                    </div>
                </div>
                {/*<BTUploadAsset/>*/}
            </Modal>
        )
    }
}
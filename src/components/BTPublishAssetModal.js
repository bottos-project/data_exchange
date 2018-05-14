import React,{PureComponent} from 'react'
import {getAccount} from "../tools/localStore";
// import BTUploadAsset from './BTUploadAsset'
// import messages from '../locales/messages'
import {Icon, Modal, Radio, Select, message, Button, Input, DatePicker, Cascader, Col, Row } from 'antd';
import BTAssetList from './BTAssetList'
import BTCryptTool from '@bottos-project/bottos-crypto-js'
import {getBlockInfo,getDataInfo} from '../utils/BTCommonApi'
import BTFetch from "../utils/BTFetch";
import {options} from '../utils/option'
import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'
import moment from "moment"
import uuid from 'node-uuid'
import ConfirmButton from './ConfirmButton'

const PersonalAssetMessages = messages.PersonalAsset;
const HeaderMessages = messages.Header;

const RangePicker = DatePicker.RangePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const Option = Select.Option;


const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
String.prototype.trim=function() {
    return this.replace(/(^\s*)/g,'');
};
String.prototype.trims=function() {
    return this.replace(/(\s*$)/g,'');
};
export default class BTPublishAssetModal extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
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
            date11: null,
            cascader:'',
        }
    }
    disabledDate(current) {
        // Can not select days before today and today
        return current < moment().endOf('day');
    }

    onChangeDataAssetType(dates){
      console.log('dates', dates);
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
      });

      let param={
          userName:getAccount().username,
          random:Math.ceil(Math.random()*100),
          signature:'0xxxx'
      };

      BTFetch('/asset/queryUploadedData','post',param).then(res=>{
        if (res.code == 0) {
          if (res.data.rowCount == 0) {
            message.warning(window.localeInfo["Header.ThereIsNoFileResourceSetForTheTimeBeing"]);
            return;
          }
          // return res.data.row;
          this.setState({
            newdata:res.data.row
          })
        } else {
          message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
          return;
        }
      }).catch(error=>{
        message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
      })

    }

    async beFetch() {
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
            title:e.target.value.trim(),
        })
    }

    handleNumberChange = (e) => {
      var number = e.target.value
        if (isNaN(number)) {
            return;
        }
        if (number >= 1e7) {
          number = 1e7 - 1
        }

        this.setState({number})

        /*if (!('value' in this.props)) {
            this.setState({ number });
        }
        this.triggerChange({ number });*/
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
            description:e.target.value.trim()
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

    getFileName(fileInfo){
        if(fileInfo.type=='asset'){
            this.setState({
                getFileName:fileInfo.value,
                storage_hash:fileInfo.hash,
                getRealUrl:fileInfo.getRealUrl,
            })
        }else if(fileInfo.type=='assetTemp'){
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
        if(this.state.number<=0||this.state.number>=10000000000){
            message.warning(window.localeInfo["PersonalAsset.InputPrice"]);
            return;
        }
        let reg=/^\d+(?:\.\d{1,10})?$/
        if(!reg.test(this.state.number)){
            message.warning('输入正确的价格');
            return;
        }
        console.log(this.state)
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
                "asset_id": uuid.v1(),
                "basic_info": {
                    "user_name":getAccount().username||'',
                    "session_id": getAccount().token||'',
                    "asset_name": this.state.title.trims(),
                    "asset_type": this.state.dataAssetType,
                    "feature_tag1": this.state.tag1,
                    "feature_tag2": this.state.tag2,
                    "feature_tag3": this.state.tag3,
                    "sample_path": this.state.getExampleUrl,
                    "sample_hash": this.state.sample_hash,
                    "storage_path": this.state.getRealUrl,
                    "storage_hash": this.state.storage_hash,
                    "expire_time": this.state.expire_time,
                    "price": this.state.number*Math.pow(10,10),
                    "description": this.state.description.trims(),
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
    render() {
      return (
        <div className='route-children-container route-children-bg'>
          <BTAssetList  ref={(ref)=>this.assetListModal = ref} newdata={this.state.newdata} handleFile={(fileName)=>this.getFileName(fileName)}/>
          <div className="uploadAsset">
            <h2 className='route-children-container-title'>
              <FormattedMessage {...HeaderMessages.PublishAsset}/>
            </h2>

            {/* 上传样例 */}
            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.UploadTheSample}/>
              </Col>
              <Col span={18}>
                <Button type='primary' examplefile={this.state.exampledata} onClick={()=>this.commitAsset('assetTemp')}>
                    <FormattedMessage {...PersonalAssetMessages.SetScreeningSample}/>
                </Button>
                <span className='filename'>{
                    this.state.getFileNameTemp.length<=14
                    ?
                    this.state.getFileNameTemp
                    :
                    this.state.getFileNameTemp.split('.')[0].substring(0,5)+'...'+this.state.getFileNameTemp.split('.')[1]
                }</span>
              </Col>
            </Row>

            {/* 选择资产文件 */}
            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.UploadTheAsset}/>
              </Col>
              <Col span={18}>
                <Button type='primary' exampledata={this.state.exampledata} onClick={()=>this.commitAsset('asset')}>
                  <FormattedMessage {...PersonalAssetMessages.SetScreeningFile}/>
                </Button>
                <span className='filename'>{
                  this.state.getFileName.length<=14
                  ?
                  this.state.getFileName
                  :
                  this.state.getFileName.split('.')[0].substring(0,5)+'...'+this.state.getFileName.split('.')[1]
                }</span>
              </Col>
            </Row>


            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetName}/>
              </Col>
              <Col span={8}>
                <Input placeholder={window.localeInfo["PersonalAsset.Name"]} value={this.state.title} onChange={(e)=>this.title(e)} />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.ExpectedPrice}/>
              </Col>
              <Col span={8}>
                <Input placeholder={window.localeInfo["PersonalAsset.Price"]}
                       type='number'
                       value={this.state.number}
                       onChange={this.handleNumberChange}/* onChange={(e)=>this.price(e)} */
                />
              </Col>
              <Col span={4}>
                <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
              </Col>
            </Row>



            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.Deadline}/>
              </Col>
              <Col span={12}>
                <DatePicker
                    placeholder={window.localeInfo["PersonalAsset.SelectDate"]}
                    onChange={(date,dateString)=>this.dataPicker(date,dateString)}
                    disabledDate = {(current)=>this.disabledDate(current)}
                    value={this.state.date11}
                />
              </Col>
            </Row>


            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetType}/>
              </Col>
              <Col span={12}>
                <Cascader value={this.state.cascader}
                  options={options}
                  onChange={(datas)=>this.onChangeDataAssetType(datas)}
                  placeholder={window.localeInfo["PersonalAsset.PleaseSelect"]}
                />
              </Col>
            </Row>

            <Row className="featureTag" gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetFeatureTag}/>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="space-between">
                  <Col span={6}><Input type="text" value={this.state.tag1} onChange={(e)=>this.tag1(e)}/></Col>
                  <Col span={6}><Input type="text" value={this.state.tag2} onChange={(e)=>this.tag2(e)}/></Col>
                  <Col span={6}><Input type="text" value={this.state.tag3} onChange={(e)=>this.tag3(e)}/></Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetDescription}/>
              </Col>
              <Col span={12}>
                <TextArea maxLength='120' value={this.state.description} onChange={(e)=>this.description(e)} rows={4} />
              </Col>
            </Row>

            <div className="uploadNeedSubmit marginTop">
              <ConfirmButton type="submit" onClick={(e)=>this.updata(e)}>
                <FormattedMessage {...PersonalAssetMessages.Publish}/>
              </ConfirmButton>
            </div>
          </div>
        </div>
      )
    }
}
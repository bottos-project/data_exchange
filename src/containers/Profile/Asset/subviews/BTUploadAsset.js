import React,{PureComponent} from 'react'
import {Icon, Radio,Select, message, Button,Input, DatePicker,Cascader  } from 'antd';
// import BTIcon from "app/components/BTIcon"
import BTIcon from '../../../../components/BTIcon'
import BTAssetList from '../../../../components/BTAssetList'
import "../styles.less"
import BTCryptTool from '../../../../tools/BTCryptTool'
import {getBlockInfo,getDataInfo} from '../../../../utils/BTCommonApi'
import BTFetch from "../../../../utils/BTFetch";
import {options} from '../../../../utils/option'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const PersonalAssetMessages = messages.PersonalAsset;
const RangePicker = DatePicker.RangePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;


const props = {
    name:'file',
    action: 'http://10.104.10.152:8080/v2/asset/upload',
    multiple: false,
    data:{

    },
    onChange({ file, fileList }) {
        // console.log(file,fileList)
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
        if(file.status==='down'){
            message.success(`${file.name} file uploaded successfully`);
        }else if (file.status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }
    },

};

const onChange = (dates, dateStrings)=> {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}
export default class BTUploadAsset extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            value:1,
            title:'',
            price:'',
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

        }
    }
  /*  componentDidMount(){
        let param={
            "userName": username,
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        };
        BTFetch('/asset/queryUploadedData','post',param)
            .then(res=>{
                if(res.code=='1'){
                    this.setState({fileArr:res.data});
                    console.log(JSON.parse(res.data));
                };
            })
    }*/
    onChangeDataAssetType(dates){
        const datas=dates[0]+dates[1]+dates[2]+dates[3];
        this.setState({
            dataAssetType:datas
        });
    }
    commitAsset(type){
        this.assetListModal.setState({
            visible:true,
            type:type
        });
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
    price(e){
        this.setState({
            price:e.target.value,
        })
    }
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
        console.log(this.state);
        for(const key in this.state){
            if(this.state[key]==''){
                message.warning('请完善注册资产信息');
                return;
            }
        }
        let _blockInfo = (await getBlockInfo());
        if(_blockInfo.code!=0){
            message.error('获取区块信息失败')
            return;
        }
        let blockInfo=_blockInfo.data;
        let data={
            "code": "assetmng",
            "action": "assetreg",
            "args": {
                "asset_id": window.uuid,
                "basic_info": {
                    "user_name": JSON.parse(window.localStorage.account_info).username,
                    "session_id": JSON.parse(window.localStorage.account_info).token,
                    "asset_name": this.state.title,
                    "asset_type": this.state.dataAssetType,
                    "feature_tag1": this.state.tag1,
                    "feature_tag2": this.state.tag2,
                    "feature_tag3": this.state.tag3,
                    "sample_path": this.state.sample_hash,
                    "sample_hash": this.state.getExampleUrl,
                    "storage_path": this.state.storage_hash,
                    "storage_hash": this.state.getRealUrl,
                    "expire_time": this.state.expire_time,
                    "price": this.state.price,
                    "description": this.state.description,
                    "upload_date": 1,
                    "signature": "0xxxx"
                }
            }
        };
        console.log(data);
        let getDataBin = (await getDataInfo(data));
        if(getDataBin.code!=0){
            message.error('获取getDataBin失败')
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
                message.success('注册资产成功');

            }else{
                message.error('注册资产失败')
            }
            console.log(repsonse);
            this.setState({
                data:repsonse.data
            })
        }).catch(error=>{
            message.error('注册资产失败');
            console.log(error);
        })

    }
    dataPicker(date,dateString){
        console.log(date,dateString);
        this.setState({
            expire_time:Number(new Date(dateString))
        })
    }
    render(){
        return(

            <div>
                <BTAssetList  ref={(ref)=>this.assetListModal = ref} handleFile={(fileName)=>this.getFileName(fileName)}/>
                <div className="uploadAsset">
                    <div className="upLoad">
                        <span className="align">
                            <FormattedMessage {...PersonalAssetMessages.UploadTheSample}/>
                        </span>
                        <Button type="upload" examplefile={this.state.exampledata} onClick={()=>this.commitAsset('assetTemp')}>
                            <FormattedMessage{...PersonalAssetMessages.SetScreening}/>
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
                        <Button exampledata={this.state.exampledata} onClick={()=>this.commitAsset('asset')}>
                            <FormattedMessage {...PersonalAssetMessages.SetScreening}/>
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
                        <Input placeholder="Name" defaultValue={this.state.title} onChange={(e)=>this.title(e)} />
                    </div>
                    <div>
                        <span className="align">
                            <FormattedMessage {...PersonalAssetMessages.ExpectedPrice}/>
                        </span>
                        <Input placeholder='Price' defaultValue={this.state.price} onChange={(e)=>this.price(e)} />
                        <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                    </div>
                    <div>
                        <span className="align">截至时间 </span>
                        <DatePicker onChange={(date,dateString)=>this.dataPicker(date,dateString)} />
                    </div>
                    <div>
                        <span className="align90">
                            <FormattedMessage {...PersonalAssetMessages.AssetType}/>
                        </span>
                        <Cascader options={options} onChange={(datas)=>this.onChangeDataAssetType(datas)} placeholder="Please select" />
                    </div>
                    <div className="featureTag">
                        <span className="align90">
                            <FormattedMessage {...PersonalAssetMessages.AssetFeatureTag}/>
                        </span>
                        <div>
                            <Input type="text" onChange={(e)=>this.tag1(e)}/>
                            <Input type="text" onChange={(e)=>this.tag2(e)}/>
                            <Input type="text" onChange={(e)=>this.tag3(e)}/>
                        </div>
                    </div>
                    <div>
                        <span className="align90">
                            <FormattedMessage {...PersonalAssetMessages.AssetDescription}/>
                        </span>
                        <TextArea defaultValue={this.state.description} onChange={(e)=>this.description(e)} rows={4} />
                    </div>
                    <div className="uploadNeedSubmit">
                        <Button type="submit" onClick={(e)=>this.updata(e)}>
                            <FormattedMessage {...PersonalAssetMessages.Publish}/>
                        </Button>
                    </div>
                </div>
            </div>

        )
    }
}


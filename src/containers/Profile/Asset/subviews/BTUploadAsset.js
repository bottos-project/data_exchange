import React,{PureComponent} from 'react'
import { Radio,Select, message, Button,Input, DatePicker,Cascader  } from 'antd';
// import BTIcon from "app/components/BTIcon"
import BTIcon from '../../../../components/BTIcon'
import BTAssetList from '../../../../components/BTAssetList'
import "../styles.less"
import BTCryptTool from '../../../../tools/BTCryptTool'
import {getBlockInfo,getDataInfo} from '../../../../utils/BTCommonApi'
import BTFetch from "../../../../utils/BTFetch";
import {options} from '../../../../utils/option'
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
            file:'',
            description:'',
            tag1:'',
            tag2:'',
            tag3:'',
            dataAssetType:'',
            getFileNameTemp:'',
            getFileName:'',
            getExampleUrl:'',
            getRealUrl:'',
            exampledata:[],

        }
    }
    componentDidMount(){
        let param={
            "userName": "btd121",
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        };
        BTFetch('/asset/queryUploadedData','post',param,{service:'service'})
            .then(res=>{
                if(res.code=='1'){
                    this.setState({file:res.data})
                };
            })
    }
    onChangeDataAssetType(dates){
        const datas = dates[0] + " " + dates[1] + " "+ dates[2] + " " + dates[3];
        this.setState({
            dataAssetType:datas
        });
        console.log(dates)
    }
    commitAsset(type){
        this.assetListModal.setState({
            visible:true,
            type:type
        });
        let param={
            userName:'btd121',
            random:Math.ceil(Math.random()*100),
            signature:'0xxxx'
        }
        BTFetch('/asset/queryUploadedData','post',param,{service:'service'})
            .then(res=>{
                if(res.code==1){
                    this.setState({
                        exampledata:JSON.parse(res.data),
                    })
                }else{
                    message.warning('获取文件资源库失败')
                    return;
                }
            })
            .catch(error=>{
                message.warning('获取文件资源库失败')
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
            console.log('上传资产',fileInfo.value)
            this.setState({
                getFileName:fileInfo.value,
            })
        }else if(fileInfo.type=='assetTemp'){
            console.log('上传样例',fileInfo.value)
            this.setState({
                getFileNameTemp:fileInfo.value,
            })
        }
    }
    async updata(){

        let myHeaders = new Headers();
        myHeaders.append('Content-Type','text/plain');
        let filename={
            userName:'btd121',
            fileName:this.state.getFileName
        };
        let filename1={
            userName:'btd121',
            fileName:this.state.getFileNameTemp
        };
        if(!filename.fileName&&!filename1.fileName){
            message.warning('上传文件不能为空');
            return;
        }
        // let getExampleUrl='';
        //获取样例文件和真实文件storage_path
        let reqUrl = '/asset/getDownLoadURL';
        let params = filename; // rel 文件
        let params1 = filename1; //example文件
        BTFetch('/asset/getDownLoadURL','post',params,{service:'service'})
            .then(response=>{
                if(response.code==1){
                    this.setState({
                        getRealUrl:response.data,
                    })
                }
                console.log(response)
            }).catch(error=>{
                console.log(error)
            });
        BTFetch('/asset/getDownLoadURL','post',params1,{service:'service'})
            .then(response=>{
                if(response.code==1){
                    this.setState({
                        getExampleUrl:response.data,
                    })
                }
                console.log(response)

            }).catch(error=>{
            console.log(error)
        });
        let notValue=this.state;
        console.log(notValue);
        for(const key in notValue){
            if(notValue[key]==''){
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
                    "user_name": "btd121",
                    "session_id": "sessidtestwc2",
                    "asset_name": this.state.title,
                    "asset_type": this.state.dataAssetType,
                    "feature_tag1": this.state.tag1,
                    "feature_tag2": this.state.tag2,
                    "feature_tag3": this.state.tag3,
                    "sample_path": this.state.getExampleUrl,
                    "sample_hash": "samplehasttest",
                    "storage_path": this.state.getRealUrl,
                    "storage_hash": "5f7e3771976bc953a37f24b16e0bca3b57a6a1a10216802aa273dcc935878bc5",
                    "expire_time": 345,
                    "price": this.state.price,
                    "description": this.state.description,
                    "upload_date": 999,
                    "signature": "0xxxx"
                }
            }
        };
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
    render(){
        return(

            <div>
                <BTAssetList  fileall={this.state.file} ref={(ref)=>this.assetListModal = ref} handleFile={(fileName)=>this.getFileName(fileName)}/>
                <div className="uploadAsset">
                    <div className="upLoad">
                        <span>上传样例:</span>
                        <Button type="upload" examplefile={this.state.exampledata} onClick={()=>this.commitAsset('assetTemp')}>资源库筛选</Button>
                        <span>{this.state.getFileNameTemp}</span>
                        {/*<Button>*/}
                            {/*<span type="upload"  onClick={()=>this.commitAsset('assetTemp')}>资源库筛选</span>*/}
                        {/*</Button>*/}
                    </div>
                    <div className="upLoad">
                        <span>上传资产:</span>
                        <Button exampledata={this.state.exampledata} onClick={()=>this.commitAsset('asset')}>资源库筛选</Button>
                        <span>{this.state.getFileName}</span>
                        {/*<Button>*/}
                            {/*<span onClick={()=>this.commitAsset('asset')}>资源库筛选</span>*/}
                        {/*</Button>*/}
                    </div>
                    <div>
                        <span>资产名称:</span>
                        <Input placeholder="名称" defaultValue={this.state.title} onChange={(e)=>this.title(e)} />
                    </div>
                    <div>
                        <span>资产定价:</span>
                        <Input placeholder='价格' defaultValue={this.state.price} onChange={(e)=>this.price(e)} />
                        <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                    </div>
                    <div>
                        <span>资产类型: </span>
                        <Cascader options={options} onChange={(datas)=>this.onChangeDataAssetType(datas)} placeholder="Please select" />
                    </div>
                    <div className="featureTag">
                        <span>资产标签:</span>
                        <div>
                            <Input type="text" onChange={(e)=>this.tag1(e)}/>
                            <Input type="text" onChange={(e)=>this.tag2(e)}/>
                            <Input type="text" onChange={(e)=>this.tag3(e)}/>
                        </div>
                    </div>
                    <div>
                        <span>资产描述: </span>
                        <TextArea defaultValue={this.state.description} onChange={(e)=>this.description(e)} rows={4} />
                    </div>
                    <div className="uploadNeedSubmit">
                        <Button type="submit" onClick={(e)=>this.updata(e)}>立即发布</Button>
                    </div>
                </div>
            </div>

        )
    }
}


import React,{PureComponent} from 'react'
import { Radio,Select, Modal ,Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input, DatePicker,Cascader  } from 'antd';
const RangePicker = DatePicker.RangePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;





const options = [{
    value: 'Video',
    label: 'Video',
    children: [{
        value: 'FacialRecognition',
        label: 'FacialRecognition',
        children: [{
            value: 'Person',
            label: 'Person',
        }],
    }],
}];

const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },

};

const onChange = (dates, dateStrings)=> {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

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
            value:1
        }
    }

    onChange(e){
        this.setState({
            value:e.target.value
        })
    }


    render(){
        return(
                <div className="upLoadForm">
                    <div className="Title">
                        <span>Title:</span>
                        <Input placeholder="Title" />
                    </div>
                    <div className="price">
                        <span>Expect Price:</span>
                        <Input/>
                    </div>
                    <div className="featureTag" >
                        <span>Feature Tag:</span>
                        <Select
                            mode="tags"
                            style={{ width: '50%'}}
                            placeholder="Tags Mode"
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </div>
                    <div className="dataAssetType">
                        <span>Data Asset Type: </span>
                        <Cascader options={options} onChange={onChange} placeholder="Please select" />
                    </div>
                    <div className="OriginPicture">
                        <span style={{marginRight:"5px"}}>choose the files' type:</span>
                        <RadioGroup onChange={(e)=>this.onChange(e)}>
                            <Radio value={1} name={7}>
                                <span>picture</span>
                                <img style={{width:"50",height:"50"}} src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2923044583,1199382580&fm=27&gp=0.jpg"/>
                            </Radio>
                            <Radio value={2} name={7}>
                                <span>video</span>
                                <img style={{width:"25px",height:"25px",margin:"5px"}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516356357863&di=465aa41cb29668df4bec2c8336c62ab7&imgtype=0&src=http%3A%2F%2Fqstatic.zuimeia.com%2Fimg%2Ficons%2Fcld%2F2014091823070062554_318x318.png"/>
                            </Radio>
                            <Radio value={3} name={7}>
                                <span>music</span>
                                <img style={{width:"80px",height:"60px",marginTop:"10px"}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516356702691&di=a8fe4add2ce9f1b04bfa8ed20e524102&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F015c9d5542c6b50000019ae92982a8.jpg"/>
                            </Radio>
                        </RadioGroup>
                    </div>
                    <div className="description">
                        <div>
                            <span>Description: </span>
                        </div>
                        <div className="textarea">
                            <TextArea rows={4} />
                        </div>
                    </div>
                <div className="upLoad">
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> 本地上传
                        </Button>
                        <Button>
                            <Icon type="upload" /> 资源库筛选
                        </Button>
                    </Upload>
                    <div className="submit">
                        <Button type="submit">submit</Button>
                    </div>
                </div>
            </div>

        )
    }
}

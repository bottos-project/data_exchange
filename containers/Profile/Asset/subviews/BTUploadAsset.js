import React,{PureComponent} from 'react'
import { Radio,Select, Modal ,Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input, DatePicker,Cascader  } from 'antd';
// import BTIcon from "app/components/BTIcon"
import BTIcon from '../../../../components/BTIcon'
import "../styles.less"

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
            title:''
        }
    }

    onChange(e){
        this.setState({
            value:e.target.value
        })
    }
    title(e){
        this.setState({
            title:e.target.value
        })
    }

    render(){
        return(
            <div className="asset">
                <div className="upLoadForm">
                    <div className="Title">
                        <span>名称:</span>
                        <Input placeholder="名称" value={this.state.title} onChange={()=>this.title()} />
                    </div>
                    <div className="priceAndData">
                        <div className="price">
                            <span>价格:</span>
                            <Input/>
                            <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                        </div>
                        <div className="dataAssetType">
                            <span>资产分类: </span>
                            <Cascader style={{marginLeft:"10px"}} options={options} onChange={onChange} placeholder="Please select" />
                        </div>
                    </div>

                    <div className="featureTag">
                        <span>标签:</span>
                        <Select
                            mode="multiple"
                            placeholder="Please select"
                            defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </div>
                    {/*<div className="OriginPicture">*/}
                        {/*<span style={{marginRight:"5px"}}>choose the files' type:</span>*/}
                        {/*<RadioGroup onChange={(e)=>this.onChange(e)}>*/}
                            {/*<Radio value={1} name={7}>*/}
                                {/*<span>picture</span>*/}
                                {/*<BTIcon type="icon-tupian" />*/}
                            {/*</Radio>*/}
                            {/*<Radio value={2} name={7}>*/}
                                {/*<span>video</span>*/}
                                {/*<BTIcon type="icon-11"/>*/}
                            {/*</Radio>*/}
                            {/*<Radio value={3} name={7}>*/}
                                {/*<span>music</span>*/}
                                {/*<BTIcon type="icon-voice"/>*/}
                            {/*</Radio>*/}
                        {/*</RadioGroup>*/}
                    {/*</div>*/}
                    <div className="description">
                        <div>
                            <span>描述: </span>
                        </div>
                        <div className="textarea">
                            <TextArea rows={4} />
                        </div>
                    </div>
                    <div className="upLoadAndSubmit">
                        <div className="upLoad">
                            <div>
                                <span>上传样例</span>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload" /> 本地上传
                                    </Button>
                                    <Button>
                                        <Icon type="upload" /> 资源库筛选
                                    </Button>
                                </Upload>
                            </div>
                            <div>
                                <span>上传资产</span>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload" /> 本地上传
                                    </Button>
                                    <Button>
                                        <Icon type="upload" /> 资源库筛选
                                    </Button>
                                </Upload>
                            </div>
                        </div>
                        <div className="submit">
                            <Button type="submit">OK</Button>
                        </div>
                    </div>
            </div>
            </div>

        )
    }
}

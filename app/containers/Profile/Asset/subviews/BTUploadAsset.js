import React,{PureComponent} from 'react'
import { Radio,Select, Modal ,Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input, DatePicker,Cascader  } from 'antd';
// import BTIcon from "app/components/BTIcon"
import BTIcon from '../../../../components/BTIcon'

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

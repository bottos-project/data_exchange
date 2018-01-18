import React,{PureComponent} from 'react'
import { Select, Modal ,Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input, DatePicker,Cascader  } from 'antd';
const RangePicker = DatePicker.RangePicker;
import moment from 'moment';


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
    }


    render(){
        return(
            <div>
                <div className="upLoadForm">
                    <div className="Title">
                        <span>Title:</span>
                        <Input placeholder="Title" />
                    </div>
                    <div className="price">
                        <span>Expect Price:</span>
                        <Input/>
                        <Icon type="pay-circle" style={{ fontSize: 16,margin:'5px' }}></Icon>
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
                    <div className="description">
                        <span>Description: </span>
                        <textarea></textarea>
                    </div>
                </div>
                <div className="upLoad">
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> 本地上传
                        </Button>
                        <Button>
                            <Icon type="upload" /> 数据库上传
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

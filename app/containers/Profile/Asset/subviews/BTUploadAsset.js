import React,{PureComponent} from 'react'
import { Modal ,Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input, DatePicker,Cascader  } from 'antd';
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
    defaultFileList: [{
        uid: 1,
        name: 'xxx.png',
        status: 'done',
        reponse: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
    }, {
        uid: 2,
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
    }, {
        uid: 3,
        name: 'zzz.png',
        status: 'error',
        reponse: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
    }],
};

const     onChange = (dates, dateStrings)=> {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

export default class BTUploadAsset extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            isVisible :false
        }
    }

    handleCancel(){
        this.setState({
            isVisible: false,
        });
    }

    render(){
        return(
            <Modal visible={this.state.isVisible}
                   onCancel={()=>this.handleCancel()}
            >
                <div className="upLoadForm">
                    <div className="ID">
                        <span>RequirementID:</span>
                        <Input placeholder="RequirementID" />
                    </div>
                    <div className="price">
                        <span>Expect Price:</span>
                        <Input/>
                        <span>-</span>
                        <Input />
                        <Icon type="pay-circle" style={{ fontSize: 16,margin:'5px' }}></Icon>
                    </div>
                    <div className="featureTag" >
                        <span>Feature Tag:</span>
                        <Input/>
                        <Input/>
                        <Input/>
                        <Icon type="plus-circle-o" style={{ fontSize: 16,margin:'5px' }}></Icon>
                    </div>
                    <div className="dateSelect">
                        <span>Expire Time:</span>
                        <RangePicker
                            ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                            onChange={onChange}
                        />
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
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
                    <div className="submit">
                        <Button type="submit">submit</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

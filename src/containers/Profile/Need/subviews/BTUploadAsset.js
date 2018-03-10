import React,{PureComponent} from 'react'
import moment from "moment"
import {Upload,Modal,Form, Icon, Input, Button,DatePicker,TimePicker} from 'antd'
import {getBlockInfo, getDataInfo} from "../../../../utils/BTCommonApi";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },

};

export default class BTPublishDemand extends PureComponent{
    constructor(props){
        super(props)
        const value = this.props.value || {};

        this.state = {
            title:"",
            textArea:"",
            number: value.number || 0,
            date:"",
            dateString:""
        }
    }
    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }
    onChange(e){
        this.setState({
            value:e.target.value
        })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    onChangeTitle(e){
        this.setState({
            title:e.target.value
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
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }
    //datePicker
    onChangeDate(date,dateString) {
        this.setState({
            date:date,
            dateString:dateString,
        })
    }
    disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    onChangeTextArea(e){
        this.setState({
            textArea:e.target.value
        })
    }

    //点击后数据收集、fetch
    async handleOk(){
        console.log({
            title:this.state.title,
            number: this.state.number,
            date:this.state.date,
            dateString:(new Date(this.state.dateString).getTime())/1000, //时间戳
            textArea:this.state.textArea,
        })
        //链的data
        let blockData = {
            code: "datareqmng",
            action: "datareqreg",
            args: {
                data_req_id: "idtest12",
                basic_info: {
                    user_name: "nametest22",
                    session_id: "sessidtest232",
                    requirement_name: this.state.title,
                    feature_tag: 111,
                    sample_path: "pathtest",
                    sample_hash: "hashtest",
                    expire_time: (new Date(this.state.dateString).getTime())/1000,//截止时间时间戳
                    price: this.state.number,
                    description: this.state.textArea,
                    publish_date: Date.parse(new Date()),//当前时间戳
                    signature: "sigtest"
                }
            }
        }

        let blockInfo = await getBlockInfo(blockData);
        blockData = await getDataInfo(blockData);
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','text/plain');
        fetch("http://10.104.10.152:8080/v2/requirement/Publish",{
            method:"post",
            header:myHeaders,
            body:JSON.stringify({
                ref_block_num: blockInfo.data.ref_block_num,
                ref_block_prefix: blockInfo.data.ref_block_prefix,
                expiration: blockInfo.data.expiration,
                scope: ["datareqmng"],
                read_scope: [],
                messages: [{
                    code: "datareqmng",
                    type: "datareqreg",
                    authorization: [],
                    data: blockData.data.bin
                }],
                signatures: []
            })
        }).then(response=>response.json())
            .then(res=>{
                //成功时返回的code,并隐藏弹框
                if(res.code==0) {
                    alert("successful")
                    this.setState({
                        visible: false,
                    });
                }else{
                    alert("failed")
                }
            }).catch(error=>{
            console.log(error)
        })
    }
    render(){
        return(
                <div>
                    <div>
                        <span>Title:</span>
                        <Input value={this.state.title} onChange={(e)=>this.onChangeTitle(e)}  />
                    </div>
                    <div>
                        <span>Expect Price:</span>
                        <Input
                            type="text"
                            value={this.state.number}
                            onChange={this.handleNumberChange}
                        /> </div>
                    <div>
                        <span>Deadline:</span>
                        <br/>
                        <DatePicker
                            onChange={(date,dateString)=>this.onChangeDate(date,dateString)}
                            style={{width:"100%"}}
                            disabledDate = {(current)=>this.disabledDate(current)}
                        />
                    </div>
                    <div>
                        <span>Description: </span>
                    </div>
                    <div>
                        <TextArea rows={4} value={this.state.textArea} onChange={(e)=>this.onChangeTextArea(e)} />
                    </div>
                    <div>
                        <span>Upload some samples:</span>
                        <br/>
                        <Upload {...props} style={{display:"flex",flexDirection:"row"}}>
                            <Button>
                                <Icon type="upload" /> 资源库筛选
                            </Button>
                        </Upload>
                    </div>
                </div>
        )
    }
}


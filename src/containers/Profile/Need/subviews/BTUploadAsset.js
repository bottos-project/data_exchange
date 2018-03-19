import React,{PureComponent} from 'react'
import moment from "moment"
import {Upload,Modal,Form, Icon, Input, Button,DatePicker,TimePicker,message} from 'antd'
import {getBlockInfo, getDataInfo} from "../../../../utils/BTCommonApi";
import "../styles.less"
import BTFetch from "../../../../utils/BTFetch";
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const PersonalDemandMessages = messages.PersonalDemand;
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
    };
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    };
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
    async updata(){
        console.log({
            title:this.state.title,
            number: this.state.number,
            date:this.state.date,
            dateString:(new Date(this.state.dateString).getTime())/1000, //时间戳
            textArea:this.state.textArea,
        });
        if(!this.state.title || !this.state.date || !this.state.textArea){
            message.warning('请完善发布需求');
            return;
        }
        //链的data
        let blockData = {
            code: "datareqmng",
            action: "datareqreg",
            args: {
                data_req_id: window.uuid,
                basic_info: {
                    user_name: "btd121",
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

        let blockInfo = await getBlockInfo();
        let blockDataBin = await getDataInfo(blockData);
        if(blockInfo.code!=0 || blockDataBin.code!=0){
            message.error('获取区块信息错误');
            return ;
        }
       let param={
           ref_block_num: blockInfo.data.ref_block_num,
           ref_block_prefix: blockInfo.data.ref_block_prefix,
           expiration: blockInfo.data.expiration,
           scope: ["datareqmng"],
           read_scope: [],
           messages: [{
               code: "datareqmng",
               type: "datareqreg",
               authorization: [],
               data: blockDataBin.data.bin
           }],
           signatures: []
       };
        BTFetch("/requirement/Publish",'post',param)
            .then(res=>{
                //成功时返回的code,并隐藏弹框
                if(res.code==0) {
                    // alert("successful")
                    message.success('需求发布成功');

                    this.setState({
                        visible: false,
                        title:"",
                        textArea:"",
                        number:0,
                        date:"",
                    });
                }else{
                    message.error('需求发布失败')
                }
            }).catch(error=>{
                message.error('需求发布失败')
            })
    }
    render(){
        return(
            <div className="upLoadNeed">
                <div>
                    <span>
                         <FormattedMessage {...PersonalDemandMessages.DemandName}/>
                    </span>
                    <Input style={{width:170}} defaultValue={this.state.title} onChange={(e)=>this.onChangeTitle(e)}  />
                </div>
                <div>
                    <span>
                        <FormattedMessage {...PersonalDemandMessages.RecruitmentPrice}/>
                    </span>
                    <Input
                        type="text"
                        value={this.state.number}
                        onChange={this.handleNumberChange}
                    />
                </div>
                <div>
                    <span>
                         <FormattedMessage {...PersonalDemandMessages.DemandDescription}/>
                    </span>
                    <TextArea rows={4} defaultValue={this.state.textArea} onChange={(e)=>this.onChangeTextArea(e)} />
                </div>
                {/*<div className="upLoad">
                    <span>上传样例:</span>
                    <br/>
                    <div>
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" />
                                <FormattedMessage {...PersonalDemandMessages.SetScreening}/>
                            </Button>
                        </Upload>
                        <Button onClick={()=>this.handleOk()}>发布</Button>
                    </div>
                </div>*/}
                <div>
                    <span>
                        <FormattedMessage {...PersonalDemandMessages.Deadline}/>
                    </span>
                    <br/>
                    <DatePicker
                        onChange={(date,dateString)=>this.onChangeDate(date,dateString)}
                        disabledDate = {(current)=>this.disabledDate(current)}
                    />
                </div>
                <div className="uploadNeedSubmit">
                    <Button type="submit" onClick={(e)=>this.updata(e)}>
                        <FormattedMessage {...PersonalDemandMessages.Publish}/>
                    </Button>
                </div>
            </div>
        )
    }
}


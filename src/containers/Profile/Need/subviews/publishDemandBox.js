import React,{PureComponent} from 'react'
import moment from "moment"
import {Upload,Modal,Form, Icon, Input, Button,DatePicker,TimePicker,message,InputNumber} from 'antd'
import BTUploadNeed from "./BTUploadAsset"
import {getBlockInfo, getDataInfo} from "../../../../utils/BTCommonApi";
import "../styles.less"
import BTFetch from "../../../../utils/BTFetch";
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from '../../../../tools/localStore'
import uuid from 'node-uuid'
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
String.prototype.trim=function() {
    return this.replace(/(^\s*)/g,'');
};
String.prototype.trims=function() {
    return this.replace(/(\s*$)/g,'');
};
export default class BTPublishDemand extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            visible:false,
            title:"",
            textArea:"",
            number: '',
            date:"",
            dateString:"",
            username:'',
            token:'',
            ddatePicker:'',
            date11:'',
        }
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }

    handleOk(){
        this.setState({
            visible:false
        })
    }
    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }
    componentDidMount(){
        if(getAccount()){
            this.setState({
                username:getAccount().username,
                token:getAccount().token,
            })
        }

    }
    onChange(e){
        this.setState({
            value:e.target.value
        })
    }
    handleCancel(){
        this.setState({
            visible:false,
            title:"",
            textArea:"",
            number:'',
            date:"",
            date11:'',
            dateString:'',
            DatePicker:'',
        })
    }
    onChangeTitle(e){

        this.setState({
            title:e.target.value.trim()
        })
    }
    handleNumberChange (e) {
        message.destroy();
        const number = parseFloat(e.target.value || 0, 10);
        if (isNaN(number)) {
            return;
        }

        this.setState({number:e.target.value})
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
            date11:date,
        });
    }
    disabledDate(current) {
        // Can not select days before today and today
        return (current < moment().endOf('day'));
    }
    onOpenChangeDate(data){
        console.log(data)
    }
    onChangeTextArea(e){
        this.setState({
            textArea:e.target.value.trim()
        })
    }

    //点击后数据收集、fetch
    async updata(){
        message.destroy();
        if(!this.state.title || !this.state.date || !this.state.textArea){
            message.warning(window.localeInfo["PersonalDemand.PleaseImproveTheDemand"])
            return;
        }
        if(this.state.number<=0||this.state.number>=10000000000){
            message.warning(window.localeInfo["PersonalDemand.PleaseInputPrice"])
            return;
        }
        let reg=/^\d+(?:\.\d{1,10})?$/
        if(!reg.test(this.state.number)){
            message.warning('输入正确的价格');
            return;
        }
        //链的data
        let blockData = {
            code: "datareqmng",
            action: "datareqreg",
            args: {
                data_req_id: uuid.v1(),
                basic_info: {
                    user_name: getAccount().username,
                    session_id: getAccount().token,
                    requirement_name: this.state.title.trims(),
                    feature_tag: 111,
                    sample_path: "pathtest",
                    sample_hash: "hashtest",
                    expire_time: (new Date(this.state.dateString).getTime())/1000,//截止时间时间戳
                    price: this.state.number*Math.pow(10,10),
                    description: this.state.textArea.trims(),
                    publish_date: '1',//当前时间戳
                    signature: "sigtest"
                }
            }
        }
        console.log(blockData)
        let blockInfo = await getBlockInfo();
        let blockDataBin = await getDataInfo(blockData);
        if(blockInfo.code!=0 || blockDataBin.code!=0){
            message.error(window.localeInfo["PersonalDemand.FailedToGetTheBlockMessages"])
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
                    this.setState({
                        visible: false,
                        title:"",
                        textArea:"",
                        number:'',
                        date:"",
                        date11:'',
                        dateString:'',
                        DatePicker:'',
                    });
                    message.success(window.localeInfo["PersonalDemand.SuccessfulToPublishTheDemand"])
                }else{
                    message.error(window.localeInfo["PersonalDemand.FailedToPublishTheDemand"])
                }
            }).catch(error=>{
            console.log(2)
            message.error(window.localeInfo["PersonalDemand.FailedToPublishTheDemand"])
        })
    }
    render(){
        return(
            <Modal visible={this.state.visible}
                   onCancel={()=>this.handleCancel()}
                   className="modalAsset"
                   okText = "立即发布"
                   cancelText = "取消"
                   footer={null}
                   title={<FormattedMessage {...PersonalDemandMessages.PublishTheDemand}/>}
            >
                {/*<BTUploadNeed/>*/}
                <div className="upLoadNeed">
                    <div>
                    <span>
                         <FormattedMessage {...PersonalDemandMessages.DemandName}/>
                    </span>
                        <Input style={{width:170}} value={this.state.title} onChange={(e)=>this.onChangeTitle(e)}  />
                    </div>
                    <div>
                    <span>
                        <FormattedMessage {...PersonalDemandMessages.RecruitmentPrice}/>
                    </span>
                        <Input
                            type="text"
                            onkeyup="value=value.replace(/[^\d.]/g,'')"
                            value={this.state.number}
                            onChange={(e)=>this.handleNumberChange(e)}
                        />
                        <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                    </div>
                    <div>
                    <span>
                         <FormattedMessage {...PersonalDemandMessages.DemandDescription}/>
                    </span>
                        <TextArea rows={4} value={this.state.textArea} onChange={(e)=>this.onChangeTextArea(e)} />
                    </div>
                    <div>
                    <span>
                        <FormattedMessage {...PersonalDemandMessages.Deadline}/>
                    </span>
                        <br/>
                        <DatePicker
                            placeholder={window.localeInfo["PersonalDemand.SelectDate"]}
                            onChange={(date,dateString)=>this.onChangeDate(date,dateString)}
                            onOpenChange={(date)=>this.onOpenChangeDate(date)}
                            disabledDate = {(current)=>this.disabledDate(current)}
                            value={this.state.date11}
                            // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        />
                    </div>
                    <div className="uploadNeedSubmit">
                        <Button type="submit" onClick={(e)=>this.updata(e)}>
                            <FormattedMessage {...PersonalDemandMessages.Publish}/>
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}


import React,{PureComponent} from 'react'
import {Radio,Select, Modal ,Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input, DatePicker,Cascader  } from 'antd';
// import BTIcon from "app/components/BTIcon"
import BTIcon from '../../../../components/BTIcon'
import BTFetch from "../../../../utils/BTFetch"
import "../styles.less"
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

const onChange = (dates, dateStrings)=> {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
};
const Option = Select.Option;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}




export default class BTUploadAsset extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            value:1,
            title:"",
            price:"",
            spanDate:"",
            textArea:"",
            featureTag:"",
        }
    }

    onChangeDate(dateString,date) {
        this.setState({
            spanDate:date
        })
    }
    handleChange(value) {
        this.setState({
            featureTag:`${value}`
        })
    }
    onChange(e){
        this.setState({
            value:e.target.value
        })
    }
    onChangeTitle(e){
        this.setState({
            title:e.target.value
        })
    }
    onChangePrice(e){
        this.setState({
            price:e.target.value
        })
    }
    onChangeTextArea(e){
        this.setState({
            textArea:e.target.value
        })
    }
    //点击传输数据
    onClick(){
        BTFetch("","post",{
            title:this.state.title,
            price:this.state.price,
            spanDate:this.state.spanDate,
            textArea:this.state.textArea,
            featureTag:this.state.featureTag
        }).then((data)=>{
            console.log(data)
        })
    }
    render(){
        return(
            <div className="need">
                <div className="upLoadForm">
                    <div className="Title">
                        <span>Title:</span>
                        <Input value={this.state.title} onChange={(e)=>this.onChangeTitle(e)}  />
                    </div>
                    <div className="priceAndData">
                        <div className="price">
                            <span>Expect Price:</span>
                            <Input value={this.state.price} onChange={(e)=>this.onChangePrice(e)}  />
                            <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                        </div>
                        <div className="dataAssetType">
                            <span>Data Asset Type: </span>
                            <Cascader style={{marginLeft:"10px"}} options={options} onChange={onChange} placeholder="Please select" />
                        </div>
                    </div>
                    <div className="featureTag">
                        <span>FeatureTag:</span>
                        <Select
                            mode="multiple"
                            placeholder="Please select"
                            onChange={(value)=>this.handleChange(value)}
                        >
                            {children}
                        </Select>
                    </div>
                    <div className="dateSelect">
                            <span className="dateSelectSpan" style={{margin:0}}>Deadline:</span>
                        <DatePicker onChange={(dateString,date)=>this.onChangeDate(dateString,date)} className="datePicker" />
                    </div>
                    <div className="description">
                        <div>
                            <span>Description: </span>
                        </div>
                        <div className="textarea">
                            <TextArea rows={4} value={this.state.textArea} onChange={(e)=>this.onChangeTextArea(e)} />
                        </div>
                    </div>
                    <div className="submit">
                        <Button type="submit" onClick={()=>this.onClick()}>OK</Button>
                    </div>
            </div>
            </div>

        )
    }
}

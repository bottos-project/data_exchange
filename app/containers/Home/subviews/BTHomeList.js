import React,{PureComponent} from 'react'
// import './style.less'

import { Select,Checkbox ,Row, Col } from 'antd';
const Option = Select.Option;

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['家族', '家庭', '情侣','成年','青年','少年'];
const defaultCheckedList = ['成年', '情侣'];

const cards = ['1','2','2','2','2','2','2','2','2','2','2','2','2','2'];

import TZCardPage from '../../../components/TZCardPage'

export default class BTHomeList extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false
        }
    }

    handleChange(){
        console.log('handleChange')
    }

    handleBlur(){
        console.log('handleBlur')
    }

    handleFocus(){
        console.log('handleFocus')
    }

    onChange(checkedValues){
        console.log('checked = ', checkedValues);
    }

    render(){
        return(
            <div className="categoryStyle">
                <div className="categorySelectStyle">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={()=>this.handleChange()}
                        onFocus={()=>this.handleFocus()}
                        onBlur={()=>this.handleBlur()}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="jack">视频</Option>
                        <Option value="lucy">人物</Option>
                        <Option value="tom">男性</Option>
                    </Select>


                    <div>
                    <Checkbox.Group style={{ width: '100%' }} onChange={(e)=>this.onChange(e)}>
                    <Col>
                        {
                            plainOptions.map((item,i)=>{
                                return (<Row key={i} span={8}><Checkbox value={item}>{item}</Checkbox></Row>)
                            })
                        }
                    </Col>
                  </Checkbox.Group>
                    </div>
                </div>
                <div className="cardListStyle">
                    {
                        cards.map((item,i)=>{
                            return(<TZCardPage/>)
                        })
                    }
                </div>
            </div>
        )
    }
}
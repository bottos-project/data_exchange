import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button,Select } from 'antd';
import "../styles.less"
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key)
}

const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default class BTSignIn extends PureComponent{
    constructor(props){
        super(props)

        // this.state = {
        //     address:''
        // }
    }

    render(){
        return(
                        <div>
                            <div className="personalInformation">
                                <div id="example">
                                    <span>UserName:</span>
                                    <Input />
                                </div>
                                <div>
                                    <span>Password:</span>
                                    <Input/>
                                </div>
                            </div>
                            <div className="submit" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Button>submit</Button>
                            </div>
                        </div>

        )
    }
}





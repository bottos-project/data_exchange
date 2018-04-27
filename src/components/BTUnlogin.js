import React, {PureComponent} from 'react'
import {Button} from 'antd'
import { FormattedMessage } from 'react-intl';
import messages from "../locales/messages";
const HeaderMessages = messages.Header;
export default class BTUnlogin extends PureComponent{

    render(){
        return(
            <div className='container center column'>
                    <div>
                        <img style={{width:200,height:200}}  src="./img/unloginLogo.png" alt=""/>
                    </div>
                    <div style={{marginTop:10,marginBottom:20}}>
                        <FormattedMessage {...HeaderMessages.PleaseLogInFirst}/>
                    </div>
            </div>
        )
    }
}

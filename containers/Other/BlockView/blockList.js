import React,{PureComponent} from 'react'
import '../styles.less'


export default class BlockList extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='event'>
                <div className="formats">
                    <span>
                        <a>
                            <font size="2" color="white">Block 4242314</font>
                        </a>
                    </span>
                    <small>18 secs ago</small>
                </div>
                <div className="detail">
                    Mined By <a  className='address-tag'>0xb75d1e62b10e4ba91315c4aa3facc536f8a922f5</a>
                    {/*<p></p>*/}
                    <p>
                        <a ><b>146 Txns</b></a>
                        in 24 secs
                    </p>
                </div>
            </div>
        )
    }
}








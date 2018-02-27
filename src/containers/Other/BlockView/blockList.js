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
                    <a>Block 4242314</a>
                    <em>18 secs ago</em>
                </div>
                <div className="detail">
                    <p>
                        Mined By<a className='address-tag'>0xb75d1e62b10e4ba91315c...</a>
                    </p>
                    <p>
                        <a >146 Txns</a>
                        in 24 secs
                    </p>
                </div>
            </div>
        )
    }
}








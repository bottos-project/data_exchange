import React,{PureComponent} from 'react'


export default class BlockList extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        // console.log(this.props.block);
        let data=this.props.block;
        return (
            <div className='event'>
                <div className="formats">
                    <a>Block {data.block_id}</a>
                    <em>18 secs ago</em>
                </div>
                <div className="detail">
                    <p>
                        Mined By<a className='address-tag'>{(data.transaction_id).substr(0,30)+'...'}</a>
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








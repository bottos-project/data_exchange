import React,{PureComponent} from 'react'

export default class Transfer extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        var paddingLeft='10px';
        return (
            <div className='transfer'>
                <header>Transfer</header>
                <div className='transfer-content'>
                    <div className="transfer-from">
                        <span>From</span>
                        <div className="transfer-right">
                            <select name="" id=""></select>
                            <span style={{paddingLeft}}>0x03f2b4d813cf2813813cf2cf2d97</span>
                        </div>
                    </div>
                    <div className="transfer-from">
                        <span>Token</span>
                        <div className="transfer-right">
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="transfer-from">
                        <span>To</span>
                        <div className="transfer-right">
                            <input type="text"/>
                        </div>
                    </div>
                </div>
                <div className="token-submit">
                    <button className='add'>Submit</button>
                    <button className='cancel'>Cancel</button>
                </div>
            </div>
        )
    }
}
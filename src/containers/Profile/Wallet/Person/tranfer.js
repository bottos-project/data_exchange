import React,{PureComponent} from 'react'

export default class Transfer extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            userCoin:'',
            userAddress:''
        }
    }
    handleChange(e){
        this.setState({userCoin:e.target.value})
    }
    handleAddress(e){
        this.setState({userAddress:e.target.value})
    }
    clear(){
        this.setState({userCoin:'',userAddress:''},()=>{
            this.refs.theCoin.focus();
        })
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
                            <select name="" id="">
                                <option value="">Lidy</option>
                                <option value="">Haoyu</option>
                                <option value="">Yugedaren</option>
                            </select>
                            <span style={{paddingLeft}}>0x479973e3c24e1D5368868e69e23d1EsafqWd</span>
                        </div>
                    </div>
                    <div className="transfer-from">
                        <span>Token</span>
                        <div className="transfer-right">
                            <input
                                ref='theCoin'
                                value={this.state.userCoin}
                                onChange={(e)=>this.handleChange(e)}
                                type="text" style={{width:'120px'}}/>
                        </div>
                    </div>
                    <div className="transfer-from">
                        <span>To</span>
                        <div className="transfer-right">
                            <input
                                value={this.state.userAddress}
                                ref='theAddress'
                                onChange={(e)=>this.handleAddress(e)}
                                type="text"/>
                        </div>
                    </div>
                </div>
                <div className="token-submit">
                    <button className='add'>Submit</button>
                    <button className='cancel' onClick={()=>this.clear()}>Cancel</button>
                </div>
            </div>
        )
    }
}
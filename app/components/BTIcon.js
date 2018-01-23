import React,{PureComponent} from 'react'

export default class BTIcon extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        let {type} = this.props;
        let iconType = 'iconfont '+type;
        return(
            <i className={iconType} {...this.props}/>
        )
    }
}

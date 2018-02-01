import React,{PureComponent} from 'react'
import '../styles.less'


export default class BlockHeader extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='headerView'>
                <img src="" alt=""/>
                <p>7.538</p>
                <h4>Total BTO</h4>
            </div>
        )
    }

}
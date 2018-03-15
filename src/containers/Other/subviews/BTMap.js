import React,{PureComponent} from 'react'
import { Map} from 'react-amap';
export default class BTMap extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div style={{display:"flex",height:"80vh",width:"40%",float:"right"}}>

                <Map amapkey="0230816951e0c0fabe27d840aa2d745"  zoom={1} />
            </div>
        )
    }
}
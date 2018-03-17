import React,{PureComponent} from 'react'
import { Map,Markers} from 'react-amap';
const randomPosition = () => ({
    longitude: 100 + Math.random() * 20,
    latitude: 30 + Math.random() * 20
})
const randomMarker = (len) => (
    Array(len).fill(true).map((e, idx) => ({
        position: randomPosition()
    }))
);
export default class BTMap extends PureComponent{
    constructor(props){
        super(props);
        this.mapCenter={longitude:120,latitude:30};
        this.state = {
            markers: randomMarker(1),
            center: {longitude:120,latitude:30}
        }
    }
    render(){
        {/*center={this.state.center}*/}
        return (
            <div style={{display:"flex",height:"40vh",width:"100%",float:"right"}}>
                <Map plugins={['ToolBar']} center={this.state.center} zoom={6}>
                    <Markers
                        markers={this.state.markers}
                    />
                </Map>
                {/*<Map amapkey="0230816951e0c0fabe27d840aa2d745" center={this.mapCenter}  zoom={1} />*/}
            </div>
        )
    }
}
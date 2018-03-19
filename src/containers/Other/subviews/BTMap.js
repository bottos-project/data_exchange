import React,{PureComponent} from 'react'
import { Map,Markers} from 'react-amap';
const randomPosition = () => ({
    longitude: 100,
    latitude:30,
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
            setLang:"en",
            markers: randomMarker(1),
            center: {longitude:120,latitude:30}
        }
    }

    render(){
        {/*center={this.state.center}*/}
        return (
            <div style={{display:"flex",height:"40vh",width:"100%",float:"right"}} >
                <Map setLang="en" plugins={['ToolBar']} center={this.state.center} zoom={1}>
                    <Markers
                        markers={this.state.markers}
                        setLang="en"
                    />
                </Map>
            </div>
        )
    }
}
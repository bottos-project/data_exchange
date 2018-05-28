import React,{PureComponent} from 'react'
import { Map, Markers } from 'react-amap';

export default class BTMap extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            lang:'zh_cn',
            markers: this.randomMarker(100),
            center: this.randomPosition()
        }
    }

    randomPosition(){
        return {
            longitude: 100 + Math.random() * 20,
            latitude: 30 + Math.random() * 20
        }
    }

    randomMarker(len){
        return Array(len).fill(true).map((e, idx) => ({position: this.randomPosition()}))
    }

    randomMarkers() {
        this.setState({
            markers: this.randomMarker(100)
        })
    }
    

    componentDidMount(){
        let storage = window.localStorage;
        let locale = storage.getItem('locale')
        if(locale=='en-US'){
            this.setState({lang:'en'})
        }else{
            this.setState({lang:'zh_cn'})
        }

        this.randomMarkers()
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.node != this.state.markers){
            let nodes=[];
            nextProps.node.map((v,i)=>{
                nodes.push({position: {lng: v[1],lat:v[2]}})
            });
            this.setState({
                markers:nodes||[]
            })
        }


    }
    render(){
        const YOUR_AMAP_KEY = '0ca394ad5386e23b5ebcca33db764d90'
        return (
            <div style={{display:"flex",height:"40vh",width:"100%",float:"right"}} >
               <Map
                    amapkey={YOUR_AMAP_KEY}
                    zoom={0.9}
                    lang={this.state.lang}
                    zoomEnable={true}
                    markers={this.state.markers}
                    useCluster={true}
                    isHotspot
                >

                    <Markers
                        markers={this.state.markers}
                    />
                </Map>
            </div>
        )
    }
}

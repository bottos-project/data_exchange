import React,{PureComponent} from 'react'
import { Map, Markers } from 'react-amap';

const markers = [
    {"position": {"longitude": 116.240405,"latitude": 39.953014}},
    {"position": {"longitude": 117.006668,"latitude": 39.959003}},
    {"position": {"longitude": 116.471118,"latitude": 39.607907}},
    {"position": {"longitude": 116.214313,"latitude": 40.08658}},
    {"position": {"longitude": 121.295489,"latitude": 31.250492}},
    {"position": {"longitude": 121.141681,"latitude": 31.259884}},
    {"position": {"longitude": 121.652545,"latitude": 31.250492}},
    {"position": {"longitude": 121.545428,"latitude": 31.161224}},
    {"position": {"longitude": 120.147418,"latitude": 30.154743}},
    {"position": {"longitude": 119.949903,"latitude": 30.166617}},
    {"position": {"longitude": 120.06114,"latitude": 30.104857}},
]

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
        return Array(len).fill(true).map((e, idx) => ({position: this.randomPosition(),idx:idx}))
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

    test(item){
        return (
            <div>
                <span style={{color:"red"}}>{item.idx}</span>
            </div>
        )
    }

    render(){
        const YOUR_AMAP_KEY = '0ca394ad5386e23b5ebcca33db764d90'
        return (
            <div style={{display:"flex",height:"40vh",width:"100%",float:"right"}} >
               <Map
                    protocol="http"
                    amapkey={YOUR_AMAP_KEY}
                    protocol='http'
                    zoom={3}
                    zooms={[3, 5]}
                    lang={this.state.lang}
                    zoomEnable={true}
                    useCluster={true}
                    isHotspot
                >
                    <Markers
                        markers={this.props.node}
                    />
                </Map>
            </div>
        )
    }
}

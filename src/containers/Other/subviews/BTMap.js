import React,{PureComponent} from 'react'
// import { Map,Marker,Markers} from 'react-amap';
import Map from 'react-amap/lib/map';
import Markers from 'react-amap/lib/markers'
// import GoogleMapReact from 'google-map-react';
// const AnyReactComponent  = ({test})=>(<div>{test}</div>);
export default class BTMap extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            lang:'zh_cn',
            markers:[
               /* {position: {longitude: 121.47,latitude:31.23}},//shanghai
                  {position: {longitude: 120.19,latitude:30.26}},//hanghzhou
                 {position: {longitude: 101.705088,latitude:3.088397}},//xinjiapo
                 {position: {longitude: -122.25,latitude:37.48}},//luoshanji
                {position: {longitude: 116.38,latitude:39.9}},//beijing
                {position: {longitude: 102.705088,latitude:3.388397}}, //新加坡
                {position: {longitude: -78.6568942,latitude:37.4315734}}//guigu*/
            ],
        }
    }

    componentDidMount(){
        let storage = window.localStorage;
        let locale = storage.getItem('locale')
        if(locale=='en-US'){
            this.setState({lang:'en'})
        }else{
            this.setState({lang:'zh_cn'})
        }
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
                <img src="./img/map.png" width='100%' alt=""/>
                {/*<GoogleMapReact
                    // bootstrapURLKeys={{ key: [YOUR_KEY] }}
                    // options={options}
                    center={{lat: 30.95, lng: 121.33}}
                    zoom={1}
                    heatmapLibrary={true}
                    heatmap={{
                        positions: [
                            {
                                lat: 30.714305,
                                lng: 120.051773,
                            },
                            {
                                lat: 60.734305,
                                lng: 47.061773,
                            },
                            {
                                lat: 60.754305,
                                lng: 47.081773,
                            },
                        ],
                    }}
                >
                    {markers}
                </GoogleMapReact>*/}
               {/* <Map
                    amapkey={YOUR_AMAP_KEY}
                    zoom={0.9}
                    lang={this.state.lang}
                    zoomEnable={false}
                    // markers={this.state.markers}
                    useCluster={true}
                    isHotspot
                >

                    <Markers
                        markers={this.state.markers}
                    />
                </Map>*/}
            </div>
        )
    }
}
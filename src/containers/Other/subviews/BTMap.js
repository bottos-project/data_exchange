import React,{PureComponent} from 'react'
// import { Map,Markers} from 'react-amap';
import Map from 'react-amap/lib/map';
import Markers from 'react-amap/lib/marker'
export default class BTMap extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            lang:'zh_cn',
            markers:[
                {position: {longitude: 121.47,latitude:31.23}},//shanghai
                  {position: {longitude: 120.19,latitude:30.26}},//hanghzhou
                 {position: {longitude: 101.705088,latitude:3.088397}},//xinjiapo
                 {position: {longitude: -122.25,latitude:37.48}},//luoshanji
                {position: {longitude: 116.38,latitude:39.9}},//beijing
                {position: {longitude: 102.705088,latitude:3.388397}}, //新加坡
                {position: {longitude: -78.6568942,latitude:37.4315734}}//guigu
            ],
            // center: randomPosition()
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

    render(){
        const amapkey = '0ca394ad5386e23b5ebcca33db764d90'
        return (
            <div style={{display:"flex",height:"40vh",width:"100%",float:"right"}} >
                <Map
                    amapkey={amapkey}
                    zoom={0.9}
                    lang={this.state.lang}
                    zoomEnable={false}
                >
                    <Markers
                        markers={this.state.markers}
                    />
                </Map>
            </div>
        )
    }
}
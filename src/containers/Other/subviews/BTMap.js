/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
import React from 'react'
import { Map, Markers } from 'react-amap';

// const markers = [
//     {"position": {"longitude": 116.240405,"latitude": 39.953014}},
//     {"position": {"longitude": 117.006668,"latitude": 39.959003}},
//     {"position": {"longitude": 116.471118,"latitude": 39.607907}},
//     {"position": {"longitude": 116.214313,"latitude": 40.08658}},
//     {"position": {"longitude": 121.295489,"latitude": 31.250492}},
//     {"position": {"longitude": 121.141681,"latitude": 31.259884}},
//     {"position": {"longitude": 121.652545,"latitude": 31.250492}},
//     {"position": {"longitude": 121.545428,"latitude": 31.161224}},
// ]

// function randomPosition() {
//     return {
//         longitude: 100 + Math.random() * 20,
//         latitude: 30 + Math.random() * 20
//     }
// }
//
// function randomMarker(len){
//     return Array(len).fill(true).map((e, idx) => (
//       {position: this.randomPosition(), idx}
//     ))
// }

export default function BTMap(props) {
  let lang = props.locale == 'en-US' ? 'en' : 'zh_cn'

  const YOUR_AMAP_KEY = '0ca394ad5386e23b5ebcca33db764d90'
  return (
    <div style={{display:"flex",height:"40vh",width:"100%",float:"right"}} >
      <Map
        protocol="http"
        amapkey={YOUR_AMAP_KEY}
        protocol='http'
        zoom={3}
        zooms={[3, 5]}
        lang={lang}
        zoomEnable={true}
        useCluster={true}
        isHotspot
      >
          <Markers
            markers={props.node}
            render={() => <img src='./img/mark_bs.png' />}
          />
      </Map>
    </div>
  )

}

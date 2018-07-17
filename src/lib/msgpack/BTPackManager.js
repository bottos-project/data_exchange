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
import * as BTPack from './msgpack'
import * as BTCrypto from 'bottos-crypto-js'


export const registAssetPack = (did)=>{
    let arr1Size = BTPack.PackArraySize(2)
    let arrAssetId = BTPack.PackStr16(did.assetId)

    let info = did.info
    let len = Object.keys(info).length

    let arr2Size = BTPack.PackArraySize(len)

    let arrUsername = BTPack.PackStr16(info.userName)
    let arrAssetName = BTPack.PackStr16(info.assetName)
    let arrAssetType = BTPack.PackUint64(info.assetType)
    let arrFeatureTag = BTPack.PackStr16(info.featureTag)
    // let arrSamplePath = BTPack.PackStr16(info.samplePath)
    let arrSampleHash = BTPack.PackStr16(info.sampleHash)
    // let arrStoragePath = BTPack.PackStr16(info.storagePath)
    let arrStorageHash = BTPack.PackStr16(info.storageHash)

    let arrExpireTime = BTPack.PackUint32(info.expireTime)
    let arrOpType = BTPack.PackUint32(info.opType)
    // console.log('price', info.price)
    let arrTokenType = BTPack.PackStr16(info.tokenType)

    // console.log('info.price', info.price);
    let arrPrice = BTPack.PackUint64(info.price)
    // console.log('arrPrice', arrPrice);

    let arrDescription = BTPack.PackStr16(info.description)

    let arrBuf = [...arr1Size,...arrAssetId,...arr2Size,...arrUsername,...arrAssetName,...arrAssetType,
        ...arrFeatureTag,...arrSampleHash,...arrStorageHash,...arrExpireTime,
        ...arrOpType,...arrTokenType,...arrPrice,...arrDescription]

    return arrBuf
}

export const registDemandPack = (did)=>{
    let arr1Size = BTPack.PackArraySize(2)
    let arrDataReqId = BTPack.PackStr16(did.dataReqId)

    let basic_info = did.basic_info
    let len = Object.keys(basic_info).length
    let arr2Size = BTPack.PackArraySize(len)
    let arrUsername = BTPack.PackStr16(basic_info.userName)
    let arrReqName = BTPack.PackStr16(basic_info.reqName)
    let arrReqType = BTPack.PackUint64(basic_info.reqType)
    let arrFeatureTag = BTPack.PackUint64(basic_info.featureTag)
    let arrSampleHash = BTPack.PackStr16(basic_info.sampleHash)
    let arrExpireTime = BTPack.PackUint64(basic_info.expireTime)
    let arrOpType = BTPack.PackUint32(basic_info.opType)
    let arrTokenType = BTPack.PackStr16(basic_info.tokenType)
    let arrPrice = BTPack.PackUint64(basic_info.price)
    let arrFavoriFlag = BTPack.PackUint32(basic_info.favoriFlag)
    let arrDescription = BTPack.PackStr16(basic_info.description)

    let arrBuf = [...arr1Size,...arrDataReqId,...arr2Size,...arrUsername,...arrReqName,...arrReqType,...arrFeatureTag,...arrSampleHash,...arrExpireTime,
    ...arrOpType,...arrTokenType,...arrPrice,...arrFavoriFlag,...arrDescription]

    return arrBuf
}

export const transactionPack = (did) => {
    let arrTokenType = [], num = 3;
    if (did.token_type != 'BTO') {
      arrTokenType = BTPack.PackStr16(did.token_type)
      num = 4
    }

    let arr1Size = BTPack.PackArraySize(num)
    let arrFrom = BTPack.PackStr16(did.from)
    let arrTo = BTPack.PackStr16(did.to)
    let arrPrice = BTPack.PackUint64(did.price)
    // console.log('arrPrice', arrPrice);

    let arrBuf = [...arr1Size,...arrFrom,...arrTo,...arrTokenType,...arrPrice]

    return arrBuf
}


export const buyAssetGrantCreditPack = (did)=>{

    let arrTokenType = [], num = 3;
    if (did.token_type != 'BTO') {
      arrTokenType = BTPack.PackStr16(did.token_type)
      num = 4
    }

    let p1 = BTPack.PackArraySize(num)
    let p2 = BTPack.PackStr16(did.name)
    let p3 = BTPack.PackStr16(did.spender)

    let p4 = BTPack.PackUint64(did.limit)

    return [...p1,...p2,...p3,...arrTokenType,...p4]
}

export const cancelAssetGrantCreditPack = (did)=>{
    let p1 = BTPack.PackArraySize(3)
    let p2 = BTPack.PackStr16(did.name)
    let p3 = BTPack.PackStr16(did.spender)
    let arrTokenType = []
    if (did.token_type != 'BTO') {
      arrTokenType = BTPack.PackStr16(did.token_type)
    }

    return [...p1,...p2,...p3,...arrTokenType]
}

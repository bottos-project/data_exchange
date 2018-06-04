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
    let arrAssetId = BTPack.PackStr16(did.asset_id)

    let basic_info = did.basic_info
    let len = Object.keys(basic_info).length

    let arr2Size = BTPack.PackArraySize(len)

    let arrUsername = BTPack.PackStr16(basic_info.username)
    let arrAssetName = BTPack.PackStr16(basic_info.assetName)
    let arrAssetType = BTPack.PackUint64(basic_info.assetType)
    let arrFeatureTag = BTPack.PackStr16(basic_info.featureTag)
    // let arrSamplePath = BTPack.PackStr16(basic_info.samplePath)
    let arrSampleHash = BTPack.PackStr16(basic_info.sampleHash)
    // let arrStoragePath = BTPack.PackStr16(basic_info.storagePath)
    let arrStorageHash = BTPack.PackStr16(basic_info.storageHash)

    let arrExpireTime = BTPack.PackUint32(basic_info.expireTime)
    let arrOpType = BTPack.PackUint32(basic_info.opType)
    console.log({price:basic_info.price})
    let arrPrice = BTPack.PackUint64(basic_info.price)

    let arrDescription = BTPack.PackStr16(basic_info.description)
    // let arrUploadDate = BTPack.PackUint32(basic_info.uploadDate)
    // let arrSignature = BTPack.PackStr16(basic_info.signature)

    let arrBuf = [...arr1Size,...arrAssetId,...arr2Size,...arrUsername,...arrAssetName,...arrAssetType,
        ...arrFeatureTag,...arrSampleHash,
        ...arrStorageHash,...arrExpireTime,...arrOpType,...arrPrice,...arrDescription]

    return arrBuf
}

export const registDemandPack = (did)=>{
    let arr1Size = BTPack.PackArraySize(2)
    let arrDataReqId = BTPack.PackStr16(did.dataReqId)

    let basic_info = did.basic_info
    let len = Object.keys(basic_info).length
    let arr2Size = BTPack.PackArraySize(len)
    let arrUsername = BTPack.PackStr16(basic_info.Username)
    let arrReqName = BTPack.PackStr16(basic_info.RequirementName)
    let arrReqType = BTPack.PackUint64(basic_info.RequirementType)
    let arrFeatureTag = BTPack.PackUint64(basic_info.FeatureTag)
    let arrSampleHash = BTPack.PackStr16(basic_info.SampleHash)
    let arrExpireTime = BTPack.PackUint64(basic_info.ExpireTime)
    let arrOpType = BTPack.PackUint32(basic_info.OpType)
    let arrPrice = BTPack.PackUint64(basic_info.Price)
    let arrFavoriFlag = BTPack.PackUint32(basic_info.FavoriFlag)
    let arrDescription = BTPack.PackStr16(basic_info.Description)

    let arrBuf = [...arr1Size,...arrDataReqId,...arr2Size,...arrUsername,...arrReqName,...arrReqType,...arrFeatureTag,...arrSampleHash,...arrExpireTime,
    ...arrOpType,...arrPrice,...arrFavoriFlag,...arrDescription]

    return arrBuf
}


export const transactionPack = (did)=>{
    let arr1Size = BTPack.PackArraySize(4)
    let arrFrom = BTPack.PackStr16(did.from)
    let arrTo = BTPack.PackStr16(did.to)
    let arrPrice = BTPack.PackUint64(did.price)
    let arrRemark = BTPack.PackStr16(did.remark)

    let arrBuf = new ArrayBuffer()
    arrBuf = [...arr1Size,...arrFrom,...arrTo,...arrPrice,...arrRemark]

    return arrBuf
}

export const favoritePack = (did) => {

  let b1 = BTPack.PackArraySize(4)
  let b2 = BTPack.PackStr16(did.Username)
  let b3 = BTPack.PackUint32(did.OpType)
  let b4 = BTPack.PackStr16(did.GoodsType)
  let b5 = BTPack.PackStr16(did.GoodsId)

  return [...b1,...b2,...b3,...b4,...b5]
}

export const buyAssetGrantCreditPack = (did)=>{
    let p1 = BTPack.PackArraySize(3)
    let p2 = BTPack.PackStr16(did.name)
    let p3 = BTPack.PackStr16(did.spender)
    let p4 = BTPack.PackUint64(did.limit)

    return [...p1,...p2,...p3,...p4]
}

export const cancelAssetGrantCreditPack = (did)=>{
    let p1 = BTPack.PackArraySize(2)
    let p2 = BTPack.PackStr16(did.name)
    let p3 = BTPack.PackStr16(did.spender)

    return [...p1,...p2,...p3]
}
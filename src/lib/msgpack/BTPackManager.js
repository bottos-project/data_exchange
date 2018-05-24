import * as BTPack from './msgpack'
import * as BTCrypto from 'bottos-js-crypto'


export const registAssetPack = (did)=>{
    let arr1Size = BTPack.PackArraySize(2)
    let arrAssetId = BTPack.PackStr16(did.asset_id)

    let basic_info = did.basic_info
    let len = Object.keys(basic_info).length

    let arr2Size = BTPack.PackArraySize(len)

    let arrUsername = BTPack.PackStr16(basic_info.username)
    let arrAssetName = BTPack.PackStr16(basic_info.assetName)
    let arrAssetType = BTPack.PackStr16(basic_info.assetType)
    let arrFeatureTag = BTPack.PackStr16(basic_info.featureTag)
    // let arrSamplePath = BTPack.PackStr16(basic_info.samplePath)
    let arrSampleHash = BTPack.PackStr16(basic_info.sampleHash)
    // let arrStoragePath = BTPack.PackStr16(basic_info.storagePath)
    let arrStorageHash = BTPack.PackStr16(basic_info.storageHash)

    let arrExpireTime = BTPack.PackUint32(basic_info.expireTime)
    let arrOpType = BTPack.PackUint32(basic_info.opType)
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

    let arrBuf = new ArrayBuffer()
    arrBuf = [...arr1Size,...arrDataReqId,...arr2Size,...arrUsername,...arrReqName,...arrReqType,...arrFeatureTag,...arrSampleHash,...arrExpireTime,
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

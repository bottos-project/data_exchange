import BTFetch from './BTFetch'

// 获取区块信息
export const getBlockInfo = async()=>{
    let reqUrl = '/user/GetBlockInfo'
    return await BTFetch(reqUrl,'GET')
}

// 获取data信息
export const getDataInfo = async(params)=>{
    let reqUrl = '/user/GetDataBin'
    // let params = {
    //     username:'btd352'
    // }
    return await BTFetch(reqUrl,'POST',params)
}
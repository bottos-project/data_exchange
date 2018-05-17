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

export const fetchWithBlockHeader = async(url,method,params,options)=>{
    let blockHeader = await BTFetch('/user/GetBlockHeader','GET')
    if(!(blockHeader && blockHeader.code==1)){
        message.error('block header get faild');
        return
    }

    let data = blockHeader.data
    params.cursor_label = data.cursor_label
    params.cursor_num = data.head_block_num
    params.lifetime = data.head_block_time

    return await BTFetch(url,method,params,options)
}

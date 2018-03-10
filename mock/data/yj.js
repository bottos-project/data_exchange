exports.asset_modify = (ctx)=>{
    ctx.response.body = {
        assetDetail: [
            {
                "asset_name":"assetName1",
                "type":"数据清洗",
                "price":"300",
                "file_name":"pandas",
                "file_size":"100M",
                "description":"lovely pandas"
            },
            {
                "asset_name":"assetName2",
                "type":"数据清洗",
                "price":"200",
                "file_name":"cats",
                "file_size":"200M",
                "description":"lovely cats"
            }
        ],
    }
}
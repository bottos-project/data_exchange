// import React,{PureComponent} from 'react'
// import { Table, } from 'antd';
//
// const data = [];
// for (let i = 0; i < 7; ++i) {
//     data.push({
//         key: i,
//         price: '150',
//         fileName:"pandas.zip",
//         fileSize:"123M",
//         date: '2018-01-15 23:12:00',
//         from:"Jack",
//     });
// }
// const columns = [
//     { title: 'price', dataIndex: 'price', key: 'price' },
//     { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
//     { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },
//     { title: 'date', dataIndex: 'date', key: 'date' },
//     { title: 'From', dataIndex: '', key: 'y', render: ()=>
//             <div>
//                 <a href="#">John</a>
//             </div>
//     },
//
// ];
//
// export default class BTHaveBought extends PureComponent{
//     constructor(props){
//         super(props)
//     }
//
//     render(){
//         return(
//             <Table
//                 columns={columns}
//                 dataSource={data}
//             />
//         )
//     }
// }
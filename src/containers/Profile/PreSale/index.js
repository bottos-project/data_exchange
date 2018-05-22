import React, { Component } from 'react';
import { Table, Icon, message, Button } from 'antd'
import BTFetch from "@/utils/BTFetch";
import { getAccount } from "@/tools/localStore";
import { getSignaturedParam } from '@/utils/BTCommonApi'
import { FormattedMessage } from 'react-intl'

function queryPresaleByPageNum(n) {
  return BTFetch("/user/queryMyPreSale", "post", {
    ...getSignaturedParam(getAccount()),
    "pageSize": 16,
    "pageNum": n,
  })
}

class PreSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  columns() {
      // return  [
      //     { title: <FormattedMessage {...CheckMessages.AssetID}/>, dataIndex: 'asset_name', key: 'asset_id',render:(item)=>{
      //             return <span>{item.length<25?item:item.substring(0,25)+'...'}</span>
      //         }},
      //     { title: <FormattedMessage {...CheckMessages.Consumer}/>, dataIndex: 'consumer', key:'consumer' },
      //     { title: <FormattedMessage {...CheckMessages.DataPresaleId}/>, dataIndex: 'data_req_name', key:'data_req_name',
      //         render:(item)=>{
      //             return <span>{item.length<25?item:item.substring(0,25)+'...'}</span>
      //         }},
      //     { title: <FormattedMessage {...CheckMessages.DataTime}/>, dataIndex: 'createTime', key:'data_req_id',
      //       render: item => getDateAndTime(item)
      //     },
      //     // { title: <FormattedMessage {...CheckMessages.UserName}/>, dataIndex: 'username', key:'user_name' },
      //     { title: <FormattedMessage {...CheckMessages.View}/>,dataIndex:'asset_id',key:'x',render:(item)=>
      //             <Button onClick={()=>this.lookfor(item)}>
      //                 <FormattedMessage {...CheckMessages.View}/>
      //             </Button>
      //     }
      // ];
  }

  componentDidMount() {

    queryPresaleByPageNum(1)
    .then(res => {
      if (res.code == 1) {
        if (res.data.rowCount > 0) {
          this.setState({
            data: res.data.row
          })
        } else {
          console.log('暂无数据');
        }

      } else {
        console.log('请求出错');
      }
    })

  }

  render() {

    const columns = this.columns()

    return (
      <div className="container column">
        <Table
            className="shadow radius table"
            columns={columns}
            dataSource={this.state.data}
        />

      </div>
    );
  }

}

export default PreSale;

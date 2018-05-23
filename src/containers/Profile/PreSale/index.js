import React, { Component } from 'react';
import { Table, Icon, message, Button } from 'antd'
import BTFetch from "@/utils/BTFetch";
import { getAccount } from "@/tools/localStore";
import { getSignaturedParam } from '@/utils/BTCommonApi'
import { FormattedMessage } from 'react-intl'
import messages from '@/locales/messages'
import { getDateAndTime } from '@/utils/dateTimeFormat'

const CheckMessages = messages.Check;

function queryPresaleByPageNum(n) {
  return BTFetch("/asset/queryMyPreSale", "post", {
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
      return  [
          { title: <FormattedMessage {...CheckMessages.AssetID}/>, dataIndex: 'asset_name',
            render:(item)=> <span>{item}</span>
          },
          { title: <FormattedMessage {...CheckMessages.Consumer}/>, dataIndex: 'consumer', key:'consumer' },
          { title: <FormattedMessage {...CheckMessages.DataPresaleId}/>, dataIndex: 'data_req_name',
            render:(item)=> <span>{item}</span>
          },
          { title: <FormattedMessage {...CheckMessages.DataTime} />, dataIndex: 'time',
            render: getDateAndTime
          },
          // { title: <FormattedMessage {...CheckMessages.UserName}/>, dataIndex: 'username', key:'user_name' },
          { title: <FormattedMessage {...CheckMessages.View}/>,dataIndex:'asset_id',key:'x',
            render: (item) => <Button>
              <FormattedMessage {...CheckMessages.View} />
            </Button>
          }
      ];
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
            rowKey='asset_id'
        />

      </div>
    );
  }

}

export default PreSale;

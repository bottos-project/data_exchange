import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import { Table, Icon, message, Button } from 'antd'
import BTFetch from "@/utils/BTFetch";
import { getAccount } from "@/tools/localStore";
import { getSignaturedParam } from '@/utils/BTCommonApi'
import { FormattedMessage } from 'react-intl'
import messages from '@/locales/messages'
import { getDateAndTime } from '@/utils/dateTimeFormat'
const CheckMessages = messages.Check;
const PresaleMessages = messages.Presale;

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

    this.checkTheAsset = this.checkTheAsset.bind(this)
  }

  columns() {
    return [
      {
        title: <FormattedMessage {...CheckMessages.DataPresaleId}/>,
        dataIndex: 'data_req_name',
        render:(item)=> <span>{item}</span>
      },
      { title: <FormattedMessage {...PresaleMessages.Consumer}/>, dataIndex: 'consumer' },
      { title: <FormattedMessage {...CheckMessages.AssetID}/>, dataIndex: 'asset_name',
        render:(item)=> <span>{item}</span>
      },
      { title: <FormattedMessage {...CheckMessages.DataTime} />, dataIndex: 'time',
        render: getDateAndTime
      },
      // { title: <FormattedMessage {...CheckMessages.UserName}/>, dataIndex: 'username' },
      { title: <FormattedMessage {...CheckMessages.View} />, dataIndex:'data_req_id',
        render: (data_req_id) => <Button onClick={() => this.checkTheAsset(data_req_id)}>
          <FormattedMessage {...CheckMessages.View} />
        </Button>
      }
    ]
  }

  checkTheAsset(req_id) {
    BTFetch("/requirement/QueryById", "post", { req_id, sender: getAccount().username })
    .then(res => {
      if (!res || res.code != 1) {
        throw new Error('Failed To Get The Requirement Details')
      }
      hashHistory.push({
        pathname: '/demand/detail',
        state: res.data
      })
    })
    .catch(err => {
      window.message.error(window.localeInfo['Demand.FailedToGetTheRequirementDetails'])
      console.error('/requirement/QueryById err', err);
    })

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

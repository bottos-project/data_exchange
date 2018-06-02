import React from 'react'
import {hashHistory} from 'react-router'
import { Button, Popconfirm } from 'antd'
import BTTable from '@/components/BTTable'

import BTFetch from '@/utils/BTFetch'
import { getSignaturedParam } from '@/utils/BTCommonApi'
import {getAccount} from "@/tools/localStore";

import { getDateAndTime } from '@/utils/dateTimeFormat'
import { getFavReqParam } from '@/components/BTFavoriteStar'

import {FormattedMessage} from 'react-intl'
import messages from '@/locales/messages'

const CollectMessages = messages.Collect;

function lookFor(asset_id) {
  BTFetch('/asset/QueryAssetByID', 'post', {asset_id, sender: getAccount().username})
  .then(res => {
    if(res.code == 1){
      console.log(res.data)
      if (res.data) {
        hashHistory.push({
          pathname:'/assets/detail',
          state:res.data
        })
      }
    } else {
      window.message.error(window.localeInfo["Header.FailedQuery"]);
    }
  })
  .catch(error => {
    window.message.error(window.localeInfo["Header.FailedQuery"]);
  })
}

async function onDelete(good_info) {
  console.log(good_info)
  // packmsg
  let favoriteParam = {
    "Username": getAccount().username,
    "GoodsId": good_info.goods_id,
    "GoodsType": good_info.goodsType || 'asset',
    "OpType": 3, // 3 是删除
  }
  // console.log('favoriteParam', favoriteParam);
  let fetchParam = await getFavReqParam(favoriteParam)

  BTFetch('/user/favorite', 'post', fetchParam)
  .then(res => {
    if (res.code == 1) {
      let data = this.state.data
      console.log('没做完！！！！！！！！！！！！！！');
      // TODO: 下次从这里继续
      this.setState({
        // data: data.filter(o => o.goods_id != good_info.goods_id)
      });
      window.message.success(window.localeInfo["Asset.DeleteCollect"])
    } else {
      window.message.error(window.localeInfo["Asset.FailedCollect"])
    }
  }).catch(err => {
    console.error('delete error', err);
  })

}

const columns = [
  { title: <FormattedMessage {...CollectMessages.GoodName}/>, dataIndex: 'goods_name' },
  { title: <FormattedMessage {...CollectMessages.From}/>, dataIndex: 'username'},
  { title: <FormattedMessage {...CollectMessages.Time}/>, dataIndex: 'time',
    render: getDateAndTime
  },
  { title: <FormattedMessage {...CollectMessages.Delete}/>, key:'x',
    render: (item) =>
      <Popconfirm
        title={<FormattedMessage {...CollectMessages.SureToDelete} />}
        onConfirm={() => onDelete(item)}
        okText={<FormattedMessage {...CollectMessages.OK} />}
        cancelText={<FormattedMessage {...CollectMessages.Cancel} />}
        >
        <a href="#">
          <FormattedMessage {...CollectMessages.Delete}/>
        </a>
      </Popconfirm>
    ,
  },
  {
    title: <FormattedMessage {...CollectMessages.ViewTheDetails}/>, dataIndex: 'goods_id',
    render:(asset_id) =>
      <Button onClick={() => lookFor(asset_id)}><FormattedMessage {...CollectMessages.View}/></Button>
  },
]

// "assetType": 0,

function BTCollect(props) {
  return <BTTable
    columns={columns}
    rowKey='goods_id'
    url='/user/GetFavorite'
    options={{
      ...getSignaturedParam(getAccount()),
      goods_type: 'asset' // asset 或者 requirement
    }}
    catchError={(err) => console.error(error)}
    // dataChange={}
    {...props}
  />
}

export default BTCollect

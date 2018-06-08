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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

function getColumns() {
  return [
    { title: <FormattedMessage {...CollectMessages.GoodName}/>, dataIndex: 'goods_name' },
    { title: <FormattedMessage {...CollectMessages.From}/>, dataIndex: 'username'},
    { title: <FormattedMessage {...CollectMessages.Time}/>, dataIndex: 'time',
      render: getDateAndTime
    },
    { title: <FormattedMessage {...CollectMessages.Delete}/>, key:'x',
      render: (item) =>
        <Popconfirm
          title={<FormattedMessage {...CollectMessages.SureToDelete} />}
          onConfirm={() => {
            console.log('this', this);
            this.onDelete(item)
          }}
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
}

// "assetType": 0,

class FavoriteReqList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      id: ''
    };
    this.columns = getColumns.call(this)

    this.onDelete = this.onDelete.bind(this)
    this.dataChange = this.dataChange.bind(this)
  }

  async onDelete(good_info) {
    console.log(good_info)
    // packmsg
    let favoriteParam = {
      "Username": getAccount().username,
      "GoodsId": good_info.goods_id,
      "GoodsType": 'requirement',
      "OpType": 3, // 3 是删除
    }
    // console.log('favoriteParam', favoriteParam);
    let fetchParam = await getFavReqParam(favoriteParam)

    BTFetch('/user/favorite', 'post', fetchParam)
    .then(res => {
      if (res.code == 1) {
        // let data = this.state.data
        console.log('good_info.goods_id', good_info.goods_id);
        this.setState({
          index: this.state.index + 1,
          id: good_info.goods_id
        });
        window.message.success(window.localeInfo["Asset.DeleteCollect"])
      } else {
        window.message.error(window.localeInfo["Asset.FailedCollect"])
      }
    }).catch(err => {
      console.error('delete error', err);
    })

  }

  dataChange(state) {
    // console.log('state', state);
    const { dataSource, total } = state
    // console.log('this.state', this.state);
    let data = dataSource.filter(o => o.goods_id != this.state.id)
    // console.log('data', data);
    return {...state, dataSource: data, total: total - 1 }
  }

  render() {
    return <BTTable
      columns={this.columns}
      rowKey='goods_id'
      url='/user/GetFavorite'
      options={{
        ...getSignaturedParam(getAccount()),
        goods_type: 'requirement' // asset 或者 requirement
      }}
      index={this.state.index}
      catchError={(err) => console.error(error)}
      dataChange={this.dataChange}
      {...this.props}
    />
  }
}

export default FavoriteReqList

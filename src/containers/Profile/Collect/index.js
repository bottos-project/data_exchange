import React, { PureComponent } from 'react'
import {Row,Col,Table,Button,Popconfirm} from 'antd'
import BTFetch from '@/utils/BTFetch'
import { getSignaturedParam } from '@/utils/BTCommonApi'
import {hashHistory} from 'react-router'
import {FormattedMessage} from 'react-intl'
import messages from '@/locales/messages'
import {getAccount} from "@/tools/localStore";
import { getDateAndTime } from '@/utils/dateTimeFormat'
import { getFavReqParam } from '@/components/BTFavoriteStar'

const CollectMessages = messages.Collect;

export default class BTCollect extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }
    columns (){
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
              onConfirm={() => this.onDelete(item)}
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
            <Button onClick={()=>this.lookfor(asset_id)}><FormattedMessage {...CollectMessages.View}/></Button>
        },
      ];
    }

    onSelectChange(selectedRowKeys){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    lookfor(asset_id){
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

    onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    async onDelete(good_info){
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
          this.setState({
            data: data.filter(o => o.goods_id != good_info.goods_id)
          });
          window.message.success(window.localeInfo["Asset.DeleteCollect"])
        } else {
          window.message.error(window.localeInfo["Asset.FailedCollect"])
        }
      }).catch(err => {
        console.error('delete error', err);
      })

    }

    componentDidMount(){
        if(!getAccount()){
           message.warning(window.localeInfo['Header.PleaseLogInFirst']);
           return;
        }

        BTFetch('/user/GetFavorite', 'post', {
          ...getSignaturedParam(getAccount()),
          goods_type: 'asset' // asset 或者 requirement
        })
        .then(res => {
            if(res.code==1){
                let data=res.data;
                this.setState({
                    data:res.data.row||[]
                })
                // console.log(data);
            }else{
                message.warning('暂无资产加入收藏')
            }
        }).catch(error=>{
            console.error(error)
        })
    }

    render(){
        const columns = this.columns();
        return (
            <div className="container column">
                <Table
                  className="table route-children-bg"
                  columns={columns}
                  dataSource={this.state.data}
                  rowKey='goods_id'
                />
            </div>
        );
    }
}

import React,{PureComponent} from 'react'
import { Table,message } from 'antd';
import BTFetch from '../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import { getDateAndTime } from '@/utils/dateTimeFormat'
import './style.less'
import messages from '../../locales/messages'
const HistoryMessages = messages.History;


export default class BTDashboard extends PureComponent{
  constructor(props){
      super(props);
      this.state={
          data:[],
          rowCount:'',
      }
      this.onChange=this.onChange.bind(this)
  }
  columns(data){
      return [
          { title: <FormattedMessage {...HistoryMessages.TransactionID} />, dataIndex: 'transaction_id',
            render: (item) => {
              return <span style={{maxWidth:124}} className='one_txt_cut'>{item.slice(0, 15)+'...'}</span>
          }},
          { title: <FormattedMessage {...HistoryMessages.Merchandise} />, dataIndex: 'asset_name'},
          { title: <FormattedMessage {...HistoryMessages.Price} />, dataIndex: 'price',
            render: (price) => <div className=''>
                        <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                        <span>{price/Math.pow(10, 8)}</span>
                    </div>,
            align: 'left'
          },
          { title: <FormattedMessage {...HistoryMessages.From} />, dataIndex: 'from'},
          { title: <FormattedMessage {...HistoryMessages.To} />, dataIndex: 'to'},
          { title: <FormattedMessage {...HistoryMessages.Date} />, dataIndex: 'timestamp',
            render: getDateAndTime
          },
          { title: <FormattedMessage {...HistoryMessages.Block}/>, dataIndex: 'block_number'},
      ];
  }

  componentDidMount(){
      this.getPagination(1,10);
  }

  onChange(page, pageSize) {
      this.getPagination(page, pageSize);
  }

  pagination(){
      let pagination={
          total:this.state.rowCount,
          defaultCurrent:1,
          pageSize:10,
          showQuickJumper:true,
          onChange:this.onChange
      }
      return pagination
  }

  getPagination(page,pageSize){
      let param={
          pageSize:pageSize,
          pageNum:page
      };
      BTFetch('/dashboard/GetTxList','POST',param).then(res => {
          if (res.data.row_count > 0 && res.code == 1) {
              let data=res.data.row;
              this.setState({
                  data,
                  rowCount:res.data.rowCount
              })
          }
      });
  }

  render(){
      const { data } = this.state;
      const columns = this.columns(data);
      return(
        <div className="container column">
          <Table pagination={this.pagination()}
            className="shadow radius table"
            columns={columns}
            dataSource={this.state.data}
            size="middle"
            rowKey='transaction_id'
          />
        </div>
      )
  }

}

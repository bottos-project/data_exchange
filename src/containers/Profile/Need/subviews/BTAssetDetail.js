import React,{PureComponent} from 'react'
import {Popconfirm,Table,message} from 'antd';
import BTFetch from "../../../../utils/BTFetch";
import BTCryptTool from 'bottos-js-crypto'
import { getDateAndTime } from '@/utils/dateTimeFormat'
const { queryProtoEncode } = require('@/lib/proto/index');

import {FormattedMessage} from 'react-intl'
import {getAccount} from "../../../../tools/localStore";
import messages from '../../../../locales/messages'
const PersonalDemandMessages = messages.PersonalDemand;

export default class BTAssetDetail extends PureComponent{
    constructor(props){
        super(props)
        const data = [];
        this.state = {
            data:[],
            username:getAccount().username||'',
            token:getAccount().token||'',
        };
    }

    columns(data){
        console.log({
            data
        })

        return [
            { title: <FormattedMessage {...PersonalDemandMessages.RequirementName}/>, dataIndex: 'requirement_name',
              render:(title)=>{
                return <span>{title.length<25?title:title.substring(0,25)+'...'}</span>
            }},
            // { title: <FormattedMessage {...PersonalDemandMessages.FeatureTag}/>, dataIndex: 'feature_tag', key: 'type' },
            { title: <FormattedMessage {...PersonalDemandMessages.ExpectedPrice}/>, dataIndex: 'price', key: 'price' ,
              render:(price)=>{
                return <span>{price/Math.pow(10, 8)}</span>
            }},
            { title: <FormattedMessage {...PersonalDemandMessages.DemandDescription}/>, dataIndex: 'description',
              render:(title)=>{
                return <span>{title.length<25?title:title.substring(0,25)+'...'}</span>
            }},
            { title: <FormattedMessage {...PersonalDemandMessages.PublishDate}/>, dataIndex:'publish_date',
              render: getDateAndTime
            },
            { title: <FormattedMessage {...PersonalDemandMessages.Deadline}/>, dataIndex: 'expire_time',
              render: getDateAndTime
            },
            /*{ title: <FormattedMessage {...PersonalDemandMessages.SampleDownload}/>, dataIndex: 'sample_path',
            render:(sample_path)=>{
                    return(
                        <a href={sample_path}>Download</a>
                    )

                }},*/
           /* { title: 'Delete', dataIndex: 'delete',key:'y',
                render: (text, record) => {
                    return (
                        // this.state.dataSource.length > 1 ?
                        //     (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                            <a href="#">
                                <FormattedMessage {...PersonalDemandMessages.Download}/>
                            </a>
                        </Popconfirm>
                        // ) : null
                    );
                },
            },*/
            // { title: 'Deadline', dataIndex: 'deadline', key: 'deadline' },
        ];
    }

    onDelete(key){
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
        const deleteDataSource = this.state.data[key];//被删除的一行的数据
        BTFetch("","post",deleteDataSource).then((data)=>{
            console.log(data)
        })
    }
    componentDidMount() {

        function getSignaturedParam({username, privateKey}) {
          if (typeof username != 'string' || typeof privateKey != 'string') {
            console.error('type error');
          }
          let random = Math.random().toString(16).slice(2)
          let msg = {username,random}
          let query_pb = require('@/lib/proto/query_pb')
          let loginProto = queryProtoEncode(query_pb, msg)
          let hash = BTCryptTool.sha256(BTCryptTool.buf2hex(loginProto))
          let signature = BTCryptTool.sign(hash, Buffer.from(privateKey, 'hex')).toString('hex')
          return {username,signature,random}
        }

        BTFetch("/requirement/QueryByUsername", 'post', {
          ...getSignaturedParam(getAccount()),
          page_size: 20,
          page_num: 1
        }).then(res => {
          if (res.code == 1) {
            if (res.data.row_count > 0) {
              this.setState({ data: res.data.row })
            }
          }else{
            console.log('res.details', JSON.parse(res.details));
            message.warning(window.localeInfo["PersonalDemand.ThereIsNoHavePublishedDemandForTheTimeBeing"])
          }
        }).catch(error=>{
                window.message.error(window.localeInfo["PersonalDemand.ThereIsNoHavePublishedDemandForTheTimeBeing"])
        })
    }


    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
            <div>
                <Table className="shadow radius table" dataSource={this.state.data} columns={columns} rowKey='requirement_id' />
            </div>
        )
    }
}

import React,{PureComponent} from 'react'
import {Popconfirm,Table,message} from 'antd';
import BTFetch from "../../../../utils/BTFetch";
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
            { title: <FormattedMessage {...PersonalDemandMessages.RequirementName}/>, dataIndex: 'requirement_name', key: 'title',render:(title)=>{
                return <span>{title.length<25?title:title.substring(0,25)+'...'}</span>
                } },
            // { title: <FormattedMessage {...PersonalDemandMessages.FeatureTag}/>, dataIndex: 'feature_tag', key: 'type' },
            { title: <FormattedMessage {...PersonalDemandMessages.ExpectedPrice}/>, dataIndex: 'price', key: 'price' ,render:(price)=>{
                return <span>{price/Math.pow(10,10)}</span>
                }},

            { title: <FormattedMessage {...PersonalDemandMessages.DemandDescription}/>, dataIndex: 'description', key: 'description' ,render:(title)=>{
                return <span>{title.length<25?title:title.substring(0,25)+'...'}</span>
                }},
            { title: <FormattedMessage {...PersonalDemandMessages.PublishDate}/>, dataIndex:'publish_date', key: 'publishDate',render:(time)=>{
                return <span>{(new Date(time*1000)).toLocaleDateString()}</span>
                }},
            { title: <FormattedMessage {...PersonalDemandMessages.Deadline}/>, dataIndex: 'expire_time', key: 'expire_time' ,render:(time)=>{
                    return <span>{(new Date(time*1000)).toLocaleDateString()}</span>
                }},
            /*{ title: <FormattedMessage {...PersonalDemandMessages.SampleDownload}/>, dataIndex: 'sample_path', key: 'sample' ,render:(sample_path)=>{
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
        /*if(getAccount()){
            this.setState({
                username:getAccount().username,
                token:getAccount().token,
            })
        }*/
        let param={
            "pageSize":20,
            "pageNum":1,
            "username":getAccount().username
            // "featureTag":12345
        };
        BTFetch("/requirement/query",'post',param)
            .then(res=>{
                console.log(res.data);
                if(res&&res.code==0){
                    if(res.data.rowCount==0){
                        // message.warning(window.localeInfo["PersonalDemand.ThereIsNoDataForTheTimeBeing"])
                        return;
                    }
                    this.setState({
                        data:res.data.row,
                    });
                }else{
                    message.warning(window.localeInfo["PersonalDemand.ThereIsNoHavePublishedDemandForTheTimeBeing"])
                }
        }).catch(error=>{
                    message.error(window.localeInfo["PersonalDemand.ThereIsNoHavePublishedDemandForTheTimeBeing"])
        })
    }


    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(

            <div>
                <Table className="shadow radius table" bordered dataSource={this.state.data} columns={columns} />
            </div>
        )
    }
}
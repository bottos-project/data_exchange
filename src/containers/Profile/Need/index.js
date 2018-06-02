import React from 'react'
import './styles.less';

import { getSignaturedParam } from "@/utils/BTCommonApi";
import { getAccount } from "@/tools/localStore";
import { getDateAndTime } from '@/utils/dateTimeFormat'

import BTTable from '@/components/BTTable'

import {FormattedMessage} from 'react-intl'
import messages from '@/locales/messages'
const PersonalDemandMessages = messages.PersonalDemand;


const columns = [
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
    // { title: 'Deadline', dataIndex: 'deadline', key: 'deadline' },
]

function BTProfileNeed(props) {
  return <BTTable
    columns={columns}
    rowKey='requirement_id'
    url='/requirement/QueryByUsername'
    options={getSignaturedParam(getAccount())}
    catchError={(err) => message.error(window.localeInfo["PersonalDemand.ThereIsNoHavePublishedDemandForTheTimeBeing"])}
    {...props}
  />
}

export default BTProfileNeed

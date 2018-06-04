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

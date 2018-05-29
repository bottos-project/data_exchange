import React, {Component} from 'react'
import { hashHistory } from 'react-router'
import './styles.less'
import BTFetch from '../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import {getAccount} from "../../../tools/localStore";
import messages from '../../../locales/messages'
const AssetMessages = messages.Asset;


const typeMap = {
  11: 'text',
  12: 'picture',
  13: 'voice',
  14: 'video',
}

class Assetlist extends Component {

    handleClick = () => {

      const username = getAccount() ? getAccount().username : ''
      const { asset_id } = this.props.list

      BTFetch('/asset/QueryAssetByID', 'post', {
        asset_id,
        sender: username
      })
      .then(res => {
        if (!res || res.code != 1) {
          throw new Error('Failed To Get The Asset Details')
        }
        // console.log('res.data', res.data);
        hashHistory.push({
          pathname: '/assets/detail',
          state: res.data
        })
      })
      .catch(err => {
        // window.message.error(window.localeInfo['Demand.FailedToGetTheRequirementDetails'])
        console.error('/requirement/QueryById err', err);
      })

    }

    render() {
        let data = this.props.list;
        const asset_type = data.asset_type || 0
        let className = 'assetList ' + typeMap[asset_type]
        return (
            <div className={className} onClick={this.handleClick}>
                <h4 className='txt_cut'>
                  {data.asset_name}
                </h4>
                <p>
                  <FormattedMessage {...AssetMessages.Publisher}/>
                  {data.username}
                </p>
                <p>{data.feature_tag}</p>
                <div>
                  <FormattedMessage {...AssetMessages.ExpectedPrice}/>
                  <span>{data.price/Math.pow(10, 8)}</span>
                  <img src="./img/token.png" width='18' alt="" style={{paddingLeft:'4px'}}/>
                </div>
            </div>
        )
    }
}

export default Assetlist

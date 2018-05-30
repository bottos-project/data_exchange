import React from 'react';
import { FormattedMessage } from 'react-intl'
import messages from '@/locales/messages'

const AssetMessage = messages.Asset

// type select in publish
export const selectType = {
  11: <FormattedMessage {...AssetMessage.Text } />,
  12: <FormattedMessage {...AssetMessage.Picture } />,
  13: <FormattedMessage {...AssetMessage.Voice } />,
  14: <FormattedMessage {...AssetMessage.Video } />,
}
// asset and requirement type keyMap
export const arTypeKeyMap = {
  0: <FormattedMessage {...AssetMessage.All } />,
  ...selectType
}

export const typeValueKeyMap = {
  11: 'text',
  12: 'picture',
  13: 'voice',
  14: 'video',
}

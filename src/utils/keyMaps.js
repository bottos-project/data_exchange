import React from 'react';
import { FormattedMessage } from 'react-intl'
import messages from '@/locales/messages'

const AssetMessage = messages.Asset

// asset and requirement type keyMap
export const arTypeKeyMap = {
  0: <FormattedMessage {...AssetMessage.All } />,
  11: <FormattedMessage {...AssetMessage.Text } />,
  12: <FormattedMessage {...AssetMessage.Picture } />,
  13: <FormattedMessage {...AssetMessage.Voice } />,
  14: <FormattedMessage {...AssetMessage.Video } />,
}

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

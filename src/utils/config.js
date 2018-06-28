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

var base_url = 'http://139.219.133.94:8080/'
// var base_url = 'http://139.219.130.112:8080/'
// var base_url = 'http://139.219.136.155:8080/'
// var base_url = 'http://139.219.139.198:8080/'
// var base_url = 'http://139.217.202.68:8080/'


if (window.useCustomURL === true && window.base_url != undefined) {
  base_url = window.base_url
}

module.exports = {
    service:{
      base_url,
      version:'v3'
    },
    mock:{
        base_url:"http://192.168.9.242:8080/v3"
        // base_url:"http://192.168.9.223:8080/v3"
    }
}

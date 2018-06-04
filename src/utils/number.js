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
export function toFixedWithoutZero(n, x) {
  if (x == undefined) {
    console.error('请输入位数 x');
    return n
  }
  let s1 = n.toString()
  if (!s1.includes('.')) {
    return n
  }
  let nArr = s1.split('.')
  let xiaoshu = nArr[1]
  if (xiaoshu.length < 7) {
    return n
  } else {
    nArr[1] = xiaoshu.slice(0, x)
    return parseFloat(nArr.join('.'))
  }
}

export function int10ToStr16(i10) {
  var s16 = i10.toString(16)
  // console.log('s16', s16);
  if (s16.length == 1) {
    s16 = '0' + s16
  }
  return s16
}

'use strict'
const BTPack = require('./msgpack');
const BTCryptTool = require('bottos-crypto-js')
// const { getSignaturedFetchParam } = require('./BTCommonApi')
const BTFetch = require('./BTFetch');
const querystring = require('querystring');
const config = require('./config');
console.log('config', config);
// console.log('BTPack', BTPack);
// console.log('BTCryptTool', BTCryptTool);

const basicType = ['string', 'uint8', 'uint16', 'uint32', 'uint64']

function packByType(type, value) {
  switch (type) {
    case 'string':
      return BTPack.PackStr16(value)
    case 'uint8':
      return BTPack.PackUint8(value)
    case 'uint16':
      return BTPack.PackUint16(value)
    case 'uint32':
      return BTPack.PackUint32(value)
    case 'uint64':
      return BTPack.PackUint64(value)
    default:
      return console.error('Invalid type', type);
  }
}

/**
 * if the type is the basic type
 * return true
 * otherwise return false
 * @param  {String}  type data type
 * @return {Boolean}
 */
function isBasicType(type) {
  return basicType.includes(type)
}

/**
 * get .abi file content
 * @param  {String} contract contract
 * @return {Promise} Promise
 */
function getABI(contract) {
  let param = {
    service: 'bottos',
    method: 'CoreApi.QueryAbi',
    request: JSON.stringify({contract})
  }
  return fetch(config.service.base_url + 'rpc?' + querystring.stringify(param), {
    method: 'POST',
    headers: {
      contentType: 'application/x-www-form-urlencoded'
    }
  }).then(res => res.json()).then(res => {
    // console.log('QueryAbi res', res);
    if (res.errcode == 0) {
      let abi = JSON.parse(res.result)
      console.log('result', abi);
      return abi;
    } else {
      throw new Error(res.msg)
      console.error('error msg', res.msg);
      return null
    }
  })
}

// getABI('assetmng')

function _findFieldsFromStructsByName(structs, name) {
  return structs.find(strc => strc.name == name).fields
}

function parseFields(fields, did, structs) {

  var array = [];

  const keys = Object.keys(fields)

  array = array.concat(BTPack.PackArraySize(keys.length))

  console.log('array', array);

  for (let key of keys) {
    let type = fields[key]

    if (isBasicType(type)) {
      // 是基础类型，直接 pack
      // packByType(type, value)
      let value = did[key]
      if (value == undefined) {
        return console.error('type error: expected type ' + key + ', but not found.', did)
      }

      array = array.concat( packByType(type, value) )
    } else {

      let fields2 = _findFieldsFromStructsByName(structs, type)

      let did2 = did[key] || did.basic_info

      // console.log('fields2, did2', fields2, did2);

      let childArr = parseFields(fields2, did2, structs)
      // console.log('childArr', childArr);
      array = array.concat( childArr )
    }

  }

  return array;

}


function packDID(did, contract, method) {
  // console.log('did, contract, method', did, contract, method);
  return getABI(contract).then(abi => {
    if (abi == null) {
      return ;
    }
    // console.log('abi', abi);
    const { actions, structs } = abi
    // console.log('actions', actions);
    console.log('structs', structs);
    let name = actions.find(act => act.action_name == method).type
    let fields = _findFieldsFromStructsByName(structs, name)
    // console.log('fields', fields);

    return parseFields(fields, did, structs);
  })
}

function packedParam(did, fetchParam, privateKey) {
  const { contract, method } = fetchParam
  fetchParam.param = packDID(did, contract, method)
  return getSignaturedFetchParam({fetchParam, privateKey})
}

exports.packDID = packDID
exports.packedParam = packedParam

const { queryProtoEncode, messageProtoEncode } = require('../lib/proto/index');

function getSignaturedFetchParam({fetchParam, privateKey}) {
  let encodeBuf = messageProtoEncode(message_pb, fetchParam)
  // let chainId = new Uint8Array(16)
  // let newMsgProto = [...encodeBuf,...chainId]
  let hashData = BTCryptTool.sha256(BTCryptTool.buf2hex(encodeBuf) + "00000000000000000000000000000000")
  let sign = BTCryptTool.sign(hashData, privateKey)
  // console.log('sign', sign);
  fetchParam.signature = sign.toString('hex')
  // console.log('fetchParam.signature', fetchParam.signature);
  fetchParam.param = BTCryptTool.buf2hex(fetchParam.param)
  return fetchParam
}

function Pack({contract, method, username, did, blockInfo, privateKey}) {

  let fetchParam = {
    version: 1,
    sender: username,
    contract,
    method,
    sig_alg: 1
  }
  this.did = did
  this.privateKey = privateKey
  if (Pack.isValidBlockInfo(blockInfo)) {
    this.fetchParam = Object.assign({}, blockInfo, fetchParam)
  }
}

/**
 * [isValidBlockInfo description]
 * @param  {Object}  blockInfo [description]
 * @return {Boolean}           [description]
 */
Pack.isValidBlockInfo = function isValidBlockInfo(blockInfo) {
  let keys = Object.keys(blockInfo)
  if (keys.length != 3) {
    throw new Error('Invalid blockInfo', blockInfo)
  }
}

Pack.prototype.getABI = function () {
  return getABI(this.fetchParam.contract);
};

/**
 * [description]
 * @param  {Object} abi abi 文件的内容
 * @param  {Object} did 要 pack 的参数
 * @return {Function}     [description]
 */
Pack.prototype._packDIDByABI = function (abi, did) {
  let method = this.fetchParam.method
  const { actions, structs } = abi
  let name = actions.find(act => act.action_name == method).type
  let fields = _findFieldsFromStructsByName(structs, name)
  // console.log('fields', fields);
  return parseFields(fields, did, structs)
};

Pack.prototype.process = function () {
  pack.getABI()
  .then(abi => {
    let did = this.did
    return this._packDIDByABI(abi, did)
  })
  .then(arr => {
    let { fetchParam, privateKey } = this
    fetchParam.param = arr
    return getSignaturedFetchParam({fetchParam, privateKey})
  })
}
// let arr = fun(did)
// return BTCryptTool.buf2hex(arr)


module.exports = Pack;

// 流程
// getAbi -> Method -> did -> blockInfo -> request

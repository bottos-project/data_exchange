'use strict'
const BTPack = require('../lib/msgpack/msgpack');
const BTCryptTool = require('bottos-crypto-js')
const BTFetch = require('./BTFetch');
const querystring = require('querystring');
const config = require('./config');
// console.log('config', config);
// console.log('BTPack', BTPack);

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
 * the First step
 * get .abi file content
 * @param  {String} contract contract
 * @return {Promise} Promise
 */
function getABI(contract) {
  let param = {
    service: 'bottos',
    method: 'Chain.GetAbi',
    request: JSON.stringify({contract})
  }

  // return fetch('http://192.168.2.189:8080/rpc?' + querystring.stringify(param), {
  return fetch(config.service.base_url + 'rpc?' + querystring.stringify(param), {
    method: 'POST',
    headers: {
      contentType: 'application/x-www-form-urlencoded'
    }
  })
  .then(res => res.json())
  .then(res => {
    // console.log('QueryAbi res', res);
    // if (res.errcode == 0) {
      if (res.result == '') {
        throw new Error('没有内容')
      }
      let abi = JSON.parse(res.result)
      // console.log('result', abi);
      // console.log('result', JSON.stringify(abi, null, 1));
      return abi;
    // } else {
    //   throw new Error(res.msg)
    //   console.error('error msg', res.msg);
    //   return null
    // }
  })
}

// getABI('datadealmng')

/**
 * [_findFieldsFromStructsByName description]
 * @param       {Array} structs [description]
 * @param       {String} name    [description]
 * @return      {Object}         [description]
 */
function _findFieldsFromStructsByName(structs, name) {
  return structs.find(strc => strc.name == name).fields
}

/**
 * [_findStructNameFromActionsByMethod description]
 * @param       {Array} actions [description]
 * @param       {String} method  [description]
 * @return      {String}         [description]
 */
function _findStructNameFromActionsByMethod(actions, method) {
  return actions.find(act => act.action_name == method).type
}


function _packDIDToArr(name, did, structs) {
  var array = [];

  let fields = _findFieldsFromStructsByName(structs, name)

  const keys = Object.keys(fields)

  array = array.concat( Array.from( BTPack.PackArraySize(keys.length) ) )

  // console.log('array', array);

  for (let key of keys) {
    let type = fields[key]

    if (isBasicType(type)) {
      // 是基础类型，直接 pack
      let value = did[key]
      if (value == undefined) {
        return console.error('Type error: expected key ' + key + ', but not found.', did)
      }

      let _packedArr = packByType(type, value)
      // console.log('type, value', type, value);
      // console.log('_packedArr', _packedArr);
      array = array.concat( Array.from(_packedArr) )
    } else {

      let did2 = did[key] || did.basic_info || did.info

      // console.log('fields2, did2', fields2, did2);

      let childArr = _packDIDToArr(type, did2, structs)
      // console.log('childArr', childArr);
      array = array.concat( childArr )
    }

  }

  return array;

}

/**
 * the Second step
 * @param  {Object} did    [description]
 * @param  {Object} abi    [description]
 * @param  {String} method [description]
 * @return {Array}        [description]
 */
function packDIDWithABIandMethod(did, abi, method) {
  const { actions, structs } = abi
  let name = _findStructNameFromActionsByMethod(actions, method)
  return _packDIDToArr(name, did, structs);
}

const { queryProtoEncode, messageProtoEncode } = require('../lib/proto/index');
const message_pb = require('../lib/proto/message_pb')

function _getParamSign(fetchParam, privateKey) {
  let encodeBuf = messageProtoEncode(message_pb, fetchParam)
  // let chainId = new Uint8Array(16)
  // let newMsgProto = [...encodeBuf,...chainId]
  let hashData = BTCryptTool.sha256(BTCryptTool.buf2hex(encodeBuf) + "00000000000000000000000000000000")
  let sign = BTCryptTool.sign(hashData, privateKey)
  // console.log('sign', sign);
  let signature = sign.toString('hex')
  return signature;
}

function _getSignaturedFetchParam(fetchParam, privateKey) {
  let signature = _getParamSign(fetchParam, privateKey)
  let param = BTCryptTool.buf2hex(fetchParam.param)
  let _fetchParam = Object.assign({}, fetchParam, {signature, param})
  // console.log('fetchParam.signature', fetchParam.signature);
  return _fetchParam
}

function packDIDToParamArr(did, fetchParam) {
  const { contract, method } = fetchParam
  return getABI(contract).then(abi => {
    if (abi == null) return ;
    return packDIDWithABIandMethod(did, abi, method);
  })
}

function packedParam(did, fetchParam, privateKey) {
  return packDIDToParamArr(did, fetchParam).then(arr => {
    fetchParam.param = arr
    return _getSignaturedFetchParam(fetchParam, privateKey)
  })
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

Pack.packDIDToParamArr = packDIDToParamArr
Pack.packedParam = packedParam

Pack.prototype.getABI = function () {
  return getABI(this.fetchParam.contract);
};

/**
 * [description]
 * @param  {Object} abi abi 文件的内容
 * @param  {Object} did 要 pack 的参数
 * @return {Function}     [description]
 */
Pack.prototype._packDIDByABI = function (abi) {
  let method = this.fetchParam.method
  const did = this.did
  return packDIDWithABIandMethod(did, abi, method)
};

Pack.prototype.process = function () {
  let { did, fetchParam, privateKey } = this
  return this.getABI()
  .then(_packDIDByABI)
  .then(arr => {
    fetchParam.param = arr
    return _getSignaturedFetchParam(fetchParam, privateKey)
  })
}

module.exports = Pack;

// 流程
// getAbi -> Method -> did -> blockInfo -> request

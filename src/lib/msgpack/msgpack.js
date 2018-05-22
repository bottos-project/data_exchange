const BIN16 = 0xc5
const UINT8  = 0xcc
const UINT16 = 0xcd
const UINT32 = 0xce
const UINT64 = 0xcf
const STR16   = 0xda
const ARRAY16 = 0xdc

const LEN_INT32 = 4
const LEN_INT64 = 8

const MAX16BIT = 2 << (16 - 1)

const REGULAR_UINT7_MAX  = 2 << (7 - 1)
const REGULAR_UINT8_MAX  = 2 << (8 - 1)
const REGULAR_UINT16_MAX = 2 << (16 - 1)
const REGULAR_UINT32_MAX = 2 << (32 - 1)

const SPECIAL_INT8  = 32
const SPECIAL_INT16 = 2 << (8 - 2)
const SPECIAL_INT32 = 2 << (16 - 2)
const SPECIAL_INT64 = 2 << (32 - 2)

const PackUint8 = (value)=>{
    const buf = new Uint8Array(2)
    buf[0]=UINT8;
    buf[1]=value;
    return buf
}

const PackUint16 = (value)=>{
    const buf = new Uint8Array(3)
    buf[0]=UINT16
    buf[1]=value>>8
    buf[2]=value
    return buf
}

const PackUint32 = (value)=>{
    const buf = new Uint8Array(5)
    buf[0]=UINT32
    buf[1]=value>>24
    buf[2]=value>>16
    buf[3]=value>>8
    buf[4]=value
    return buf
}


// TODO:暂时方案
const PackUint64 = (value)=>{
  const buf = new Uint8Array(9)
  buf[0]=UINT64
  buf[1]=0
  buf[2]=0
  buf[3]=0
  buf[4]=0
  buf[5]=value>>24
  buf[6]=value>>16
  buf[7]=value>>8
  buf[8]=value
  return buf
}


const PackBin16 = (vlaue)=>{
  let byteLen = value.byteLength
  let len = byteLen + 3
  let bytes = new ArrayBuffer(len)
  bytes[0] = BIN16
  bytes[1] = len>>8
  bytes[2] = len
  for(let i = 0;i<len;i++){
    bytes[i+3] = value[i]
  }
  return bytes
}

const PackStr16 = (str)=>{
  let len = str.length
  let byteLen = len + 3
  let bytes = new Uint8Array(byteLen)
  bytes[0] = STR16
  bytes[1] = len >> 8
  bytes[2] = len
  for(let i = 0;i<len;i++){
    bytes[i+3] = str[i].charCodeAt(0)
  }
  return bytes
}

const PackArraySize = (length)=>{
  let size = new Uint8Array(3)
  size[0] = ARRAY16
  size[1] = length>>8
  size[2] = length
  return size
}

module.exports = {
  PackUint8,
  PackUint16,
  PackUint32,
  PackUint64,
  PackBin16,
  PackStr16,
  PackArraySize
}

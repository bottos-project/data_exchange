import ecc from 'eosjs-ecc'
import CryptoJS from 'crypto-js'
import eccrypto from 'eccrypto'
var Buffer =  require('buffer/').Buffer;

const {PrivateKey, PublicKey, Signature, Aes, key_utils, config} = ecc;

// 生成公私钥对
const createPubPrivateKeys = async()=>{
    // 生成私钥
    let privateKey = await PrivateKey.randomKey();
    let privateWif = privateKey.toWif();
    let publicKey = PrivateKey.fromWif(privateWif).toPublic();

    return {
        privateKey,
        publicKey,
        privateWif
    }
}

// ECC加密
const eccEncrypto = async(publicKey,data)=>{
    let bufferData = new Buffer(data);
    let encryptData =await eccrypto.encrypt(publicKey,bufferData);
    return encryptData;
}


// 验证publicKey的正确性
const isValidPublic = (publicKey)=>{
    return ecc.isValidPublic(publicKey)
}

// 验证privateKey的正确性
const isValidPrivate = (seed)=>{
    return ecc.isValidPrivate(seed)
}

/**
 * 签名
 * @param {*} data 要签名的铭文 
 * @param {*} privateKey 密钥或者seed
 * @param {*bool} hashData 在签名之前用sha256进行hash，默认为true
 */
const sign = (data,privateKey,hashData=true)=>{
    return ecc.sign(data,privateKey,hashData);
}

/**
 * 
 * @param {*string|buffer} signature 签名
 * @param {*string|buffer} data 被签名的明文信息 
 * @param {*} publicKey 公钥
 * @param {*bool} hashData 验证之前用sha256进行hash，默认为true
 */
const verify = (signature,data,publicKey,hashData=true)=>{
    return ecc.verify(signature,data,publicKey,hashData)
}

// sha256算法
const sha256 = (param)=>{
    return ecc.sha256(param)
}

// AES对称加密
const aesEncrypto = (message,secretKey)=>{
    return CryptoJS.AES.encrypt(message, secretKey);
}

// AES对称解密
const aesDecrypto = (aesSecretMessage, secretKey)=>{
    let bytes  = CryptoJS.AES.decrypt(aesSecretMessage, secretKey);
    let plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

export default {
    createPubPrivateKeys,
    eccEncrypto,
    isValidPublic,
    isValidPrivate,
    sign,
    verify,
    sha256,
    aesEncrypto,
    aesDecrypto
}
import { useEncipherStoreWithOut, IEncipherStore } from '@/store/modules/encipher'
import smCrypto from 'sm-crypto'
import { customAlphabet } from 'nanoid'
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'
import { apiGetPublicKey } from '@/service/api/common'
import MD5 from 'crypto-js/md5'

/**
 * @desc:  获取加密信息
 */
function getEncryptionInfo(): IEncipherStore {
  const encipherStore = useEncipherStoreWithOut()
  return encipherStore
}

/**
 * @desc 生成secretKey
 */
function generateSecretKey(randomString: string): string {
  const { servePublicKey } = getEncryptionInfo()
  const encryptInstance = new JSEncrypt()
  // 公钥
  encryptInstance.setPublicKey(servePublicKey)
  const secretKey = encryptInstance.encrypt(randomString) as string
  return secretKey
}

/**
 * @desc 生成摘要
 */
function generateSignature(encryptContent: string) {
  const sm3 = smCrypto.sm3
  const signature = sm3(encryptContent)
  return signature
}

/**
 * @desc RSA生成公钥和私钥
 */
export function generateClientKey() {
  const encryptInstance = new JSEncrypt()
  //公钥
  const publicKey = formatKey(encryptInstance.getPublicKey())
  //私钥
  const key = encryptInstance.getPrivateKey()
  const privateKey = formatKey(key)
  // 暂存公钥和密钥
  const encryptionStore = useEncipherStoreWithOut()
  encryptionStore.$patch({
    publicKey,
    privateKey,
  })
}

/**
 * @desc 私钥解密
 */
function privateKeyDecrypt(ciphertext: string, responseData: string) {
  const encryptInstance = new JSEncrypt()
  const { privateKey } = getEncryptionInfo()
  encryptInstance.setPrivateKey(privateKey)
  const serverSecretKey = encryptInstance.decrypt(ciphertext) as string
  const sm4 = smCrypto.sm4
  // 解密需要的是16进制
  let decryptData = sm4.decrypt(base64ToHex(responseData), base64ToHex(serverSecretKey))
  // 判断解密结果如果是对象
  if (decryptData.charAt(0) === '{' || decryptData.charAt(0) === '[') {
    decryptData = JSON.parse(decryptData)
  }
  return decryptData
}

/**
 * @desc 使用sm4加密请求参数
 */
function encryptRequestParams(randomString: string, encryptContent: string) {
  const sm4 = smCrypto.sm4
  const encryptParams = sm4.encrypt(encryptContent, randomString)
  return encryptParams
}

function formatGetParams(params: any) {
  let parameters = ''
  for (const key in params) {
    if (typeof params[key] === 'number' || params[key]) {
      parameters += `${key}=${params[key]}&`
    }
  }
  return parameters === '' ? '' : parameters.slice(0, parameters.length - 1)
}

/**
 * @desc 返回xx位随机字符传
 */
function generateRandomString(e?: number) {
  const nanoid = customAlphabet('abcdef0123456789', e || 32)
  const randomId = nanoid()
  return randomId
}

const formatKey = (key: string) => {
  const keyArray = key.split('\n')
  keyArray.splice(0, 1)
  keyArray.splice(keyArray.length - 1, 1)
  return keyArray.join('')
}

/**
 * @desc 公钥加密
 * @param encryptInstance 加密实例
 * @param publicKey 加密的公钥
 * @param plaintext 被加密的字符串
 */
export function publicKeyEncrypt(encryptInstance: any, publicKey: string, plaintext: Object | string) {
  if (plaintext instanceof Object) {
    plaintext = JSON.stringify(plaintext)
  }
  if (publicKey) {
    encryptInstance.setPublicKey(publicKey)
  }
  return encryptInstance.encrypt(plaintext)
}

function base64ToHex(str: string) {
  const raw = window.atob(str)
  let result = ''
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16)
    result += hex.length === 2 ? hex : '0' + hex
  }
  return result
}

/**
 * @desc 获取加密状态和服务端公钥
 */
export const getPublicKey = async () => {
  const { code, data } = await apiGetPublicKey()
  if (code === 20000) {
    const encipherStore = useEncipherStoreWithOut()
    encipherStore.$patch({
      servePublicKey: data.publicKey,
      encryptEnable: data.encryptEnable,
    })
  }
}

/**
 * @desc 请求加密
 */
export const encipherRequestMiddleware = (config: any) => {
  const { encryptEnable, publicKey } = getEncryptionInfo()
  if (encryptEnable && config.headers) {
    // 生成随机字符串
    const randomString = generateRandomString()
    // 生成secretKey
    const secretKey = generateSecretKey(randomString)
    // 修改请求类型为text
    config.headers['Content-Type'] = 'text/plain'
    // 添加自定义请求头
    config.headers['Cvit-Public-Key'] = publicKey
    config.headers['Cvit-Secret-Key'] = secretKey
    const { method, params, data } = config
    let signatureContent = ''
    switch (method) {
      case 'get':
        if (params) {
          const newParams = formatGetParams(params)
          // 通过请求参数生成摘要
          signatureContent = `query=${newParams}&body=&secretKey=${randomString}`
          config.headers['Cvit-Digest'] = generateSignature(signatureContent)
          // 加密请求参数
          config.params = {
            encryptedParams: encryptRequestParams(randomString, newParams),
          }
        }
        break
      case 'post':
        if (data && Object.keys(data).length > 0) {
          const newParams = data ? JSON.stringify(data) : ''
          // 通过请求参数生成摘要
          signatureContent = `query=&body=${newParams}&secretKey=${randomString}`
          config.headers['Cvit-Digest'] = generateSignature(signatureContent)
          // 加密请求参数
          config.data = encryptRequestParams(randomString, newParams)
        }
        break
    }
  }
  return config
}

/**
 * @desc 响应解密
 */
export const decryptResponseMiddleware = (response: any) => {
  const { encryptEnable } = getEncryptionInfo()
  const headerSecretKey = response.headers['cvit-secret-key']
  if (encryptEnable && headerSecretKey) {
    // 解密响应结果
    const decryptResult = privateKeyDecrypt(headerSecretKey, response.data)
    // 替换data响应结果为解密后的对象
    response = { ...response, data: decryptResult }
  }
  return response
}

/**
 * @desc 加密密码
 */
export const encipherPassword = (password: string): string => {
  const encryptText = MD5(password).toString()
  return encryptText
}

var bip39 = require('bip39')
var hdkey = require('ethereumjs-wallet/hdkey')
var util = require('ethereumjs-util')

// 生成助记词
var mnemonic = bip39.generateMnemonic()

console.log(mnemonic)

var seed = bip39.mnemonicToSeed(mnemonic)
var hdWallet = hdkey.fromMasterSeed(seed)


var key1 = hdWallet.derivePath("m/44'/60'/0'/0/0")
console.log("私钥："+util.bufferToHex(key1._hdkey._privateKey))


var address1 = util.pubToAddress(key1._hdkey._publicKey, true)
console.log("地址："+util.bufferToHex(address1))

address1 = util.toChecksumAddress(address1.toString('hex'))
console.log("Encoding Address 地址："+ address1)

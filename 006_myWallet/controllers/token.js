const web3 = require("../utils/web3helper").getWeb3()
const BigNumber = require('bignumber.js');
const myContract = require("../utils/web3helper").getContract()

module.exports = {

    async sendTokenTransaction (ctx) {
        let returnResult = {
            code: 0,
            msg: '成功！',
            data: {}
        }
        
        const data = ctx.request.body

        const currentAccount = data.currAccount
        const privateKey = data.privateKey
        const reciptAccount = data.reciptAccount
        const txValue = data.txValue
        // 获取指定账户地址的交易数
        let nonce = await web3.eth.getTransactionCount(currentAccount);

        // 获取设置的位数
        const decimals = await myContract.methods.decimals().call()
        // 将输入的值 转为 最小单位的值
        const value = BigNumber(txValue * Math.pow(10,decimals));
        const txData = myContract.methods.transfer(reciptAccount, value).encodeABI();

        // 获取当前gasprice
        let gasPrice = await web3.eth.getGasPrice();
        
        // 以太币转账参数    
        let txParms = {
            from: currentAccount,
            // 合约地址
            to: myContract.options.address,
            nonce: nonce,
            gasPrice: gasPrice,
            data: txData // 当使用代币转账或者合约调用时
        }

        // 获取一下预估gas
        let gas = await web3.eth.estimateGas(txParms);
        txParms.gas = gas;
        // 用密钥对账单进行签名
        let signTx = await web3.eth.accounts.signTransaction(txParms,privateKey)

        // 将签过名的账单进行发送
        try {
            await web3.eth.sendSignedTransaction(signTx.rawTransaction, function(error, hash){
                if (!error) {
                    returnResult.data.hash = hash
                } else {
                    returnResult.code = "101"
                    returnResult.msg = "失败！"
                    returnResult.data.error = error.message

                }
            })
        } catch (error) {
            console.log(error)
        }
        
        ctx.body = returnResult
    }
}
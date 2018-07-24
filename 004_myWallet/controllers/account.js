const web3 = require("../utils/web3helper").getWeb3()
const fileUtil = require('../utils/fileUtil')
const path = require('path');
const config = require("../config/config")

module.exports = {
	async createAccount (ctx) {
        let returnResult = {
            code: 0,
            msg: '成功！',
            data: {}
        }
        
        let data = ctx.request.body
        const pwd = data.pwd

        // 调用 web3 创建账户
        let account = await web3.eth.accounts.create();

        // encrypt 返回一个JSON 对象
        const keystoreJson = await account.encrypt(pwd)
        
        // 将 JSON 对象转为字符串
        const keystoreStr = JSON.stringify(keystoreJson)

        // 生成随机文件存储 keystore 的字符串
        const randFilename = "UTC--"+new Date().toISOString()+"--"+account.address
        
        // 设置存储文件的目录
        const filePath =path.join(__dirname,"../static/keystore/"+randFilename)
        
        // 将 keystore 的内容写入文件中
        await fileUtil.writeFile(filePath,keystoreStr)
        
        // 将 用户地址、私钥、keystore 数据返回
        const result = {"account":account.address,"privateKey":account.privateKey,"keystore": config.keystoreUrl+randFilename}
        returnResult.data = result
        ctx.body = returnResult
    },
    async getAccountList (ctx) {
        await ctx.render("account")
    }
}
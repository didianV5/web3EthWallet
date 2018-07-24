const web3 = require("../utils/web3helper").getWeb3()

module.exports = {
    async getAccountList (ctx) {
        console.log("version: "+ web3.version)
        const accountList = await web3.eth.getAccounts()
        console.log("accountList..."+accountList)
        ctx.body = accountList
    }
}
const Web3 = require('web3');

module.exports = {
    getWeb3(){
        const web3 = new Web3(Web3.givenProvider || "https://kovan.infura.io/v3/defa81f315d0472d88e8d242099524e2");
        return web3
    }
}
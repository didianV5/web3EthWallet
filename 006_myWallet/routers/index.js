const router = require('koa-router')()

const accountController = require("../controllers/account")
const transactionController = require("../controllers/transaction")
const tokenController = require("../controllers/token")

router.get('/', accountController.getAccountList);

router.post('/', (ctx) => {

    const body = ctx.request.body;
  
    ctx.body = 'Hello Router POST '+ JSON.stringify(body);
    });

router.post('/account/create',accountController.createAccount)
router.post('/account/privatekey',accountController.getAccountByPrivatekey)
router.post('/account/keystore',accountController.getAccountByKeystore)

router.get('/transaction', transactionController.transaction)
router.post('/transaction/send', transactionController.sendTransaction)

router.post('/token/send', tokenController.sendTokenTransaction)
module.exports = router
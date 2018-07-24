const router = require('koa-router')()

const accountController = require("../controllers/account")

router.get('/', accountController.getAccountList);

router.post('/', (ctx) => {

    const body = ctx.request.body;
  
    ctx.body = 'Hello Router POST '+ JSON.stringify(body);
    });

router.post('/account/create',accountController.createAccount)

module.exports = router
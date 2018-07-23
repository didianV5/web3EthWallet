const router = require('koa-router')()

router.get('/', (ctx) => {

  const body = ctx.request.query;

  ctx.body = 'Hello Router GET '+ JSON.stringify(body);
  });

router.post('/', (ctx) => {

    const body = ctx.request.body;
  
    ctx.body = 'Hello Router POST '+ JSON.stringify(body);
    });
module.exports = router
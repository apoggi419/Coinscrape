const express = require('express');
const router  = express.Router();
const coindesk = require('node-coindesk-api');
const googleTrends = require('google-trends-api');

/* GET home page. */
router.get('/', (req, res, next) => {
  coindesk.getCurrentPrice().then(function (data) {
    res.locals.bitcoinPrice = data.bpi.USD.rate_float;
    googleTrends.interestOverTime({
      keyword: 'buy bitcoin',
      //in the last hour
      startTime: new Date(Date.now() - (60 * 60 * 1000)),
      granularTimeResolution: true,
    }).then(function(results){
      const objs = JSON.parse(results);
      let buyPopularity = 0;
      objs.default.timelineData.forEach(obj =>{
        buyPopularity += Number(obj.value);
      });
      res.locals.bitcoinOutlook = buyPopularity;
      res.render('index');
    // data.bpi.USD.rate_float === 1015.0275 !!!
  }).catch(error => {
    next(error);
    });
  });
});

module.exports = router;

const googleTrends = require('google-trends-api');

googleTrends.interestOverTime({keyword: ['buy bitcoin', 'sell bitcoin'], startTime: new Date(Date.now() - (60 * 60 * 1000)),
granularTimeResolution: true}).then(function(results){
  const obj = JSON.parse(results);
  console.log(obj.default.timelineData[0]);
});

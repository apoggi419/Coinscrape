const coindesk = require('node-coindesk-api');

coindesk.getSupportedCurrencies().then(function (data) {
  console.log(data);
});

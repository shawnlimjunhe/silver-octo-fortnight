const express = require('express');
const axios = require('axios');


const app = express();
const port = 8000;
const targetUrl = "https://api.coinbase.com/v2/exchange-rates";

const crypto = ['BTC', 'DOGE', 'ETH'];
const fiat = ['USD', 'SGD', 'EUR'];

app.get('/exchange-rates', async (req, res) => {
  const { base } = req.query;

  const response = await axios.get(targetUrl);
  
  console.log(response.data);

  res.json({'queryParam': base});
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})
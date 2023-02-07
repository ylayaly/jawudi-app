import { info } from 'autoprefixer';

var XMLHttpRequest = require('xhr2');

export default async function handler(req, res) {
    const body = req.body
    let amount = parseFloat(body.amount)
    const currency = body.currency
    let data = {}

    if(body.type === "LOCAL"){
      amount = amount + ((amount * 1) / 100)
      amount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits : 2,
        style: 'currency',
        currency: currency
      }).format(amount);
      data = {amount : amount+"*"}
      return res.status(200).json({ data: data })
    }
    
    else if(body.type === "INTERNATIONAL"){
      const currencyTo = body.currencyTo;
      const api_url = process.env.API_URL || "https://api.test.jawudi.net/api/v1/exchange/convert";

      var url = `${api_url}?from=${currency}&to=${currencyTo}&amount=${amount}`
    
      var xhr = new XMLHttpRequest();
      
      xhr.open('GET', url);
      xhr.setRequestHeader('Accept', 'application/vnd.github.everest-preview+json');
      xhr.setRequestHeader("x-api-key", process.env.API_KEY);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload  = function() {
        
        try{
          var response = JSON.parse(xhr.responseText);
          if(response.hasOwnProperty('success')){
            let total = amount.toLocaleString("en-US", {
              minimumFractionDigits : 2,
            })

            amount = (amount * 5) / 100;

            let pay = (response.query.amount + amount).toLocaleString("en-US", {
              minimumFractionDigits : 2,
              style: 'currency',
              currency: currency
            })

            let amountTo = response.result.toLocaleString("en-US", {
              minimumFractionDigits : 2,
            })

            let rate = response.info.quote.toLocaleString("en-US", {
              minimumFractionDigits : 2,
            })

            let fee = amount.toLocaleString("en-US", {
              minimumFractionDigits : 2,
              style: 'currency',
              currency: currency
            })

            

            data = {amount: total, amountTo , rate, fee, pay, time : response.info.timestamp}
            res.status(200).json({ status: "success", data: data, url: api_url })
          }else{
            res.status(301).json({ status: "error", data:  {message: response.errorMessage || response.message, url: api_url} })
          }
        }catch(error){
          res.status(301).json({ status: "error", data: {message: response.errorMessage || response.message, url: api_url} })
        }
      };
      xhr.send()
    }else{
      res.status(301).json({ status: "error", data: {message: "Format Failed", url: api_url} })
    }

  }
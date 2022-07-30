const express = require("express");
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.urlencoded({
  extended: false
}))
app.use(bodyparser.json())
const stripe = require("stripe")("sk_test_51KiEXBFN13hoDLbyRTyNLiipohSkO3Nxv5O3hw2Y6ZZQvb4u0UgGUTgIRvm2jao99pmrw0roG3XdF1KSsESNj5iG00MQI4pGq7");
const cors = require('cors')

app.use(cors())

app.post('/payment', async (req, res) => {
  try {
    console.log(req.body);
    token = req.body.token
    const customer = stripe.customers
      .create({
        email: req.body.email,
        source: token.id
      })
      .then((customer) => {
        console.log(customer);
        return stripe.charges.create({
          amount: 1000,
          description: "Test Purchase using express and Node",
          currency: "USD",
          customer: customer.id,
        });
      })
      .then((charge) => {
        console.log(charge);
        res.json({
          data: "success"
        })
      })
      .catch((err) => {
        res.json({
          data: "failure",
        });
      });
    return true;
  } catch (error) {
    return false;
  }
})

app.listen(5000, () => {
  console.log("App is listening on Port 5000")
})

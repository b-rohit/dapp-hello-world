var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const contract = require('./web3.js');
const bodyParser = require('body-parser');
const rpcURL = "http://127.0.0.1:8545";

/* GET home page. */
router.get('/', function (req, res, next) {
  contract.web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
  contract.connect(function (accounts) {
    res.render('index', { title: 'MyStatus', account: accounts[0] });
  });
});

router.post('/get', function (req, res, next) {
  contract.web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
  contract.connect(function (accounts) {
    contract.getStatus(accounts[0], function (status) {
      res.render('index', { title: 'MyStatus', account: accounts[0], status: status });
    })
  });
});

router.post('/set', function (req, res, next) {
  contract.web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
  contract.connect(function (accounts) {
    contract.setStatus(req.body.status, accounts[0], function () {
      res.render('index', { title: 'MyStatus', account: accounts[0], status: req.body.status });
    })
  });
});

module.exports = router;

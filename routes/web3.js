const contract = require('truffle-contract');

const artifacts = require('../build/contracts/MyStatus.json');
var MyStatus = contract(artifacts);

module.exports = {
  connect: function (callback) {
    MyStatus.setProvider(this.web3.currentProvider);
    this.web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        console.log("There was an error in getting accounts.");
        return;
      }
      if (accs.length == 0) {
        console.log("No accounts found");
        return;
      }
      callback(accs);
    });
  },
  getStatus: async function (account, callback) {
    MyStatus.setProvider(this.web3.currentProvider);
    var instance = await MyStatus.deployed();
    var value = await instance.getStatus.call({ from: account });
    callback(value.valueOf());
  },
  setStatus: async function (status, sender, callback) {
    MyStatus.setProvider(this.web3.currentProvider);
    var instance = await MyStatus.deployed();
    await instance.setStatus(status, { from: sender });
    callback();
  }
}

var ElmToken = artifacts.require("./ElmToken.sol");
var ElmTokenSale = artifacts.require("./ElmTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(ElmToken, 1000000).then(function() {
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(ElmTokenSale, ElmToken.address, tokenPrice);
  });
};

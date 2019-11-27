
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "upon regret host proud once crunch wolf bounce salmon answer earth hospital"; // 12 word mnemonic

// module.exports = {
//   // See <http://truffleframework.com/docs/advanced/configuration>
//   // to customize your Truffle configuration!
//   networks: {
//     development: {
//       host: "127.0.0.1",
//       port: "7545",
//       network_id: "*" // match any network id
//     },
//     rinkeby: {
//       provider: function () {
//       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/eaaecd6ee7174eecb5afff4c93b7166b"),
//     },
//       // host: "localhost",
//       // port: 8545,
//       network_id: 4,
//       gas: 47000000
//     }
//   }
// };


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic,
          "https://rinkeby.infura.io/v3/eaaecd6ee7174eecb5afff4c93b7166b");
      },
      network_id: 4
    }
  }
};

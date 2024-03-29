App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,

  init: function() {
    console.log("App initialized...")
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },

  initContracts: function() {
    $.getJSON("ElmToken.json", function(elmToken) {
      App.contracts.ElmToken = TruffleContract(elmToken);
      App.contracts.ElmToken.setProvider(App.web3Provider);
      App.contracts.ElmToken.deployed().then(function(elmToken) {
        console.log("Elm Token Address:", elmToken.address);
      });

        // App.listenForEvents();
        return App.render();
      });
  },

  // Listen for events emitted from the contract
  // listenForEvents: function() {
  //   App.contracts.ElmTokenSale.deployed().then(function(instance) {
  //     instance.Sell({}, {
  //       fromBlock: 0,
  //       toBlock: 'latest',
  //     }).watch(function(error, events) {
  //       console.log("event triggered", event);
  //       App.render();
  //     })
  //   })
  // },


  render: function() {
    if (App.loading) {
      return;
    }
    App.loading = true;

    var loader  = $('#loader');
    var content = $('#content');
    //
    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#accountAddress').html("Your Account: " + account);
      }
    })

    // Load token sale contract


      // Load token contract
      App.contracts.ElmToken.deployed().then(function(instance) {
        elmTokenInstance = instance;
        return elmTokenInstance.balanceOf(App.account);
      }).then(function(balance) {
        $('.elm-balance').html("your balance: " + balance.toNumber() + "&nbsp;EDC");
        App.loading = false;
        loader.hide();
        content.show();
      });
  },


  transferTokens: function() {

    var toAddress = $('#toAddress').val();
    var numberOfTokens = $('#numberOfTokens').val();
    App.contracts.ElmToken.deployed().then(function(instance) {
      return instance.transfer(toAddress, numberOfTokens, {
        from: App.account,
        // value: numberOfTokens,
        gas: 500000 // Gas limit
      });
    }).then(function(result) {
      console.log("Tokens transfered...")
      $('form').trigger('reset') // reset number of tokens in form
      // Wait for Transfer event
    });
  }
}


$(function() {
  $(window).load(function() {
    App.init();
  })
});

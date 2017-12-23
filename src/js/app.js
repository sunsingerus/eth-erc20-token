App = {
  web3Provider: null,
  // Registered contracts
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 == 'undefined') {
      // web3 not initialized
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
    } else {
      // web3 already initialized
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    }

    return App.initContract();
  },

  initContract: function() {
    // Artecaft file file locates here: ./build/contracts/ERC20ExampleToken.json
    $.getJSON('ERC20ExampleToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var ERC20ExampleTokenArtifact = data;
      App.contracts.ERC20ExampleToken = TruffleContract(ERC20ExampleTokenArtifact);

      // Set the provider for our contract.
      App.contracts.ERC20ExampleToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
  },

  handleTransfer: function(event) {
    event.preventDefault();

    var amount = parseInt($('#EXTTransferAmount').val());
    var toAddress = $('#EXTTransferAddress').val();

    console.log('Transfer ' + amount + ' EXT to ' + toAddress);

    var ERC20ExampleTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.ERC20ExampleToken.deployed().then(function(instance) {
        ERC20ExampleTokenInstance = instance;
        return ERC20ExampleTokenInstance.transfer(toAddress, amount, {from: account});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function(adopters, account) {
    console.log('Getting balances...');

    var ERC20ExampleTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.ERC20ExampleToken.deployed().then(function(instance) {
          ERC20ExampleTokenInstance = instance;

        return ERC20ExampleTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = result.c[0];

        $('#TTBalance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

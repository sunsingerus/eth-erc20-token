
var ERC20ExampleToken = artifacts.require("ERC20ExampleToken");

module.exports = function(deployer) {
    deployer.deploy(ERC20ExampleToken);
};

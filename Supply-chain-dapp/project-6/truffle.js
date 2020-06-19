const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraRinkebyEndPoint = 'https://rinkeby.infura.io/v3/562f510605d04990ac991c8011448600'
const mnemonic = "<mnemonic>"
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infuraRinkebyEndPoint),
        network_id: 4,
        gas: 4500000,
        gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: "0.4.24"
    }
  }
};
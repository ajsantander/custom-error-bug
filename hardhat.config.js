require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: 'anvil',
  networks: {
    anvil: {
      url: "http://127.0.0.1:8545/",
      gas: 8000000, // Prevent gas estimation by ethers.js
    },
  },
};

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

const sepoliaURL = process.env.SEPOLIA_RPC_URL;
const sepoliaKey = process.env.SEPOLIA_PRIVATE_KEY;
const etherscanApi = process.env.ETHERSCAN_API_KEY;
const coinmarketcapKey = process.env.COINMARKETCAP_API;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: sepoliaURL,
      accounts: [sepoliaKey],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },

  solidity: "0.8.7",
  etherscan: {
    apiKey: etherscanApi,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: coinmarketcapKey,
  },
};

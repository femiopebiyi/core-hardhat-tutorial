require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");

const sepoliaURL = process.env.SEPOLIA_RPC_URL;
const sepoliaKey = process.env.SEPOLIA_PRIVATE_KEY;
const etherscanApi = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: sepoliaURL,
      accounts: [sepoliaKey],
      chainId: 11155111,
    },
  },

  solidity: "0.8.7",
  etherscan: {
    apiKey: etherscanApi,
  },
};

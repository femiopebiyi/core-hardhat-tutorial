const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract...");

  const SimpleStorage = await SimpleStorageFactory.deploy();
  await SimpleStorage.waitForDeployment();

  console.log(`contract deployed to: ${await SimpleStorage.getAddress()}`);

  if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    await SimpleStorage.deploymentTransaction().wait(6);
    await verify(await SimpleStorage.getAddress(), []);
  }
}

async function verify(contractAddress, args) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("already verified!!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

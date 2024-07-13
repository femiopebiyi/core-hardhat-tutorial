const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract...");

  const SimpleStorage = await SimpleStorageFactory.deploy();
  await SimpleStorage.waitForDeployment();

  console.log(`contract deployed to: ${await SimpleStorage.getAddress()}`);

  if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    console.log("waiting for blocks to be mined");
    await SimpleStorage.deploymentTransaction().wait(6);
    console.log("6 blocks mined, verifying.....");
    await verify(await SimpleStorage.getAddress(), []);
    console.log("verified");
  }

  const currentValue = await SimpleStorage.retrieve();
  console.log(`current value is: ${currentValue}`);

  //update current value
  const transactionResponse = await SimpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await SimpleStorage.retrieve();
  console.log(`updated value is: ${updatedValue}`);
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

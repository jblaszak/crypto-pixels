// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CFPNFT = await hre.ethers.getContractFactory("CryptoFlexPixelsNFT");
  const cfpnft = await CFPNFT.deploy();
  await cfpnft.deployed();
  console.log("CryptoFlexPixelsNft deployed to:", cfpnft.address);

  console.log("---------------------");
  console.log("Populating tokens...");
  for (let i = 0; i < 100; i++) {
    const shift = i * 100;
    await cfpnft.populateAvailableTokens(1 + shift, 100 + shift);
  }
  console.log("Done!");
  console.log("---------------------");
  console.log("Creating giveaway tokens");
  for (let j = 1; j <= 601; j++) {
    await cfpnft.createGiveAway(j);
  }
  console.log("Done!");
  console.log("---------------------");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

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

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const CFPNFT = await hre.ethers.getContractFactory("CryptoFlexPixelsNFT");
  const cfpnft = await CFPNFT.deploy();
  await cfpnft.deployed();
  console.log("CryptoFlexPixelsNft deployed to:", cfpnft.address);

  // console.log("---------------------");
  // console.log("Populating tokens...");
  // for (let i = 0; i < 10; i++) {
  //   const shift = i * 1000;
  //   await cfpnft.populateAvailableTokens(1 + shift, 1000 + shift);
  // }
  // console.log("Done!");
  // console.log("---------------------");
  // console.log("Creating giveaway tokens");

  // const combinedGiveAways = [
  //   9916, 9910, 9909, 9904, 9902, 9901, 9897, 9815, 9812, 9808, 9804, 9801,
  //   9731, 9722, 9718, 9714, 9711, 9706, 9702, 9701, 9621, 9615, 9613, 9611,
  //   9599, 9595, 9587, 9586, 9583, 9531, 9516, 9506, 9502, 9501, 9487, 9473,
  //   9453, 9419, 9416, 9415, 9414, 9406, 9403, 9402, 9401, 9380, 9348, 9321,
  //   9318, 9317, 9313, 9307, 9302, 9301, 9295, 9239, 9222, 9213, 9208, 9207,
  //   9204, 9202, 9200, 9133, 9121, 9119, 9118, 9114, 9109, 9105, 9009, 9003,
  //   9002, 8917, 8915, 8904, 8874, 8817, 8816, 8815, 8714, 8711, 8707, 8701,
  //   8612, 8610, 8605, 8593, 8589, 8572, 8547, 8512, 8509, 8502, 8494, 8410,
  //   8401, 8352, 8312, 8308, 8306, 8302, 8281, 8260, 8244, 8203, 8127, 8109,
  //   8006, 7936, 7929, 7911, 7910, 7907, 7900, 7858, 7812, 7811, 7807, 7806,
  //   7805, 7722, 7712, 7612, 7601, 7598, 7488, 7430, 7418, 7409, 7362, 7333,
  //   7331, 7330, 7327, 7325, 7265, 7233, 7232, 7209, 7123, 7067, 7029, 7028,
  //   7025, 6966, 6961, 6936, 6932, 6931, 6895, 6886, 6882, 6819, 6786, 6721,
  //   6630, 6629, 6622, 6553, 6525, 6451, 6442, 6435, 6430, 6398, 6376, 6351,
  //   6346, 6339, 6309, 6268, 6205, 6193, 6176, 6171, 6167, 6165, 6064, 6042,
  //   6027, 6011, 5933, 5913, 5893, 5866, 5854, 5839, 5630, 5583, 5537, 5522,
  //   5520, 5473, 5437, 5346, 5242, 5225, 5128, 5049, 4867, 4844, 4841, 4839,
  //   4837, 4765, 4750, 4659, 4599, 4588, 4580, 4521, 4259, 4225, 4161, 4157,
  //   4154, 3967, 3907, 3880, 3814, 3811, 3707, 3691, 3667, 3648, 3569, 3565,
  //   3551, 3534, 3506, 3464, 3423, 3277, 3256, 3179, 3176, 3169, 3038, 3013,
  //   2986, 2982, 2945, 2911, 2869, 2860, 2822, 2820, 2769, 2665, 2597, 2566,
  //   2523, 2498, 2480, 2461, 2225, 2162, 2152, 2126, 2062, 2033, 1888, 1786,
  //   1769, 1653, 1637, 1589, 1401, 1356, 1339, 1272, 1250, 1205, 1167, 1143,
  //   1104, 1096, 1016, 1008, 976, 910, 835, 821, 818, 792, 743, 711, 655, 596,
  //   566, 549, 521, 461, 312, 173, 139, 137, 108, 23,
  // ];

  // console.log(combinedGiveAways.length);
  // for (let j = 0; j < combinedGiveAways.length; j++) {
  //   await cfpnft.createGiveAway(combinedGiveAways[j]);
  // }

  // const tokensLeft = await cfpnft.getAvailableTokensList();
  // console.log("tokensLeft:", tokensLeft);
  // const numLeft = await cfpnft.getAvailableTokensCount();
  // console.log(`Numleft: ${numLeft}`);
  console.log("Done!");
  // console.log("---------------------");
  // console.log("CryptoFlexPixelsNft deployed to:", cfpnft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CryptoFlexPixelsNFT", () => {
  let CFPNFT;

  beforeEach(async () => {
    const CryptoFlexPixelsNFT = await ethers.getContractFactory(
      "CryptoFlexPixelsNFT"
    );
    CFPNFT = await CryptoFlexPixelsNFT.deploy();
    await CFPNFT.deployed();
    console.log("Nft deployed to:", CFPNFT.address);
  });

  // it("Should populate array of available tokens to 10000 but not more", async () => {
  //   for (let i = 0; i < 10; i++) {
  //     const shift = i * 1000;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 1000 + shift);
  //   }
  //   let numTokens = await CFPNFT.getAvailableTokensCount();
  //   console.log(`numTokens: ${numTokens}`);
  //   expect(numTokens.toNumber() == 10000).to.be.true;
  //   try {
  //     await CFPNFT.populateAvailableTokens(10001, 10001);
  //     numTokens = await CFPNFT.getAvailableTokensCount();
  //     console.log(`numTokens: ${numTokens}`);
  //   } catch (error) {
  //     expect(
  //       error ==
  //         "Error: VM Exception while processing transaction: reverted with reason string 'Max tokens already populated!'"
  //     ).to.be.true;
  //   }
  // });

  // it("Should allow creation of giveaways by owner", async () => {
  //   for (let i = 0; i < 10; i++) {
  //     const shift = i * 1000;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 1000 + shift);
  //   }

  //   let tx = await CFPNFT.createGiveAway(1);
  //   tx = await tx.wait();
  //   numTokens = await CFPNFT.getAvailableTokensCount();
  //   expect(numTokens.toNumber() == 9999).to.be.true;
  // });

  // it("Should allow batch creation of giveaways by owner", async () => {
  //   for (let i = 0; i < 10; i++) {
  //     const shift = i * 1000;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 1000 + shift);
  //   }
  //   const giveaways = [
  //     9942, 9916, 9915, 9914, 9913, 9912, 9911, 9910, 9909, 9908, 9907, 9906,
  //     9905,
  //   ];
  //   let tx = await CFPNFT.batchCreateGiveAway(giveaways);
  //   tx = await tx.wait();
  //   numTokens = await CFPNFT.getAvailableTokensCount();
  //   expect(numTokens.toNumber() == 9987).to.be.true;
  // });

  // it("Should allow creation of giveaways by owner only up to 300", async () => {
  //   for (let i = 0; i < 10; i++) {
  //     const shift = i * 1000;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 1000 + shift);
  //   }
  //   for (let j = 1; j <= 300; j++) {
  //     await CFPNFT.createGiveAway(j);
  //   }
  //   numTokens = await CFPNFT.getAvailableTokensCount();
  //   console.log(`numTokens: ${numTokens}`);
  //   expect(numTokens.toNumber() == 9700).to.be.true;

  //   try {
  //     tx = await CFPNFT.createGiveAway(301);
  //     // console.log(tx);
  //     tx = await tx.wait();
  //     console.log(tx);
  //     event = tx.events[1];
  //     console.log(event);
  //   } catch (error) {
  //     expect(
  //       error ==
  //         "Error: VM Exception while processing transaction: reverted with reason string 'All giveaway NFTs already minted'"
  //     ).to.be.true;
  //   }
  // });

  /////// CHANGE numLeft to 0 to make this work, or rewrite to mint all 10k and wait forever!
  // it("Should fail if no NFTs left", async () => {
  //   try {
  //     tx = await CFPNFT.create();
  //     console.log(tx);
  //   } catch (error) {
  //     console.log(error);
  //     expect(
  //       error ==
  //         "Error: VM Exception while processing transaction: reverted with reason string 'No tokens left!'"
  //     ).to.be.true;
  //   }
  // });

  // it("Should fail if giveaway tokens not minted yet", async () => {
  //   for (let i = 0; i < 10; i++) {
  //     const shift = i * 1000;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 1000 + shift);
  //   }

  //   try {
  //     tx = await CFPNFT.create();
  //   } catch (error) {
  //     expect(
  //       error ==
  //         "Error: VM Exception while processing transaction: reverted with reason string 'Giveaway tokens not minted yet!'"
  //     ).to.be.true;
  //   }
  // });

  // it("Should succeeed if giveaways minted and starting w/ correct starting price", async () => {
  //   for (let i = 0; i < 10; i++) {
  //     const shift = i * 1000;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 1000 + shift);
  //   }

  //   for (let j = 1; j <= 300; j++) {
  //     await CFPNFT.createGiveAway(j);
  //   }

  //   let mintFee = await CFPNFT.getMintFee();

  //   console.log(`mintfee: ${mintFee}`);
  //   expect(mintFee.toNumber() == ethers.utils.parseUnits("0.001", "ether"));
  //   mintFee = mintFee.toString();
  //   tx = await CFPNFT.create({ value: mintFee });

  //   numTokens = await CFPNFT.getAvailableTokensCount();
  //   expect(numTokens.toNumber() == 9699).to.be.true;
  // });

  // it("Should fail if giveaways minted and starting w/ incorrect starting price", async () => {
  //   for (let i = 0; i < 10; i++) {
  //     const shift = i * 1000;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 1000 + shift);
  //   }

  //   for (let j = 1; j <= 300; j++) {
  //     await CFPNFT.createGiveAway(j);
  //   }

  //   let mintFee = ethers.utils.parseUnits("0.00099", "ether");
  //   try {
  //     tx = await CFPNFT.create({ value: mintFee });
  //   } catch (error) {
  //     expect(
  //       error ==
  //         "Error: VM Exception while processing transaction: reverted with reason string 'Insufficient funds!'"
  //     );
  //   }
  // });

  /* THIS TEST TAKES STUPID LONG!!!!  Don't run it unless you have to. Hahaha.
   Also, it is required to change the maxMints per account to 10,000 so it
   doesn't fail...  ALSO change maxmints per account to uint256!!! Turn it back after!*/
  // it("Should have correct minting price at end", async () => {
  //   for (let i = 0; i < 10; i++) {
  //     const shift = i * 1000;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 1000 + shift);
  //   }

  //   for (let j = 1; j <= 300; j++) {
  //     await CFPNFT.createGiveAway(j);
  //   }

  //   let mintFee;
  //   for (let k = 1; k <= 9700; k++) {
  //     // const tokensLeft = await CFPNFT.getAvailableTokensList();
  //     // console.log(`tokensLeft: ${tokensLeft}`);
  //     mintFee = await CFPNFT.getMintFee();
  //     tx = await CFPNFT.create({ value: mintFee });
  //     tx = await tx.wait();
  //     // console.log(
  //     //   `tokenId: ${tx.events[1].args[1]}, tokensLeft: ${tx.events[1].args[2]}`
  //     // );
  //   }
  //   console.log(`mintfee: ${mintFee}`);

  //   expect(mintFee.toString() == ethers.utils.parseUnits("0.2", "ether"));
  //   const numLeft = await CFPNFT.getAvailableTokensCount();
  //   expect(numLeft.toNumber() == 0).to.be.true;
  // });
});

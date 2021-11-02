const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", () => {
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
  //   for (let i = 0; i < 100; i++) {
  //     const shift = i * 100;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 100 + shift);
  //   }
  //   let numTokens = await CFPNFT.getAvailableTokensCount();
  //   console.log(`numTokens: ${numTokens}`);
  //   expect(numTokens == 10000).to.be.true;
  //   try {
  //     await CFPNFT.populateAvailableTokens(10001, 10001);
  //     numTokens = await CFPNFT.getAvailableTokensCount();
  //     console.log(`numTokens: ${numTokens}`);
  //   } catch (error) {
  //     expect(
  //       error ==
  //         "Error: VM Exception while processing transaction: reverted with reason string 'Max tokens populated!'"
  //     ).to.be.true;
  //   }
  // });
  // it("Should allow creation of giveaways by owner", async () => {
  //   for (let i = 0; i < 100; i++) {
  //     const shift = i * 100;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 100 + shift);
  //   }

  //   let tx = await CFPNFT.createGiveAway(1);
  //   tx = await tx.wait();
  //   numTokens = await CFPNFT.getAvailableTokensCount();
  //   expect(numTokens.toNumber() == 9999).to.be.true;
  // });
  // it("Should allow creation of giveaways by owner only up to 601", async () => {
  //   for (let i = 0; i < 100; i++) {
  //     const shift = i * 100;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 100 + shift);
  //   }
  //   for (let j = 1; j <= 601; j++) {
  //     await CFPNFT.createGiveAway(j);
  //   }
  //   numTokens = await CFPNFT.getAvailableTokensCount();
  //   expect(numTokens.toNumber() == 9399).to.be.true;

  //   try {
  //     tx = await CFPNFT.createGiveAway(602);
  //     // console.log(tx);
  //     tx = await tx.wait();
  //     console.log(tx);
  //     event = tx.events[1];
  //     console.log(event);
  //   } catch (error) {
  //     expect(
  //       error ==
  //         "Error: VM Exception while processing transaction: reverted with reason string 'All giveaway NFTs minted'"
  //     ).to.be.true;
  //   }
  // });

  // it("Should fail if no NFTs left", async () => {
  //   try {
  //     tx = await CFPNFT.create();
  //   } catch (error) {
  //     expect(
  //       error ==
  //         "Error: VM Exception while processing transaction: reverted with reason string 'No tokens left'"
  //     ).to.be.true;
  //   }
  // });

  // it("Should fail if giveaway tokens not minted yet", async () => {
  //   for (let i = 0; i < 100; i++) {
  //     const shift = i * 100;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 100 + shift);
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
  //   for (let i = 0; i < 100; i++) {
  //     const shift = i * 100;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 100 + shift);
  //   }

  //   for (let j = 1; j <= 601; j++) {
  //     await CFPNFT.createGiveAway(j);
  //   }

  //   let mintFee = await CFPNFT.getMintFee();

  //   expect(mintFee.toNumber() == ethers.utils.parseUnits("0.001", "ether"));
  //   mintFee = mintFee.toString();
  //   console.log(mintFee);
  //   tx = await CFPNFT.create({ value: mintFee });

  //   numTokens = await CFPNFT.getAvailableTokensCount();
  //   expect(numTokens.toNumber() == 9398).to.be.true;
  // });

  // it("Should fail if giveaways minted and starting w/ incorrect starting price", async () => {
  //   for (let i = 0; i < 100; i++) {
  //     const shift = i * 100;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 100 + shift);
  //   }

  //   for (let j = 1; j <= 601; j++) {
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

  // THIS TEST TAKES STUPID LONG!!!!  Don't run it unless you have to. Hahaha.
  // Also, it is required to change the maxMints per account to 10,000 so it
  // doesn't fail...  Turn it back after!
  // it("Should have correct minting price at end", async () => {
  //   for (let i = 0; i < 100; i++) {
  //     const shift = i * 100;
  //     await CFPNFT.populateAvailableTokens(1 + shift, 100 + shift);
  //   }

  //   for (let j = 1; j <= 601; j++) {
  //     await CFPNFT.createGiveAway(j);
  //   }

  //   let mintFee;
  //   for (let k = 1; k <= 9399; k++) {
  //     mintFee = await CFPNFT.getMintFee();
  //     tx = await CFPNFT.create({ value: mintFee });
  //   }
  //   console.log(`mintfee: ${mintFee}`);

  //   expect(mintFee.toString() == ethers.utils.parseUnits("0.2", "ether"));
  //   const numLeft = await CFPNFT.getAvailableTokensCount();
  //   expect(numLeft.toNumber() == 0).to.be.true;
  // });
});

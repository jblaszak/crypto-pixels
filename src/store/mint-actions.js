import { useSelector } from "react-redux";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import CryptoFlexPixelsNFT from "../artifacts/contracts/CryptoFlexPixelsNFT.sol/CryptoFlexPixelsNFT.json";
import { contractAddress } from "../config";

import { mintActions } from "./mint-slice";
import { errorActions } from "./error-slice.js";

export const getMintInfo = () => {
  return async (dispatch) => {
    const fetchMintInfo = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const nftContract = new ethers.Contract(
        contractAddress,
        CryptoFlexPixelsNFT.abi,
        provider
      );

      let mintCount = await nftContract.getAvailableTokensCount();
      let mintFee = await nftContract.getMintFee();

      mintCount = 10000 - mintCount.toNumber();
      mintFee = mintFee.toNumber();

      return [mintCount, mintFee];
    };

    try {
      console.log("getting mint info...");
      const [mintCount, mintFee] = await fetchMintInfo();
      console.log("mintCount: ", mintCount);
      console.log("mintFee: ", mintFee);
      dispatch(
        mintActions.updateMintInfo({ mintCount: mintCount, mintFee: mintFee })
      );
    } catch (error) {
      console.log("there was an error updating!", error);
      dispatch(
        errorActions.changeErrorMessage({
          errorMessage: "Failed to grab minting info! :'(",
        })
      );
    }
  };
};

export const mint = (mintFee) => {
  console.log("minting new token");
  return async (dispatch) => {
    const mintNewToken = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const nftContract = new ethers.Contract(
        contractAddress,
        CryptoFlexPixelsNFT.abi,
        provider
      );
      const signer = provider.getSigner();

      let tx = await nftContract.connect(signer).create({ value: mintFee });
      tx = await tx.wait();
      return tx.events[0].args[2].toNumber();
    };

    try {
      const tokenId = await mintNewToken();
      console.log("minted: ", tokenId);
    } catch (error) {
      console.log("There was an error minting!", error);
      dispatch(
        errorActions.changeErrorMessage({
          errorMessage: "Failed to mint! :'(",
        })
      );
    }
  };
};

export const setupWeb3 = () => {
  return async (dispatch) => {
    const getInfoAndListen = async () => {
      console.log("getting info... start");
      const provider = new ethers.providers.JsonRpcProvider();
      const tokenContract = new ethers.Contract(
        contractAddress,
        CryptoFlexPixelsNFT.abi,
        provider
      );
      tokenContract.on("createdRandomNFT", (creator, tokenId, numLeft) => {
        console.log(
          "created: ",
          creator,
          tokenId.toNumber(),
          numLeft.toNumber()
        );
        dispatch(getMintInfo());
      });
    };

    try {
      await getInfoAndListen();
    } catch (error) {
      console.log("There was an error setting up listener!", error);
      dispatch(
        errorActions.changeErrorMessage({
          errorMessage: "Failed to setup web3 and listener! :'(",
        })
      );
    }
  };
};

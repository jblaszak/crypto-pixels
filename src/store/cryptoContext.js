import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";

import { updateStatus } from "../helpers/updateStatus";
import { mintActions } from "./mint-slice";
import * as CONSTANTS from "../constants";
import CryptoFlexPixelsNFT from "../artifacts/contracts/CryptoFlexPixelsNFT.sol/CryptoFlexPixelsNFT.json";

const CryptoContext = React.createContext({
  isWalletConnected: false,
  provider: null,
  contract: null,
  connectWallet: () => {},
});

export const CryptoContextProvider = (props) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const dispatch = useDispatch();

  useEffect(async () => {
    await connectWeb3();
  }, []);

  const connectWeb3 = async () => {
    console.log("connectingWeb3");
    const setupContract = async () => {
      const newProvider = new ethers.providers.JsonRpcProvider();

      const newContract = new ethers.Contract(
        CONSTANTS.CONTRACT_ADDRESS,
        CryptoFlexPixelsNFT.abi,
        newProvider
      );

      newContract.on("createdRandomNFT", (createdBy, tokenId, numLeft) => {
        console.log("blaaaah");
        updateStatus(
          "notification",
          `Someone minted CFP #${tokenId.toNumber()}. ${numLeft.toNumber()} left!`,
          dispatch
        );
        getMintInfo(newContract);
      });
      newContract.on("createdGiveAwayNFT", (createdBy, tokenId, numLeft) => {
        updateStatus(
          "notification",
          `Minted give away CFP #${tokenId.toNumber()}. ${numLeft.toNumber()} left!`,
          dispatch
        );
        getMintInfo(newContract);
      });

      // Need to set contract here to context so getMintInfo can access it
      setProvider(newProvider);
      setContract(newContract);
    };
    try {
      await setupContract();
    } catch (error) {
      console.log("There was an error setting up listener!", error);
      updateStatus("error", "Failed to setup web3!", dispatch);
    }
  };

  const connectWallet = async (e) => {
    const setupContractWallet = async () => {
      const oldContract = contract;
      oldContract.removeAllListeners();

      const newProvider = new ethers.providers.Web3Provider(window.ethereum);

      const newContract = new ethers.Contract(
        CONSTANTS.CONTRACT_ADDRESS,
        CryptoFlexPixelsNFT.abi,
        newProvider
      );

      const network = await provider.getNetwork();
      const chainId = network.chainId;
      console.log("CHAIN ID:", chainId);
      if (chainId !== 1) {
        throw "NOT_MAIN_NET";
      }

      const signer = newProvider.getSigner();
      const signerAddress = await signer.getAddress();

      newContract.on("createdRandomNFT", (createdBy, tokenId, numLeft) => {
        if (createdBy !== signerAddress) {
          updateStatus(
            "notification",
            `Someone minted CFP #${tokenId.toNumber()}. ${numLeft.toNumber()} left!`,
            dispatch
          );
        }
        getMintInfo(newContract);
      });
      newContract.on("createdGiveAwayNFT", (createdBy, tokenId, numLeft) => {
        updateStatus(
          "notification",
          `Minted give away CFP #${tokenId.toNumber()}. ${numLeft.toNumber()} left!`,
          dispatch
        );
        getMintInfo(newContract);
      });

      // update contract with listeners
      setContract(newContract);
      setProvider(newProvider);
      setIsWalletConnected(true);
    };
    try {
      await setupContractWallet();
    } catch (error) {
      console.log("There was an error connecting wallet!", error);
      if (error === "NOT_MAIN_NET") {
        updateStatus(
          "error",
          "You are not connected to Polygon Mainnet!",
          dispatch
        );
      } else {
        updateStatus("error", "Failed to connect wallet!", dispatch);
      }
    }
  };

  const getMintInfo = async (contract) => {
    const fetchMintInfo = async () => {
      let mintCount = await contract.getAvailableTokensCount();
      let mintFee = await contract.getMintFee();

      mintCount = 10000 - mintCount.toNumber();
      mintFee = mintFee.toNumber();

      return [mintCount, mintFee];
    };

    try {
      console.log("getting mint info...");
      console.log(contract);
      const [mintCount, mintFee] = await fetchMintInfo();
      dispatch(
        mintActions.updateMintInfo({ mintCount: mintCount, mintFee: mintFee })
      );
    } catch (error) {
      console.log("There was an error updating mint info!", error);
      updateStatus("error", "Failed to grab minting info! :'(", dispatch);
    }
  };

  return (
    <CryptoContext.Provider
      value={{
        isWalletConnected: isWalletConnected,
        provider: provider,
        contract: contract,
        connectWallet: connectWallet,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;

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
  mintedPixels: [],
  setMintedPixels: () => {},
  connectWallet: () => {},
});

export const CryptoContextProvider = (props) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [mintedPixels, setMintedPixels] = useState([]);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

  const dispatch = useDispatch();

  useEffect(async () => {
    await connectWeb3();
  }, []);

  useEffect(async () => {
    if (provider !== null && contract !== null) {
      let signerAddress = null;
      if (!provider.connection.url.includes("infura")) {
        const signer = await provider.getSigner();
        if (signer !== null) {
          signerAddress = await signer.getAddress();
          if (isWalletConnected) {
            createListener(contract, signerAddress, "Someone minted");
          }
        }
      }
    }
  }, [contract, provider, mintedPixels]);

  const createListener = (contract, signerAddress, statusStringUnique) => {
    contract.once("createdRandomNFT", async (createdBy, tokenId, numLeft) => {
      if (createdBy !== signerAddress) {
        updateStatus(
          "notification",
          `${statusStringUnique} CFP #${tokenId.toNumber()}. ${numLeft.toNumber()} left!`,
          dispatch
        );
      }
      getMintInfo(contract);
      updateMintedPixelsSingle(tokenId.toNumber());
    });
  };

  const updateMintedPixels = async (contract) => {
    let tokensMinted;
    const tryUpdateMintedPixels = async () => {
      let tokensAvailable = await contract.getAvailableTokensList();
      tokensMinted = CONSTANTS.TOTAL_TOKENS_ARRAY.filter(
        (x) => !tokensAvailable.includes(x)
      );
      setMintedPixels(tokensMinted);
    };
    try {
      await tryUpdateMintedPixels();
      const mintChange = new CustomEvent("mintChange", {
        detail: tokensMinted,
      });
      window.dispatchEvent(mintChange);
    } catch (error) {
      console.log("Error grabbing minted pixels info", error);
      updateStatus("error", "Error grabbing minted pixels info!", dispatch);
    }
    return tokensMinted;
  };

  const updateMintedPixelsSingle = async (tokenId) => {
    let mintedTokens;
    const tryUpdateMintedPixelsSingle = async () => {
      mintedTokens = [...mintedPixels];
      if (!mintedTokens.includes(tokenId)) {
        mintedTokens.push(tokenId);
      }
      setMintedPixels(mintedTokens);
    };
    try {
      await tryUpdateMintedPixelsSingle();
      const mintChange = new CustomEvent("mintChange", {
        detail: mintedTokens,
      });
      window.dispatchEvent(mintChange);
    } catch (error) {
      console.log("Error updating minted pixels info", error);
      updateStatus("error", "Error updating minted pixels info!", dispatch);
    }
  };

  const connectWeb3 = async () => {
    const setupContract = async () => {
      const newProvider = new ethers.providers.JsonRpcProvider(
        `https://polygon-mainnet.infura.io/v3/${PROJECT_ID}`
      );

      const newContract = new ethers.Contract(
        CONSTANTS.CONTRACT_ADDRESS,
        CryptoFlexPixelsNFT.abi,
        newProvider
      );

      await getMintInfo(newContract);
      await updateMintedPixels(newContract);

      setProvider(newProvider);
      setContract(newContract);
    };
    try {
      await setupContract();
    } catch (error) {
      console.log("There was an error setting up web3!", error);
      updateStatus("error", "Failed to setup web3!", dispatch);
    }
  };

  const connectWallet = async (e) => {
    const setupContractWallet = async () => {
      const oldContract = contract;
      oldContract?.removeAllListeners();

      if (!window.ethereum) {
        throw new Error("NO_WALLET");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);

      const newContract = new ethers.Contract(
        CONSTANTS.CONTRACT_ADDRESS,
        CryptoFlexPixelsNFT.abi,
        newProvider
      );

      const network = await newProvider.getNetwork();
      const chainId = network.chainId;
      if (chainId !== 137) {
        throw new Error("NOT_MAIN_NET");
      }

      setProvider(newProvider);
      setContract(newContract);
      setIsWalletConnected(true);
    };
    try {
      await setupContractWallet();
    } catch (error) {
      console.log("There was an error connecting wallet!", error);
      if (error.message === "NOT_MAIN_NET") {
        updateStatus(
          "error",
          "Change wallet network to Polygon Mainnet!",
          dispatch
        );
      } else if (error.message === "NO_WALLET") {
        updateStatus(
          "error",
          "Crypto wallet not found! Please install one.",
          dispatch
        );
      } else if (
        error.includes?.("missing provider") ||
        error.message?.includes("missing provider") ||
        error.data?.message?.includes("missing provider")
      ) {
        updateStatus(
          "error",
          "Crypto wallet not found! Please install one.",
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
      mintFee = `${mintFee}`;

      return [mintCount, mintFee];
    };

    try {
      const [mintCount, mintFee] = await fetchMintInfo();
      dispatch(
        mintActions.updateMintInfo({ mintCount: mintCount, mintFee: mintFee })
      );
    } catch (error) {
      console.log("There was an error updating mint info!", error);
      updateStatus("error", "Failed to grab minting info!", dispatch);
    }
  };

  return (
    <CryptoContext.Provider
      value={{
        isWalletConnected: isWalletConnected,
        provider: provider,
        contract: contract,
        mintedPixels: mintedPixels,
        setMintedPixels: setMintedPixels,
        connectWallet: connectWallet,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;

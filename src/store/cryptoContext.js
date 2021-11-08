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

  const dispatch = useDispatch();

  useEffect(async () => {
    await connectWeb3();
  }, []);

  useEffect(async () => {
    if (provider !== null && contract !== null) {
      const signer = provider.getSigner();
      let signerAddress = null;
      if (signer !== null) {
        signerAddress = await signer.getAddress();
      }

      createListener(
        contract,
        "createdRandomNFT",
        signerAddress,
        "Someone minted"
      );
      createListener(
        contract,
        "createdGiveAwayNFT",
        signerAddress,
        "Minted give away"
      );
    }
  }, [contract, mintedPixels]);

  const createListener = (
    contract,
    event,
    signerAddress,
    statusStringUnique
  ) => {
    contract.once(event, async (createdBy, tokenId, numLeft) => {
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
      tokensAvailable = tokensAvailable.map((token) => token.toNumber());
      tokensMinted = CONSTANTS.TOTAL_TOKENS_ARRAY.filter(
        (x) => !tokensAvailable.includes(x)
      );
      setMintedPixels(tokensMinted);
      console.log(tokensMinted);
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
      const newProvider = new ethers.providers.JsonRpcProvider();

      const newContract = new ethers.Contract(
        CONSTANTS.CONTRACT_ADDRESS,
        CryptoFlexPixelsNFT.abi,
        newProvider
      );

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
      oldContract.removeAllListeners();

      const newProvider = new ethers.providers.Web3Provider(window.ethereum);

      const newContract = new ethers.Contract(
        CONSTANTS.CONTRACT_ADDRESS,
        CryptoFlexPixelsNFT.abi,
        newProvider
      );

      const network = await provider.getNetwork();
      const chainId = network.chainId;
      // if (chainId !== 1) {
      //   throw "NOT_MAIN_NET";
      // }

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

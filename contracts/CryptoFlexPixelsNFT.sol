// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Storage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC2981Collection.sol";

contract CryptoFlexPixelsNFT is ERC721URIStorage, ERC165Storage, ERC2981Collection, Ownable {

    event createdRandomNFT(address indexed createdBy, uint256 indexed tokenId, uint256 indexed tokensLeft);
    event createdGiveAwayNFT(address indexed createdBy, uint256 indexed tokenId, uint256 indexed tokensLeft);

    mapping(address => uint256) public addressToMintCount;

    uint[] public availableTokens;
    // bool internal paused = false;
    bytes4 private constant _INTERFACE_ID_IERC2981 = 0x2a55205a;
    bytes4 private constant _INTERFACE_ID_ERC2981Collection = 0x6af56a00;
    uint16 internal constant maxMints = 10000;
    uint8 internal constant royaltyPercent = 5;
    // uint16 internal numTokensLeft = 10000;
    uint16 internal giveAwayCounter = 0;
    uint256 internal totalPop = 0;
    string internal baseURI = 'ipfs://ouwoeiruoiau/';
    string internal constant URIextension = '.json';

    constructor() 
    ERC721("CryptoFlexPixels", "CFPNFT")
    {
        _registerInterface(_INTERFACE_ID_IERC2981);
        _registerInterface(_INTERFACE_ID_ERC2981Collection);
        _setRoyalties(owner(), royaltyPercent);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC165Storage, IERC165) returns (bool) {
        return super.supportsInterface(interfaceId);
    } 

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function withdraw() public payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function populateAvailableTokens(uint256 _start, uint256 _end) public onlyOwner {
        totalPop = totalPop + _end - _start + 1;
        require(totalPop <= 10000, "Max tokens populated!");

        for (uint i=_start; i<=_end; i++) {
            availableTokens.push(i);
        }
    }

    function createGiveAway(uint256 tokenId) public onlyOwner {
        require(giveAwayCounter < 601, "All giveaway NFTs minted");
        _safeMint(owner(), tokenId);
        availableTokens[tokenId-1] = availableTokens[availableTokens.length-1];
        availableTokens.pop();
        giveAwayCounter++;
        emit createdGiveAwayNFT(msg.sender, tokenId, availableTokens.length);
    }

    function batchCreateGiveAway(uint256 _start, uint256 _end) public onlyOwner {
        for (uint i=_start; i<=_end; i++) {
            createGiveAway(i);
        }
    }

    function getAvailableTokensList() public view returns (uint[] memory) {
        return availableTokens;
    }

    function getAvailableTokensCount() public view returns (uint) {
        return availableTokens.length;
    }

    function getMintFee() public view returns (uint256) {
        uint256 startingPrice = 0.001 ether;
        uint256 endingPrice = 0.2 ether;
        uint256 numLeft = availableTokens.length;
        uint256 mintFee = (9399 - numLeft) * (endingPrice-startingPrice) / 9398 + startingPrice;
        return mintFee;
    }

    function create() public payable returns(uint256) {
        // require(!paused, "Minting is currently paused.");
        require(addressToMintCount[msg.sender] < maxMints, "Already minted max amount for this address!");
        uint256 numLeft = availableTokens.length;
        require(numLeft <= 9399, "Giveaway tokens not minted yet!");
        require(numLeft > 0, "No tokens left");

        // uint256 startingPrice = 0.001 ether;
        // uint256 endingPrice = 0.2 ether;
        // uint256 mintPrice = (numLeft) * (endingPrice-startingPrice) / 9300 + startingPrice;
        // uint256 mintPrice = (numLeft) * (endingPrice-startingPrice) / 100000 + startingPrice;
        require(msg.value >= getMintFee(), "Insufficient funds!");

        uint256 index = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, numLeft))) % numLeft;

        uint256 tokenId = availableTokens[index];
        _safeMint(msg.sender, tokenId);
        // _setTokenURI(tokenId, string(abi.encodePacked(Strings.toString(tokenId), URIextension)));
        availableTokens[index] = availableTokens[numLeft-1];
        availableTokens.pop();
        addressToMintCount[msg.sender]++;
        emit createdRandomNFT(msg.sender, tokenId, numLeft);
        return tokenId;
    }
}

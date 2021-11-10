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

    mapping(address => uint8) public addressToMintCount;

    bytes4 private constant _INTERFACE_ID_IERC2981 = 0x2a55205a;
    bytes4 private constant _INTERFACE_ID_ERC2981Collection = 0x6af56a00;
    uint8 public constant maxMints = 20;
    uint8 public constant royaltyPercent = 5;
    uint16 public giveAwayCounter = 0;
    uint16 public totalPop = 0;
    uint16[] public availableTokens = new uint16[](10000);
    uint256 public numLeft = 10000;
    string public baseURI = 'ipfs://QmWCVznx2ofDkAfGqMxHZK3c5uaabBxTrMLbamfdNJ15eZ/';

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

    function populateAvailableTokens(uint16 _start, uint16 _end) public onlyOwner {
        totalPop = totalPop + _end - _start + 1;
        require(totalPop <= 10000, "Max tokens already populated!");

        for (uint16 i=_start; i<=_end; i++) {
            availableTokens[i-1] = i;
        }
    }

    function createGiveAway(uint16 tokenId) public onlyOwner {
        require(giveAwayCounter < 300, "All giveaway NFTs already minted");
        _safeMint(owner(), uint256(tokenId));
        numLeft--;
        availableTokens[tokenId-1] = availableTokens[numLeft];
        giveAwayCounter++;
        emit createdGiveAwayNFT(msg.sender, tokenId, numLeft);
    }

    function batchCreateGiveAway(uint16[] memory tokenIds) public onlyOwner {
        for (uint i=0; i<tokenIds.length; i++) {
            createGiveAway(tokenIds[i]);
        }
    }

    function getAvailableTokensList() public view returns (uint16[] memory) {
        uint numberLeft = numLeft;
        uint16[] memory tokensList = new uint16[](numberLeft);
        for (uint i=0; i<numberLeft; i++) {
            tokensList[i] = availableTokens[i];
        }
        return tokensList;
    }

    function getAvailableTokensCount() public view returns (uint256) {
        return numLeft;
    }

    function getMintFee() public view returns (uint256) {
        uint256 numberLeft = numLeft;
        require(numberLeft <= 9700, "Giveaway tokens not minted yet!");
        uint256 startingPrice = 0.001 ether;
        uint256 endingPrice = 0.2 ether;
        uint256 mintFee = (9700 - numberLeft) * (endingPrice-startingPrice) / 9398 + startingPrice;
        return mintFee;
    }

    function create() public payable returns(uint256) {
        require(addressToMintCount[msg.sender] < maxMints, "Already minted max amount for this address!");
        require(numLeft > 0, "No tokens left!");
        require(numLeft <= 9700, "Giveaway tokens not minted yet!");
        require(msg.value >= getMintFee(), "Insufficient funds!");

        uint256 index = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, numLeft))) % numLeft;

        uint256 tokenId = availableTokens[index];
        _safeMint(msg.sender, tokenId);
        // _setTokenURI(tokenId, string(abi.encodePacked(Strings.toString(tokenId), URIextension)));
        availableTokens[index] = availableTokens[numLeft-1];
        numLeft--;
        addressToMintCount[msg.sender]++;
        emit createdRandomNFT(msg.sender, tokenId, numLeft);
        return tokenId;
    }
}

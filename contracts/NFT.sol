// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract TozauNFT is ERC721URIStorage, Ownable, ERC721Enumerable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("TozauNFT", "tozau") {}

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function mintNFT(string memory _tokenURI) public returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, _tokenURI);

    return newItemId;
  }

  struct NFT {
    uint256 tokenId;
    string tokenURI;
    string name;
    string symbol;
  }

  function fetchMyNFTs() public view returns (NFT[] memory) {
    uint256 totalSupply = _tokenIds.current();
    uint256 itemCounts;
    uint256 currentIndex;

    for (uint256 i = 1; i <= totalSupply; i++) {
      if (msg.sender == ownerOf(i)) {
        itemCounts++;
      }
    }

    NFT[] memory myNFTs = new NFT[](itemCounts);

    for (uint256 i = 1; i <= totalSupply; i++) {
      if (ownerOf(i) == msg.sender) {
        myNFTs[currentIndex] = NFT(i, tokenURI(i), name(), symbol());
        currentIndex++;
      }
    }

    return myNFTs;
  }
}

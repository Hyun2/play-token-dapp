const TozauNFT = artifacts.require("TozauNFT");
const TozauToken = artifacts.require("TozauToken");

module.exports = function (deployer) {
  deployer.deploy(TozauNFT);
  deployer.deploy(TozauToken, "Tozau", "TT");
};

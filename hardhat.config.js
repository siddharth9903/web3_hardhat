/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY='EbPJnsI5WFkf3CkohMNBNQ1u3sNOiiEf'
const ROPSTEN_PUBLIC_KEY='0x9cAEF43Ab7cd3C33EE1218F25801e59Af5D8348B'
const ROPSTEN_PRIVATE_KEY='450a41e194ff339879f56d4947580d58ec4a747ed8be8db5554c1db796ed387c'

 module.exports = {
  solidity: "0.8.9",
  networks:{
    ropsten:{
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    }
  }
};


// deployedToken.address :  0x4864a9b0Cb37F3BED7F0f5F13151cBb31bDD2c64
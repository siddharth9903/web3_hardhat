const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('token contract', function () {
    let Token;
    let hardHatToken;
    let owner;
    let add1;
    let add2;
    let adds;
    beforeEach(async function () {
        Token = await ethers.getContractFactory('Token');
        [owner, add1, add2, ...adds] = await ethers.getSigners();
        console.log('owner.address', owner.address);
        hardHatToken = await Token.deploy();
    })
    describe('Deployment', function () {
        it('should set owner right ', async function () {
            expect(await hardHatToken.owner()).to.equal(owner.address);
        })
        it('should owner have all tokens', async () => {
            let balance = await hardHatToken.balanceOf(owner.address);
            expect(await hardHatToken.totalSupply()).to.equal(balance)
        })
    })
    describe('transaction', function () {
        it('should be transfer right to add1', async () => {
            await hardHatToken.transfer(add1.address, 10);
            const add1Balance = await hardHatToken.balanceOf(add1.address);
            expect(await hardHatToken.balanceOf(add1.address)).to.equal(add1Balance)

            await hardHatToken.connect(add1).transfer(add2.address, 5);
            const newAdd1Balance = await hardHatToken.balanceOf(add1.address);
            const add2Balance = await hardHatToken.balanceOf(add2.address);
            expect(await hardHatToken.balanceOf(add2.address)).to.equal(newAdd1Balance)
            expect(await hardHatToken.balanceOf(add1.address)).to.equal(add2Balance)
        })
        it('should failed if sender does not have enough tokens', async () => {
            const initialOwnerBalance = await hardHatToken.balanceOf(add1.address);
            await expect(hardHatToken.connect(add1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens");
            expect(await hardHatToken.balanceOf(add1.address)).to.equal(initialOwnerBalance);
        })
    })
})

// describe('token contract', function () {

//     it("deployment should assign the total supply of token to owner", async function () {

//         const [owner] = await ethers.getSigners();
//         console.log('signer object owner', owner)
//         const Token = await ethers.getContractFactory('Token');
//         const hardHatToken = await Token.deploy();
//         await hardHatToken.deployed();

//         const ownerBalance = await hardHatToken.balanceOf(owner.address);
//         console.log('owner address', owner.address);
//         console.log('owner balance', ownerBalance);

//         expect(await hardHatToken.totalSupply()).to.equal(ownerBalance);
//     })

//     it("Should transfer token between two different accounts",async function () {
//         const [owner,add1,add2] = await ethers.getSigners();
//         const Token = await ethers.getContractFactory('Token');
//         const hardHatToken = await Token.deploy();
//         // await hardHatToken.deployed();
//         const ownerBalance = await hardHatToken.balanceOf(owner.address);
//         console.log('owner address', owner.address);

//         await hardHatToken.transfer(add1.address,10);
//         expect(await hardHatToken.balanceOf(add1.address)).to.equal(10);
//         console.log('hardHatToken.balanceOf(owner)',await hardHatToken.balanceOf(owner.address));
//         console.log('hardHatToken.balanceOf(add1)',await hardHatToken.balanceOf(add1.address));

//         await hardHatToken.connect(add1).transfer(add2.address,5);
//         expect(await hardHatToken.balanceOf(add1.address)).to.equal(5);
//         expect(await hardHatToken.balanceOf(add2.address)).to.equal(5);
//         console.log('after 2nd traansaction');
//         console.log('hardHatToken.balanceOf(owner)',await hardHatToken.balanceOf(owner.address));
//         console.log('hardHatToken.balanceOf(add1)',await hardHatToken.balanceOf(add1.address));
//         console.log('hardHatToken.balanceOf(add2)',await hardHatToken.balanceOf(add2.address));
//     })
// })
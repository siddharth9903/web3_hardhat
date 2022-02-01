
async function main() {
    const [deplyer] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('Token')
    const deployedToken=await Token.deploy();
    console.log('deployedToken.address : ',deployedToken.address);
}

main()
.then(()=>{process.exit(0)})
.catch((err)=>{console.log(err)})
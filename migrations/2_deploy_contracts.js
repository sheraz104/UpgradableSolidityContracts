const Logic = artifacts.require("./Logic.sol");
const Proxy = artifacts.require("./Proxy.sol");
const Logictwo = artifacts.require("./Logictwo.sol");

module.exports = (deployer) => {
    deployer.deploy(Proxy).then(() => {
        return deployer.deploy(Logic).then(() => {
            return deployer.deploy(Logictwo).then(async () => {
                const ProxyInstance = await Proxy.deployed();
                return await ProxyInstance.setLogicAddress(Logic.address);
            })
        })
    })
}
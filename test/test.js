const Proxy = artifacts.require("./Proxy.sol");
const Logic = artifacts.require("./Logic.sol");
const Logictwo = artifacts.require("./Logictwo.sol");

contract("Test contract", (accounts) => {
    
    it("Get value", async () => {
        const ProxyInstance = await Proxy.deployed();
        const LogicInstance = await Logic.deployed();

        let val = await ProxyInstance.value();
        console.log("value before ",val.toNumber());

        let LogicDelegate = Logic.at(ProxyInstance.address);
        await LogicDelegate.addTwo({from:accounts[0]});
        
        val = await ProxyInstance.value();
        console.log("value after ",val.toNumber());

        
    })

    it("Check with the changed Logic contract", async () => {
        const ProxyInstance = await Proxy.deployed();

        const LogictwoInstance = await Logictwo.deployed();
        await ProxyInstance.setLogicAddress(LogictwoInstance.address);
        LogicDelegate = Logictwo.at(ProxyInstance.address);
        await LogicDelegate.addFive({from:accounts[0]});

        val = await ProxyInstance.value();
        console.log("value after ",val.toNumber());

    })

    
})
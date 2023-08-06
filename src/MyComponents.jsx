import Web3 from 'web3';

export function SayHello() {
    return (
        <h1>Hello, this is a donut vending machine dapp.</h1>
    );
}

export function ConnectMetamask(props) {
    const connect2Metamask = async () => {
        // 检查是否是新的 MetaMask 或 DApp 浏览器
        var web3Provider;
        if (window.ethereum) {
            web3Provider = window.ethereum;
            try {
                // 请求用户授权
                await window.ethereum.enable();
            } catch (error) {
                // 用户不授权时
                console.error("User denied account access")
            }
        } else if (window.web3) { // 老版 MetaMask Legacy dapp browsers...
            web3Provider = window.web3.currentProvider;
        } else {
            // web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
            console.error("please install Metamask");
        }
        props.setweb3(new Web3(web3Provider));
    }

    return (
        <form>
            <button type="submit" onClick={connect2Metamask}>
                Click here to connect to Metamask!
            </button>
        </form>
    );
}
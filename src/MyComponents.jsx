import Web3 from 'web3';

export function SayHello() {
    return (
        <h1>Hello, this is a donut vending machine dapp.</h1>
    );
}

export function ConnectMetamask(props) {
    const connect2Metamask = async (event) => {
        event.preventDefault();
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            props.setweb3(new Web3(window.ethereum));
        } else {
            console.log("MetaMask version out-of-date or it wasn't installed.");
        }
    }

    return (
        <form>
            <button type="submit" onClick={connect2Metamask}>
                Click here to connect to Metamask!
            </button>
        </form>
    );
}


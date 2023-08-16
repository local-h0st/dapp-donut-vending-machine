import styles from './App.module.css';
import Web3 from 'web3';
import { RefetchButton, AccountInfoBlock, MachineInfoBlock, PurchaseDonuts, AlertBlock, RestockBlock, WithdrawEtherBlock } from './MyComponents';
import { createSignal, createResource, Show } from "solid-js";
import { abi, contractAddr } from './DountContractInfo';

function App() {
  // for control
  const [alertMsg, setAlertMsg] = createSignal(null);
  const [refetchFlag, setReF] = createSignal(false);


  // init web3
  var web3 = null;
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
  } else {
    console.log("MetaMask version out-of-date or it wasn't installed.");
  }

  const [donutContract, setDonutContract] = createSignal(null);
  const [accountAddr, setAccountAddr] = createSignal(null);

  (async () => {
    if (await web3.eth.net.isListening()) {
      await web3.eth.getNodeInfo().then((info) => {
        console.log("wallet connected: " + info)
      });
      await web3.eth.net.getId().then((id) => {
        console.log("net id: " + id)
      });
      await web3.eth.getAccounts().then((a) => {
        setAccountAddr(a[0]);
        console.log("Your account addr:", accountAddr());
      });
      setDonutContract(new web3.eth.Contract(abi, contractAddr));
      console.log("contract loaded:", donutContract());
      console.log("all prepared.");
      setReF(true);
      setReF(false);
    } else {
      console.log("web3.eth.net.isListening error.");
    }
  })();



  // refetch account balance
  const [accountBalance, setAccountBalance] = createSignal(null);
  createResource(refetchFlag, async () => {
    await web3.eth.getBalance(accountAddr()).then((r) => {
      setAccountBalance(web3.utils.fromWei(r, 'ether'));
    });
  })
  const [accountDonutBalance, setAccountDonutBalance] = createSignal(null);
  createResource(refetchFlag, async () => {
    await donutContract().methods.donutBalances(accountAddr()).call().then((r) => {
      setAccountDonutBalance(Number(r));
    });
  });

  // refetch machine balance
  const [machineInfo, setMachineInfo] = createSignal(null);
  createResource(refetchFlag, async () => {
    await donutContract().methods.getBalance().call().then((r) => {
      r[0] = Number(r[0]);
      r[1] = web3.utils.fromWei(r[1], 'ether')
      setMachineInfo(r);
    });
  });

  // auto get gas price every 3 seconds
  const [gasPrice, setGasPrice] = createSignal(null);
  setInterval(async () => {
    await web3.eth.getGasPrice().then((result) => {
      setGasPrice(Number(result));
    })
  }, 3000);

  // for test when click the button
  createResource(refetchFlag, () => {

  });

  return (
    <div class={styles.App}>
      <i><h1>Donut Vending Machine</h1></i>
      <i>Decentrialized Application Version</i><br />
      <i>Powered by <a href="https://github.com/local-h0st/dapp-donut-vending-machine">redh3tALWAYS</a></i><br />
      <br />
      <Show
        when={web3}
      >
        <AlertBlock msg={alertMsg()} />
        <RefetchButton setReF={setReF} setAlert={setAlertMsg} /><br />
        <AccountInfoBlock addr={accountAddr()} balance={accountBalance()} donutBalance={accountDonutBalance()} />
        <MachineInfoBlock info={machineInfo()} />
        <PurchaseDonuts contract={donutContract()} addr={accountAddr()} trans={web3.utils.toWei} setAlert={setAlertMsg} gasPrice={gasPrice()} /><br /><br /><br />
        <RestockBlock contract={donutContract()} addr={accountAddr()} setAlert={setAlertMsg} /><br />
        <WithdrawEtherBlock contract={donutContract()} addr={accountAddr()} setAlert={setAlertMsg} />
      </Show>
    </div>
  );
}

export default App;

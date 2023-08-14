import styles from './App.module.css';
import { SayHello, ConnectMetamask } from './MyComponents';
import { createSignal, createResource, Show, For } from "solid-js";
import { abi, contractAddr } from './DountContractInfo';

function App() {
  const [donutContract, createDonutContract] = createSignal(null)
  const [web3, setweb3] = createSignal(null);

  createResource(web3, (web3) => {
    web3.eth.net.isListening()
      .then(() => {
        web3.eth.getNodeInfo().then((info) => console.log("wallet connected: " + info));
        createDonutContract(new web3.eth.Contract(abi, contractAddr));
      })
      .catch(console.log);
  })

  const [machineInfo] = createResource(donutContract, async (c) => {
    return await c.methods.getBalance().call();
  });



  return (
    <div class={styles.App}>
      <SayHello></SayHello>
      <Show
        when={web3()}
        fallback={
          <ConnectMetamask setweb3={setweb3}></ConnectMetamask>
        }
      >
        <div>
          <i>wallet connected.</i>
        </div>

        <Show
          when={!machineInfo.loading}
          fallback={<b>loading machine info ..</b>}
        >
          <b>donuts left: {machineInfo[0]}</b>
        {/* TODO 真是头大 */}
        </Show>
      </Show>
    </div>
  );
}

export default App;

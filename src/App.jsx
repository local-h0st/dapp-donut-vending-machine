import styles from './App.module.css';
import { SayHello, ConnectMetamask } from './MyComponents';
import Web3 from 'web3';
import { createSignal } from "solid-js";





function App() {

  const [web3, setweb3] = createSignal(new Web3());

  return (
    <div class={styles.App}>
      <SayHello></SayHello>
      <ConnectMetamask setweb3={setweb3}></ConnectMetamask>
    </div>
  );
}

export default App;

import { Show, createSignal } from "solid-js";
import Web3 from 'web3';
console.log(Web3);

export function RefetchButton(props) {
    return (
        <div>
            <form>
                <button type="submit" onClick={(event) => {
                    event.preventDefault();
                    props.setReF(true);
                    props.setReF(false);
                    props.setAlert(null);
                }}>
                    REFETCH
                </button>
            </form>
        </div>
    );
}

export function AlertBlock(props) {
    return (
        <Show
        when={props.msg!=null}
        >
            <div>
            <i><b>Alert: </b>{props.msg}</i><br />
        </div>       
        </Show>

 
    );
}

export function AccountInfoBlock(props) {
    return (
        <Show
            when={props.addr != null && props.balance != null && props.donutBalance != null}
        >
            <div>
                <i>Your account address:</i><br />
                <i>({props.addr})</i><br />
                <i>Total <b>{props.balance}</b> SepoliaETH,</i><br />
                <i>Total <b>{props.donutBalance}</b> donuts.</i>
            </div>
        </Show>
    )
}

export function MachineInfoBlock(props) {
    return (
        <Show
            when={props.info != null}
        >
            <div>
                <i>
                    Current status of the donut vending machine:<br />
                    <b>{props.info[0]}</b> donuts left,<br />
                    <b>{props.info[1]}</b> SepoliaETH pledged in contract.
                </i>
            </div>
        </Show>
    )
}

export function PurchaseDonuts(props) {

    const [amount, setAmount] = createSignal(null);
    const [value, setValue] = createSignal(null);

    async function purchase(event) {
        event.preventDefault();
        props.setAlert("Transcation pending ..")
        await props.contract.methods.purchase(amount()).send({ from: props.addr, value: props.trans(value(), 'ether') })
            .then((receipt) => {
                console.log(receipt);
                props.setAlert("Success :) Transcation hash: " + receipt.transactionHash)
            })
            .catch((error)=>{
                console.log(error);
                props.setAlert("Transcation failed :(");
            });
    }

    return (
        <Show
            when={props.contract != null && props.addr != null}
        >
            <div>
                <i>---------------- Purchase Donut Section ----------------</i><br />

                <form>
                    <div>
                        <i><label for="amount">Amount:</label><br /></i>
                        <input
                            id="amount"
                            onInput={(e) => {
                                setAmount(e.currentTarget.value);
                            }}
                        />
                        <br />
                        <i><label for="value">Value(ether):</label><br /></i>
                        <input
                            id="value"
                            onInput={(e) => {
                                setValue(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <button type="submit" onClick={purchase}>
                        purchase the donuts !!
                    </button>
                </form>
            </div>
        </Show>

    );
}
import { Show, createSignal } from "solid-js";
import Web3 from 'web3';
console.log(Web3);

const myAddr = "0x2Af63388DDd21a4e5c6d1E8c0f722807a17eE2EB";


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
            when={props.msg != null}
        >
            <div>
                <i><b>Alert: </b>{props.msg}</i><br /><br />
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
                <i>Total <b>{props.donutBalance}</b> donuts.</i><br />
            </div><br />
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
                    <b>{props.info[1]}</b> SepoliaETH pledged in contract.<br />
                </i>
            </div><br /><br />
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
            .catch((error) => {
                console.log(error);
                props.setAlert("Transcation failed :(");
            });
    }

    return (
        <Show
            when={props.contract != null && props.addr != null}
        >
            <div>
                <i>---------------- Purchase Donut Section ----------------</i><br /><br />
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
                    </div><br />
                    <i>0.001 SepoliaETH per donut !</i><br />
                    <i>Current gas price: {props.gasPrice} wei.</i><br /><br />
                    <button type="submit" onClick={purchase}>
                        Purchase the donuts !!
                    </button>
                </form>
            </div>
        </Show>

    );
}

export function RestockBlock(props) {
    const [restockAmount, setRestockAmount] = createSignal(null);
    const restock = async (event) => {
        event.preventDefault();
        props.setAlert("Restocking donuts ..");
        await props.contract.methods.restock(restockAmount()).send({ from: myAddr })
            .then((receipt) => {
                console.log(receipt);
                props.setAlert("Restock success :)");
            })
            .catch((error) => {
                console.log(error);
                props.setAlert("Restock failed :(");
            });
    }

    return (
        <Show
            when={props.addr == myAddr && props.contract != null}
        >
            <div>
                <i>--------------------- Restock Donuts ---------------------</i><br /><br />
                <form>
                    <div>
                        <i><label for="restockAmount">Restock Amount:</label><br /></i>
                        <input
                            id="restockAmount"
                            onInput={(e) => {
                                setRestockAmount(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <br />
                    <button type="submit" onClick={restock}>
                        Restock them
                    </button>
                </form>
            </div>
        </Show>
    );
}

export function WithdrawEtherBlock(props) {
    const withdraw = async (event) => {
        event.preventDefault();
        props.setAlert("Withdrawing SepoliaETH ..");
        await props.contract.methods.withdraw().send({ from: myAddr })
            .then((receipt) => {
                console.log(receipt);
                props.setAlert("Withdraw success :)");
            })
            .catch((error) => {
                console.log(error);
                props.setAlert("Withdraw failed :(");
            });
    }

    return (
        <Show
            when={props.addr == myAddr && props.contract != null}
        >
            <div>
                <i>------------------ Withdraw SepoliaETH ------------------</i><br /><br />
                <form>
                    <button type="submit" onClick={withdraw}>
                        Withdraw !!
                    </button>
                </form>
            </div>
        </Show>
    );
}
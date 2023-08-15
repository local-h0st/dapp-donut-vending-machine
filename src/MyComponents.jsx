import { Show, createSignal } from "solid-js";
import Web3 from 'web3';
console.log(Web3);

export function SayHello() {
    return (
        <h1>Hello, this is a donut vending machine dapp.</h1>
    );
}

export function RefetchButton(props) {
    return (
        <div>
            <form>
                <button type="submit" onClick={(event) => {
                    event.preventDefault();
                    props.setReF(true);
                    props.setReF(false);
                }}>
                    REFETCH
                </button>
            </form>
        </div>
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

    function purchase(event) {
        event.preventDefault();
        console.log(amount(), value());
    }

    return (
        <Show
        when={props.addr!=null}
        >
<form>
            <div>
                <label for="amount">Amount of donuts you wanna purchase:</label><br />
                <input
                    id="amount"
                    onInput={(e) => {
                        setAmount(e.currentTarget.value);
                    }}
                />
                <br />
                <label for="value">Value you be glad to pay:</label><br />
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
        </Show>
        
    );
}
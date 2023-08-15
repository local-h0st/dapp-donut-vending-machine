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
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonutVendingMachine{
    address  payable owner;
    mapping(address => uint) public donutBalances;

    constructor(){
        owner = payable(msg.sender);
        donutBalances[address(this)] = 0;
    }

    function getBalance() public view returns (uint, uint) {
        return (donutBalances[address(this)], address(this).balance);
    }

    function restock(uint amount) public {
        require(msg.sender == owner, "Only owner can restock the donuts!");
        donutBalances[address(this)]+= amount;
    }

    function withdraw() external  {
        // require(msg.sender==owner);  可以不需要
        owner.transfer(address(this).balance);
    }

    function purchase(uint amount) public payable{
        // payable函数质押所有发过来的eth，有多少算多少
        uint change = msg.value-amount*0.001 ether;
        require(change >= 0 ether, "^_^ 0.001 eth per dount ~");
        require(donutBalances[address(this)] >= amount, "Oops, not enough donuts left, ask owner to add more!");
        donutBalances[address(this)] -= amount;
        donutBalances[address(msg.sender)] += amount;
        payable(msg.sender).transfer(change);   // 找零
        // 如果donuts数量不够，那么eth是否仍然会质押在合约中？
    }
}
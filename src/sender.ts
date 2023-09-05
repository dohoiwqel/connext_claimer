import { BaseWallet, TransactionResponse, ethers } from "ethers";
import readline from 'readline'
import * as fs from 'fs'
import { Login } from "../login.module";
import HttpsProxyAgent from "https-proxy-agent";
import { claimABI } from "./ABI/claim-ABI";
import { Bridge } from "./bridge";
import { tokenABI } from "./ABI/token-ABI";

//ETH
export class Sender {

    private recipient = ethers.getAddress("")
    private NEXTAddress = ethers.getAddress("0xFE67A4450907459c3e1FFf623aA927dD4e28c67a") // ETH кончается на ...67a

    constructor(private wallet: ethers.Wallet) {}

    async waitBalance(): Promise<void> {
        const contract = new ethers.Contract(this.NEXTAddress, tokenABI, this.wallet)
        const balance = await contract.balanceOf(this.wallet.address)
        if(balance === 0n) {
            console.log(`${this.wallet.address} balance ${balance} ждем пока дойдут`)
            return await this.waitBalance()
        } else {
            console.log(`${this.wallet.address} balance ${balance} NEXT`)
            return
        }
    }

    async send() {
        const contract = new ethers.Contract(this.NEXTAddress, tokenABI, this.wallet)
        const balance = await contract.balanceOf(this.wallet.address)
        const tx = await contract.transfer(this.recipient, balance)
        console.log(`Успешно отправили токены с кошелька ${this.wallet.address} tx: ${tx.hash}`)
    }
}
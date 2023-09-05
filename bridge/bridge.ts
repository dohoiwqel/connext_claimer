import { Contract, TransactionResponse, ethers } from "ethers";
import readline from 'readline'
import * as fs from 'fs'
import { Login } from "../login.module";
import HttpsProxyAgent from "https-proxy-agent";
import { tokenABI } from "../ABI/token-ABI";
import { bridgeABI } from "../ABI/bridge-ABI";
import { SdkConfig } from "@connext/sdk";
import { create } from "@connext/sdk";

export class Bridge {

    private NEXTAddress = ethers.getAddress("0x7F5c764cBc14f9669B88837ca1490cCa17c31607") // кончается на ...5e8
    private bridgeAddress = ethers.getAddress('0x8f7492de823025b4cfaab1d34c58963f2af5deda')

    constructor(private wallet: ethers.Wallet) {

    }

    async approve() {
        const MAX_UINT = "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        
        const contract = new ethers.Contract(this.NEXTAddress, tokenABI, this.wallet)
        const tx = await contract.approve(this.bridgeAddress, MAX_UINT)
        console.log(`Выполнен аппрув для ${this.wallet.address} tx: ${tx.hash}`)
    }

    private async getBalance(tokenAddress: string): Promise<bigint> {
        const contract = new ethers.Contract(tokenAddress, tokenABI, this.wallet)
        const balance = await contract.balanceOf(this.wallet.address)
        return balance
    }

    async bridge() {

        const sdkConfig: SdkConfig = {
            signerAddress: this.wallet.address,
            network: "mainnet",
            chains: {
                1869640809: { //OPTIMISM
                    providers: ["https://rpc.ankr.com/optimism"],
                },
                6648936: { //ETH
                    providers: ["https://rpc.ankr.com/eth"],
                },
            },
        };

        const {sdkBase} = await create(sdkConfig)
        const originDomain = "1869640809"
        const destinationDomain = "6648936"

        const balance = 1//await this.getBalance(this.NEXTAddress)
        console.log(balance)

        const destination = destinationDomain
        const to = this.wallet.address
        const asset = this.NEXTAddress
        const delegate = this.wallet.address
        const amount = balance
        const slippage = 500
        const calldata = "0x" 
        const relayerFee = (
            await sdkBase.estimateRelayerFee({
              originDomain, 
              destinationDomain
            })
        ).toString();

        const contract = new Contract(this.bridgeAddress, bridgeABI, this.wallet)

        // const gasLimit = await contract.xcall.estimateGas(
        //     destination,
        //     to,
        //     asset,
        //     delegate,
        //     amount,
        //     slippage,
        //     calldata,
        //     relayerFee,
        // )

        // console.log(gasLimit)
        // return

        const tx: TransactionResponse = await contract.xcall(
            destination,
            to,
            asset,
            delegate,
            amount,
            slippage,
            calldata,
            relayerFee,
            // {
            //     gasLimit: gasLimit
            // }
        )

        console.log(`Выполнен мост ${this.wallet.address} tx: ${tx.hash}`)
    }
}
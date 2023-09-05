import { Contract, TransactionResponse, ethers } from "ethers";
import readline from 'readline'
import * as fs from 'fs'
import { Login } from "../login.module";
import HttpsProxyAgent from "https-proxy-agent";
import { tokenABI } from "./ABI/token-ABI";
import { bridgeABI } from "./ABI/bridge-ABI";
import { SdkConfig } from "@connext/sdk";
import { create } from "@connext/sdk";
import { config } from "../myconfig";

export class Bridge {

    private NEXTAddress = ethers.getAddress("0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8") // кончается на ...5e8
    private bridgeAddress = ethers.getAddress('0xee9dec2712cce65174b561151701bf54b99c24c8')

    constructor(private wallet: ethers.Wallet) {}

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
                1634886255: { //ARBITRUM
                    providers: [config.arbRPC],
                },
                6648936: { //ETH
                    providers: [config.ethRPC],
                },
            },
        };

        const {sdkBase} = await create(sdkConfig)
        const originDomain = "1634886255"
        const destinationDomain = "6648936"

        const balance = await this.getBalance(this.NEXTAddress)

        const destination = destinationDomain
        const to = this.wallet.address
        const asset = this.NEXTAddress
        const delegate = this.wallet.address
        const amount = balance
        const slippage = 500
        const calldata = "0x" 
        let relayerFee = (
            await sdkBase.estimateRelayerFee({
              originDomain, 
              destinationDomain,
            })
        ).toBigInt()

        const contract = new Contract(this.bridgeAddress, bridgeABI, this.wallet)

        const gasLimit = await contract.xcall.estimateGas(
            destination,
            to,
            asset,
            delegate,
            amount,
            slippage,
            calldata,
            {value: relayerFee}
        )

        const gasPrice = (await this.wallet.provider!.getFeeData()).gasPrice

        const tx: TransactionResponse = await contract.xcall(
            destination,
            to,
            asset,
            delegate,
            amount,
            slippage,
            calldata,
            {
                value: relayerFee,
                gasLimit: gasLimit,
                gasPrice: gasPrice! * BigInt(config.arbGasx)
            }
        )

        console.log(`Выполнен мост ${this.wallet.address} tx: ${tx.hash}`)
    }
}
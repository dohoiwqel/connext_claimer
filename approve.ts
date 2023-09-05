import { TransactionResponse, ethers } from "ethers";
import readline from 'readline'
import * as fs from 'fs'
import { Login } from "./login.module";
import HttpsProxyAgent from "https-proxy-agent";
import { Bridge } from "./src/bridge";
import { config } from "./myconfig";

async function read(fileName: string): Promise<string[]> {
    const array: string[] = []
    const readInterface = readline.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity,
    })
    for await (const line of readInterface) {
        array.push(line)
    }
    return array
}

async function main() {

    const provider = new ethers.JsonRpcProvider(config.arbRPC)
    const privateKeys = await read("privateKeys.txt")

    for(let privateKey of privateKeys) {
        const wallet = new ethers.Wallet(privateKey, provider)
        const bridge = new Bridge(wallet)
        await bridge.approve()
    }
}

main()
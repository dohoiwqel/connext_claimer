import { TransactionResponse, ethers } from "ethers";
import readline from 'readline'
import * as fs from 'fs'
import { Login } from "./login.module";
import HttpsProxyAgent from "https-proxy-agent";
import { claimABI } from "./ABI/claim-ABI";
import { Bridge } from "./bridge/bridge";

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

function getProxie(proxie: string) {
    if(!proxie) return undefined;
    const [ip, port, username, password] = proxie.split(':')
    return new HttpsProxyAgent.HttpsProxyAgent(`http://${username}:${password}@${ip}:${port}`)
}

function checkWallets(args: any, privateKeys: string[], provider: ethers.JsonRpcProvider) {

    for(let [i, privateKey] of privateKeys.entries()) {
        const wallet = new ethers.Wallet(privateKey, provider)
        
        const argAddress = args[i][0]

        if(wallet.address !== argAddress) {
            throw `Аккаунты не соотвествует файлу args`
        }
    }
}

async function main() {

    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/optimism")
    const privateKeys = await read("privateKeys.txt")
    const proxies = await read("proxies.txt")

    //@ts-ignore
    const args = JSON.parse(fs.readFileSync('args.json'))
    checkWallets(args, privateKeys, provider)

    for(let [i, privateKey] of privateKeys.entries()) {

        // (async () => {
        //     const wallet = new ethers.Wallet(privateKey, provider)
        //     const contractAddress = ''
        //     const contract = new ethers.Contract(contractAddress, claimABI, wallet)
    
        //     const [walletAddress, recipientDomain, beneficiary, beneficiaryDomain, proofAmount, signature, proof] = args[i]
        //     const tx: TransactionResponse = await contract.claimBySignature(
        //         walletAddress,
        //         recipientDomain,
        //         beneficiary,
        //         beneficiaryDomain,
        //         proofAmount,
        //         signature,
        //         proof
        //     )
    
        //     console.log(`Успешно заклеймили ${walletAddress} tx:${tx.hash}`)
        // })()

        const wallet = new ethers.Wallet(privateKey, provider)
        const bridge = new Bridge(wallet);
        await bridge.bridge()

        
    }
}

main()
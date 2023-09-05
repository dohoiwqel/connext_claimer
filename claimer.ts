import { TransactionResponse, ethers } from "ethers";
import readline from 'readline'
import * as fs from 'fs'
import { Login } from "./login.module";
import HttpsProxyAgent from "https-proxy-agent";
import { claimABI } from "./src/ABI/claim-ABI";
import { Bridge } from "./src/bridge";
import { Sender } from "./src/sender";

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

const OPprovider = new ethers.JsonRpcProvider("https://rpc.ankr.com/optimism")
const ETHprovider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth") 

async function task(privateKey: string, args: any[]) {
    while(true) {
        try {
            let wallet = new ethers.Wallet(privateKey, OPprovider)
            const contractAddress = '' // Контракт клейма в оп
            const contract = new ethers.Contract(contractAddress, claimABI, wallet)
    
            const [walletAddress, recipientDomain, beneficiary, beneficiaryDomain, proofAmount, signature, proof] = args

            const tx: TransactionResponse = await contract.claimBySignature(
                walletAddress,
                recipientDomain,
                beneficiary,
                beneficiaryDomain,
                proofAmount,
                signature,
                proof
            )
    
            console.log(`Успешно заклеймили ${walletAddress} tx:${tx.hash}`)
    
            const bridge = new Bridge(wallet)
            await bridge.bridge()
    
            wallet = new ethers.Wallet(privateKey, ETHprovider)
            const sender = new Sender(wallet)
            await sender.waitBalance()
            await sender.send()
            return
        } catch(e) {
            console.log(e)
            await new Promise(resolve => setTimeout(() => resolve(' '), 1000))
        }
    }
}

async function main() {

    const privateKeys = await read("privateKeys.txt")

    //@ts-ignore
    const args = JSON.parse(fs.readFileSync('args.json'))
    checkWallets(args, privateKeys, OPprovider)

    for(let [i, privateKey] of privateKeys.entries()) {
        console.log(i);
        task(privateKey, args[i])
    }
}

main()
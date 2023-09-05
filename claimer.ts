import { TransactionResponse, ethers } from "ethers";
import readline from 'readline'
import * as fs from 'fs'
import { Login } from "./login.module";
import HttpsProxyAgent from "https-proxy-agent";
import { claimABI } from "./src/ABI/claim-ABI";
import { Bridge } from "./src/bridge";
import { Sender } from "./src/sender";
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

function checkWallets(args: any, privateKeys: string[], provider: ethers.JsonRpcProvider) {

    for(let [i, privateKey] of privateKeys.entries()) {
        const wallet = new ethers.Wallet(privateKey, provider)
        
        const argAddress = args[i][0]

        if(wallet.address !== argAddress) {
            throw `Аккаунты не соотвествует файлу args`
        }
    }
}

const ARBprovider = new ethers.JsonRpcProvider(config.arbRPC)
const ETHprovider = new ethers.JsonRpcProvider(config.ethRPC) 

async function task(privateKey: string, args: any[], arbRecipient: string) {
    while(true) {
        try {
            let wallet = new ethers.Wallet(privateKey, ARBprovider)
            const contractAddress = config.contractAddress // Контракт клейма в АРБ
            const contract = new ethers.Contract(contractAddress, claimABI, wallet)
    
            const [walletAddress, recipientDomain, beneficiary, beneficiaryDomain, proofAmount, signature, proof] = args

            const gasPrice = (await ARBprovider.getFeeData()).gasPrice

            const tx: TransactionResponse = await contract.claimBySignature(
                walletAddress,
                recipientDomain,
                beneficiary,
                beneficiaryDomain,
                proofAmount,
                signature,
                proof,
                {
                    gasPrice: gasPrice! * BigInt(config.arbGasx)
                }
            )
    
            console.log(`Успешно заклеймили ${walletAddress} tx:${tx.hash}`)

            //АРБ ТРАНСФЕР
            const sender = new Sender(wallet)
            await sender.waitBalance()
            await sender.send(arbRecipient)
    
            return

        } catch(e) {
            console.log(e)
            await new Promise(resolve => setTimeout(() => resolve(' '), 1000))
        }
    }
}

async function main() {
    let promises: any[] = []
    const privateKeys = await read("privateKeys.txt")
    //@ts-ignore
    const args = JSON.parse(fs.readFileSync('args.json'))
    checkWallets(args, privateKeys, ARBprovider)

    const arbRecipient = new ethers.Wallet(privateKeys[0], ARBprovider)

    for(let [i, privateKey] of privateKeys.entries()) {
        
        promises.push(task(privateKey, args[i], arbRecipient.address))
        await Promise.all(promises)
        
        const bridge = new Bridge(arbRecipient)
        await bridge.bridge()

        //ЕТХ трансфер
        const sender = new Sender(arbRecipient)
        await sender.waitBalance()
        await sender.send(config.recipient)
    }
}

main()
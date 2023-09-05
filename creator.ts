import { ethers } from "ethers";
import readline from 'readline'
import * as fs from 'fs'
import { Login } from "./login.module";
import HttpsProxyAgent from "https-proxy-agent";
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

function getProxie(proxie: string) {
    if(!proxie) return undefined;
    const [ip, port, username, password] = proxie.split(':')
    return new HttpsProxyAgent.HttpsProxyAgent(`http://${username}:${password}@${ip}:${port}`)
}

async function main() {

    const provider = new ethers.JsonRpcProvider(config.arbRPC)
    const privateKeys = await read("privateKeys.txt")
    const proxies = await read("proxies.txt")

    if(proxies.length < privateKeys.length) {
        console.log('Количество прокси должно быть >= чем количество аккаунтов')
        return
    }

    const args = {}

    for(let [i, privateKey] of privateKeys.entries()) {
        const wallet = new ethers.Wallet(privateKey, provider)
        console.log(wallet.address)
        const login = new Login(wallet, getProxie(proxies[i]))
        await login.authenticate()
        const [walletAddress, recipientDomain, beneficiary, beneficiaryDomain, proofAmount, signature, proof] = await login.getArgs()

        //@ts-ignore
        args[i] = [walletAddress, recipientDomain, beneficiary, beneficiaryDomain, proofAmount, signature, proof]
    }

    fs.writeFileSync('args.json', JSON.stringify(args))
    console.log('Аргументы созданы')
}

main()
import axios, { AxiosInstance } from 'axios'
import HttpsProxyAgent from 'https-proxy-agent'
import { ethers, version, Wallet } from 'ethers'
import { SiweMessage } from "siwe";


const headers = {
    'authority': 'api.tokensoft.io',
    'accept': '*/*',
    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'cache-control': 'no-cache',
    'authorization': '',
    'content-type': 'application/json',
    'origin': 'https://airdrop.connext.network',
    'pragma': 'no-cache',
    'referer': 'https://airdrop.connext.network/',
    'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
}

export class Login {

    private instance: AxiosInstance

    constructor(
        private wallet: Wallet,
        private proxyAgent?: HttpsProxyAgent.HttpsProxyAgent,
    ) {
        if(this.proxyAgent) {
            this.instance = axios.create(
                {
                    headers: headers,
                    proxy: false,
                    httpsAgent: this.proxyAgent,
                }
            )
        } else {
            this.instance = axios.create(
                {
                    headers: headers
                }
            )
        }
    }

    private async getNonce() {
        const res = await this.instance.post('https://api.tokensoft.io/auth/api/v1/wallets/nonce', 
            {
                'walletAddress': this.wallet.address
            }
        )
        return res.data.nonce
    }

    private async getSignature() {
        const nonce = await this.getNonce()
        const date = (new Date).toISOString()

        const message = {
            "domain": "airdrop.connext.network",
            "address": this.wallet.address,
            "statement": "This site is powered by Tokensoft. Sign this message to prove ownership of this wallet and accept our Terms of Service, Privacy Policy, and Cookie Policy: https://tokensoft.io/legal",
            "uri": "https://airdrop.connext.network",
            "version": "1",
            "chainId": 1,
            "nonce": nonce,
            "issuedAt": date
        }

        const stringMessage = (new SiweMessage({
            "domain": "airdrop.connext.network",
            "address": this.wallet.address,
            "statement": "This site is powered by Tokensoft. Sign this message to prove ownership of this wallet and accept our Terms of Service, Privacy Policy, and Cookie Policy: https://tokensoft.io/legal",
            "uri": "https://airdrop.connext.network",
            "version": "1",
            "chainId": 1,
            "nonce": nonce,
            "issuedAt": date
        })).prepareMessage()

        const signature = await this.wallet.signMessage(stringMessage)
        return {signature: signature, message: message}
    }

    async authenticate() {
        const {signature, message} = await this.getSignature()
        const response = await this.instance.post(
            'https://api.tokensoft.io/auth/api/v1/wallets/connect',
            {
              'walletAddress': this.wallet.address,
              'signature': signature,
              'message': message,
              'nonce': message.nonce
            }
        )

        const authToken = `Bearer ${response.data.token}`
        this.instance.defaults.headers['authorization'] = authToken
    }

    // async getToken(): Promise<number> {
    //     const authToken = await this.getAuth()
    //     this.instance.defaults.headers['authorization'] = authToken
    //     const response = await this.instance.get('https://api.tokensoft.io/payment/api/v1/events/52/eligibility')
    //     console.log(this.wallet.address)
    //     try {
    //         return parseFloat(ethers.formatEther(response.data.eligibility.amount))
    //     } catch(e) {
    //         return 0
    //     }
    // }

    private chainIdToConnextDomain(chainId: number) {
        // const chainId = Number((await this.wallet.provider!.getNetwork()).chainId)
            
        switch (chainId) {
          case 1: // Mainnet
            return 6648936
          case 10: // Optimism
            return 1869640809
          case 137: // Polygon
            return 1886350457
          case 42161: // Arbitrum One
            return 1634886255
          case 56: // Binance Smart Chain
            return 6450786
          case 100: // Gnosis
            return 6778479
          case 5: // Goerli
            return 1735353714
          case 420: // Optimism-Goerli
            return 1735356532
          case 80001: // Mumbai
            return 9991
          case 421613: // Arbitrum-Goerli
            return 1734439522
          case 280: // zkSync Era Testnet
            return 2053862260
          case 59140: // Linea Testnet
            return 1668247156
          case 1442: // Polygon zkEVM Testnet
            return 1887071092
          default:
            return 1
        }
    }

    private async getData() {
        const response = await this.instance.get('https://api.tokensoft.io/distributor/api/v1/distributors/52')
        const data = response.data

        const chainId = data.distributor.event.networkId
        const proof = data.distributor.event.authorization.proof
        const beneficiary = ethers.getAddress(data.distributor.event.authorization.data[0].value)
        const amount = data.distributor.event.authorization.data[1].value
        const domain = data.distributor.event.authorization.data[2].value

        return {chainId, proof, beneficiary, amount, domain}
    }

    async getArgs() {

        const walletAddress = this.wallet.address
        const {chainId, proof, beneficiary, amount, domain} = await this.getData()
        const recipientDomain = this.chainIdToConnextDomain(chainId)
        const beneficiaryDomain = this.chainIdToConnextDomain(chainId)
        const proofAmount = amount

        const txData = [
            { name: "recipient", type: "address", value: walletAddress },
            { name: "recipientDomain", type: "uint32", value: recipientDomain }, //1634886255 для арбы
            { name: "beneficiary", type: "address", value: beneficiary },
            { name: "beneficiaryDomain", type: "uint32", value: beneficiaryDomain }, //1634886255 для арбы
            { name: "amount", type: "uint256", value: proofAmount }
        ]

        const getSignatureHash = (txData: any[]) => {
            return ethers.getBytes(ethers.solidityPackedKeccak256(txData.map(t => t.type), txData.map(t => t.value)))
        }

        const hash = getSignatureHash(txData)
        const signature = await this.wallet.signMessage(hash)

        return [walletAddress, recipientDomain, beneficiary, beneficiaryDomain, proofAmount, signature, proof]
    }
}
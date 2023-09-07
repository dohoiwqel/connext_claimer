## connext-claimer
TypeScript implementation of getting Merkle-proof from back-end Tokensoft to claim and send $NEXT tokens via [airdrop.connext.network](https://airdrop.connext.network)

### Install `Node.js`
```sh
sudo apt install git
sudo apt install nodejs
sudo apt install npm
node -v
npm -v
```
### Clone repo and install dependencies
```sh
git clone https://github.com/whonion//ts-connext-claimer.git
cd ts-connext-claimer
npm ci
npm i -g typescript
```
### Fill in the required data
 - add your private keys to `privateKeys.txt` file
 - add `recipient`-address to `myconfig.ts` 
 - add `token-distributor` address to  `myconfig.ts` (already set default)
 - add your private proxy to `proxies.txt`:( **ip:port@login:password format** )  
 - compile TypeScript-files with command: `tsc --project tsconfig.json`

### Run the script step by step
 - Create arguments for claim using function `Claim by Signature` :
    ```sh
    node creator.js
    ```
 - Run `claimer` to use the data ( from `arg.json` ) obtained in the previous step :
    ```sh
    node claimer.js
    ```
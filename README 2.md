# blockchain-developer-bootcamp-final-project
blockchain-developer-bootcamp-final-project

BlindDate

An ERC20 Utility Smart Contract / Token. 

That enables people to meet on chain, converse and decide whether to date in real life, in the metaverse or continue looking for a match. The core idea is based around a dating mechanism that encourages people to get to know each other, rather than swipe left/right before they get to know matches. 
## Setup (React, Truffle, Ganache)

- inside the root folder
- install dependancies `npm i`
- run react dapp `npm run start`
- open ganache app
- `truffle compile --network development` to build contracts (copy the output into /src/build/contracts)
- deploy smart contract inside local development env `truffle migrate --network development`
- when making contract changes run: `truffle compile` then `truffle migrate --reset --network development` (move root/contracts folder into REACT src/build/contracts each time)
- Once the Dapp is running on localhost 3000, select create mock profile
- Change your wallet address and create another
- With 2 addresses, select 'date' which will create a date between the two addresses

Get contract size:

`truffle run contract-size`

## Network React

See App.js line 43: `const networkId = 3; // ropsten or for localhost use 5777;`

## Tests

run `truffle test`
## Project Demo walk through

https://www.youtube.com/watch?v=WHeQudPyhjc&feature=youtu.be

## Github Pages

https://nicktaras.github.io/blockchain-developer-bootcamp-final-project/build/
## Deployed to Ropsten

https://ropsten.etherscan.io/address/0xa62985EB8538270F25426962234bb8A0eCA8e0F3

## Notes / status of project

During the final stage of development, it became clear that some of the methods worked inside Remix, but not in test deployment (localhost) including; updating and deactiation of profiles.

The messages in a real world product would be encrypted and stored on a service such as IPFS to reduce costs. At this time, these can all be read onchain.

I would have liked to have dug deeper into creating a DAO with this concept, allowing people to vote on if a message is offensive and giving tokens for their time to assist.
Have a means build governance around roles, benefits and a multi-sig implementation to ensure eth stored in the contract can be used wisely to improve the Dapp.

A reveal methodology to the platform was intended, revealing more about their date as they progress. With supporting Tokenomics to encourage the users to engage with their date - getting to know the other person before the date is over.

Please answer the following questions. Does your project:

1. Follow this naming format: https://github.com/YOUR_GITHUB_USERNAME_HERE/blockchain-developer-bootcamp-final-project? YES

2. Contain a README.md file which describes the project, describes the directory structure, and where the frontend project can be accessed? And has your public Ethereum address if you'd like your certification as an NFT (optional)? YES

3. Contain smart contract(s) which:
--Are commented to the specs described by NatSpec Solidity documentation
--Use at least two design patterns from the "Smart Contracts" section
--Protect against two attack vectors from the "Smart Contracts" section with its the SWC number
--Inherits from at least one library or interface
--Can be easily compiled, migrated and tested? YES

4. Contain a Markdown file named design_pattern_decisions.md and avoiding_common_attacks.md? YES

5. Have at least five smart contract unit tests that pass? YES

6. Contain a `deployed_address.txt` file which contains the testnet address and network where your contract(s) have been deployed? YES

7. Have a frontend interface built with a framework like React or HTML/CSS/JS that:
--Detects the presence of MetaMask
--Connects to the current account
--Displays information from your smart contract
--Allows a user to submit a transaction to update smart contract state
--Updates the frontend if the transaction is successful or not? YES

8. Hosted on Github Pages, Heroku, Netlify, Fleek, or some other free frontend service that gives users a public interface to your decentralized application? (That address should be in your README.md document) YES

9. Have clear instructions for: 
1) Installing dependencies for your project 
2) Accessing orâ€”if your project needs a server (not required)â€”running your project
3) Running your smart contract unit tests and which port a local testnet should be running on. YES

10. A screencast of you walking through your project? YES

Congratulations on finishing your final project!

Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000000 (0x7a1200)
1_initial_migration.js
======================
   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x60d151a04f89108b12db3f2701a51ff948538bff58896891b94b99fe3eef1ea9
   > Blocks: 1            Seconds: 13
   > contract address:    0x7f23805437CA7195DBa6B14342488844a3c2fFBA
   > block number:        11526531
   > block timestamp:     1638283817
   > account:             0x16280eeE823Ba628E9Ef5e2036c253B253fE31Fe
   > balance:             0.885213288000420409
   > gas used:            245600 (0x3bf60)
   > gas price:           2.643494829 gwei
   > value sent:          0 ETH
   > total cost:          0.0006492423300024 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.0006492423300024 ETH

2_deploy_contracts.js
=====================

   Deploying 'BlindDate'
   ---------------------
   > transaction hash:    0x34a6b71258479b169cd36cce9eef18581cd0a9dc366399a092cc9c6bad3389dd
   > Blocks: 0            Seconds: 21
   > contract address:    0xa62985EB8538270F25426962234bb8A0eCA8e0F3
   > block number:        11526533
   > block timestamp:     1638283855
   > account:             0x16280eeE823Ba628E9Ef5e2036c253B253fE31Fe
   > balance:             0.871527263539371216
   > gas used:            5116200 (0x4e1128)
   > gas price:           2.651272956 gwei
   > value sent:          0 ETH
   > total cost:          0.0135644426974872 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.0135644426974872 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.0142136850274896 ETH


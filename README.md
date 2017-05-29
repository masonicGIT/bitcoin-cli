# bitcoin-cli
An offline Bitcoin key generator for use with air-gapped wallets

# Installation

Install the package globally for native command line use.

```bash
git clone https://github.com/masonicGIT/bitcoin-cli
cd bitcoin-cli
npm install -g
```

# Multi-Signature Wallets with Electrum

## 2/3 Wallet with Electrum Support

### Create Wallet
The following model will assume a maximum of 3 cosigners on the wallet with a requirement of 2 signatures from any 2 cosigners to create a valid transaction. The third cosginer is assumed to be not a primary signatory, but an escrow agent who is provisioned to provide a signature in the case of an emergency when 1 of the other 2 cosigners are not available.

**Perform Offline**

1. Generate three key pairs on three different air-gapped machines.

   Enter your password as prompted. This will generate a keypair for import with the Electrum Wallet. The key file will be saved wherever you run the program.
   ```bash
   $ bitcoin-cli wallet create
     Enter password: ****
     Confirm password: ****
   ```
   
   Type `ls` to view the keyfile generated
   
   ```bash
   $ ls
     xpub661MyMwAqRbcGmH2PKakwGL7ZaGur4GTvMfGqbwj3q7hioDCLSg9xDVhiNSykNTyGBqR1KctpQen8aiZWDQS54ndyoMQBEayjJ93eQR9yz4.key
   ```

   The keyfile generated will contain a public key as well as an encrypted private key. It will resemble the following:
   
   ```bash
   xpub661MyMwAqRbcGmH2PKakwGL7ZaGur4GTvMfGqbwj3q7hioDCLSg9xDVhiNSykNTyGBqR1KctpQen8aiZWDQS54ndyoMQBEayjJ93eQR9yz4
 
      {"iv":"Ut6lqOOEAoP/unzVX3ayuA==","v":1,"iter":10000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"yvMQ+qQar54=","ct":"C2TNqG8G7/ShCtltNxwWyDE4wqSgwabO/J2TUMSwgvEQGnIpKunkRyZqzvxggoMH9VpXXpbFzsOm8QXpJUib3782/st0nbjFi9aSBq+PODdz+3mJGBjr3tpfRB6zn0htDbrtn2aT8c/S/bjTQ5O5hDepy4Bvej8="}
   ```
   Generate each key separately on a unique machine and set the key onto a USB for safe offline storage.

**Perform Online**

2. Install and open Electrum

   Enter your wallet name
   ![Electrum 1](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-1.png?raw=true) 
   
   Select `multi-signature wallet` and click next
   ![Electrum 2](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-2.png?raw=true) 
   
   Set a `3 cosigners` and `2 signatures` wallet and click next
   ![Electrum 3](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-3.png?raw=true) 
      
   Select `use public or private keys` and click next
   ![Electrum 4](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-4.png?raw=true) 
         
   Enter the 1st cosigners public key and click next
   ![Electrum 5](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-5.png?raw=true) 
            
   Confirm that the public key is the same one as previously entered, then click next.            
   ![Electrum 6](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-6.png?raw=true) 
   
   Enter the 2nd cosigners public key and click next
   ![Electrum 7](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-7.png?raw=true) 

   Click next
   ![Electrum 8](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-8.png?raw=true) 

   Enter the escrow agents public key and click next
   ![Electrum 9](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-9.png?raw=true) 
      
   Wait for the wallet to be generated
   ![Electrum 10](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-10.png?raw=true) 
         
   On this screen you should receieve a warning indicated that your wallet is `watch-only`.
   ![Electrum 11](https://github.com/masonicGIT/bitcoin-cli/blob/master/img/electrum-create-wallet-11.png?raw=true) 

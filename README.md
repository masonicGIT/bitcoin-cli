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

#### 2/3 Wallet with Electrum Support

**Perform Offline**

1. Generate three key pairs on three different air-gapped machines.
   ```bash
   bitcoin-cli create wallet
   ```

   Enter your password as prompted. This will generate a keypair for import with the Electrum Wallet. The key file will be saved wherever you run the program.

   Generate each key separately on a unique machine and set the key onto a USB for safe offline storage.

**Perform Online**

2. Create wallet with public keys


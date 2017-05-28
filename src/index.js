#!/usr/bin/env node

'use strict';

const co = require('co');
const fs = require('fs');
const sjcl = require('sjcl');
const chalk = require('chalk');
const Promise = require('Bluebird');
const prompt = require('co-prompt');
const program = require('commander');
const bitcoin = require('bitcoinjs-lib');

const promisifyAll = Promise.promisifyAll;
const moreEntropy = promisifyAll(require('more-entropy'));

const writeFile = (filename, data) => {
  fs.writeFileSync(filename, data);
  console.log('Successfully saved private key at: ' + path)
  process.exit(1);
}

const getEntropy = () => {
    let generator = new moreEntropy.Generator();
    return generator.generateAsync(192)
    .catch(function(response) {
      // The generate library always returns a success as an failure
      return response;
    })
}

const create = () => {
  co(function *() {
   let password = yield prompt.password(chalk.yellow('Enter password: '));
   let confirmPassword = yield prompt.password(chalk.yellow('Confirm password: '));

   if (password !== confirmPassword) {
      console.error(chalk.red('\nPasswords do not match. Please try again.'));
      process.exit(1);
    }

    const entropy = yield getEntropy();
    const master = bitcoin.HDNode.fromSeedBuffer(new Buffer(entropy));
    let privateKey = master.toBase58();
    let publicKey = master.neutered().toBase58();
    let encryptedPrivateKey = sjcl.encrypt(password, privateKey);
    return writeFile('./' + publicKey + '.key', privateKey + '\n' + publicKey + '\n' + encryptedPrivateKey);
  })
}

const encrypt = () => {
  co(function *() {
    let data = yield prompt(chalk.yellow('Enter data: '));
    let password = yield prompt.password(chalk.yellow('Enter password: '));
    let confirmPassword = yield prompt.password(chalk.yellow('Confirm password: '));

    if (password !== confirmPassword) {
      console.error(chalk.red('\nPasswords do not match. Please try again.'));
      process.exit(1);
    }

    const encryptedData = sjcl.encrypt(password, data);
    const decryptedData = sjcl.decrypt(password, encryptedData);

    if (data !== decryptedData) {
      console.error(chalk.red('\nThere we an error encrypting the data. Please try again'));
      process.exit(1);
    }
    console.log(chalk.green('Encrypted data:\n\t\t %s'), encryptedData);
  })
}

const decrypt = () => {
  co(function *() {
    let encryptedData = yield prompt(chalk.yellow('Enter encrypted data: '));
    let password = yield prompt.password(chalk.yellow('Enter password: '));
    
    let decryptedData;

    try {
      decryptedData = sjcl.decrypt(password, encryptedData);
    } catch(error) {
      console.error(chalk.red('\nIncorrect password. Please try again.'));
      process.exit(1);
    }

    console.log(chalk.green('Decrypted data:\n\t\t %s'), decryptedData);
  })
}

program.command('wallet [cmd]')
       .description('run wallet commands')
       .action((cmd) => {
         if (!cmd) {
           program.help();
           process.exit(1);
	       }
         create();
       }) 

program.command('encrypt')
       .description('encrypt raw data')

program.command('decrypt')
       .description('decrypt SJCL encrypted data')

program.on('encrypt', () => { encrypt() })
       .on('decrypt', () => { decrypt() })
       .on('*', () => { program.help() });

program.parse(process.argv);



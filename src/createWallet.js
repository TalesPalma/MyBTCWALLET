// Import dependencies / Importar dependências
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';


try{
// Define network / Definir rede
// Testnet is the bitcoin network for testing purposes
// Testnet é a rede bitcoin para fins de teste
const network = bitcoin.networks.testnet;

// Derivation path / Caminho de derivação
// It's the derivation for HD wallets
// É a derivação para carteiras HD
const path = "m/44'/1'/0'/0/0";

// Generate a random mnemonic / Gerar um mnemônico aleatório
// Generates a mnemonic for our seed (password / access phrase)
// Gera um mnemônico para nossa seed (palavra de senha / acesso)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Create root of our key tree / Criar raiz da nossa árvore de chaves
let root = bip32.fromSeed(seed, network);

// Create account / Criar conta
let account = root.derivePath(path);
let node = account.derive(0).derive(0)

let btcAndress = bitcoin.payments.p2pkh({
    pubkey: account.publicKey,
    network: network
}).address;

console.log("Carteira criada com sucesso!");
console.log("Endereço da carteira: ", btcAndress);
console.log("Chave privada:", node.toWIF());
console.log("Seed:",mnemonic)

} catch (error) {
    console.log("Erro ao criar a carteira:", error);
}



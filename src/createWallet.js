import { networks, payments } from 'bitcoinjs-lib';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { fromSeed } from 'bip32';


// Definir a rede Testnet
const testnet = networks.testnet;

// Gerar uma seed usando bip39
const mnemonic = generateMnemonic();
console.log('Mnemonic:', mnemonic);

mnemonicToSeed(mnemonic).then((seed) => {
  // Derivar a raiz da chave usando bip32
  const root = fromSeed(seed, testnet);

  // Derivar o caminho padrão da carteira (m/44'/1'/0'/0/0)
  const path = `m/44'/1'/0'/0/0`;
  const account = root.derivePath(path);

  // Gerar chave privada e endereço público
  const privateKey = account.toWIF();
  const { address } = payments.p2pkh({
    pubkey: account.publicKey,
    network: testnet,
  });

  console.log('Endereço Testnet:', address);
  console.log('Chave Privada (WIF):', privateKey);
});

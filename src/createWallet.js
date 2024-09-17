import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { BIP32Factory } from 'bip32';

const bip32 = BIP32Factory(ecc);

async function createWallet() {
	try {
		// Definir rede como testnet4
		const network = {
			...bitcoin.networks.testnet,
			bip32: {
				public: 0x043587cf,
				private: 0x04358394
			}
		};

		// Caminho de derivação para testnet4
		const path = "m/44'/1'/0'/0/0";

		const mnemonic = bip39.generateMnemonic();
		const seed = await bip39.mnemonicToSeed(mnemonic);

		const root = bip32.fromSeed(seed, network);
		const child = root.derivePath(path);

		// Gerar endereço P2WPKH (SegWit) para testnet4
		const { address } = bitcoin.payments.p2wpkh({
			pubkey: child.publicKey,
			network: network
		});

		console.log("Carteira criada com sucesso!");
		console.log("Endereço da carteira (testnet4):", address);
		console.log("Chave privada:", child.toWIF());
		console.log("Seed:", mnemonic);

		if (!address.startsWith("tb1")) {
			throw new Error("Endereço inválido para testnet4");
		}

	} catch (error) {
		console.log("Erro ao criar a carteira:", error);
	}
}

createWallet();

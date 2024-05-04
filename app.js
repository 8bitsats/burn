// Imports
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { WalletAdapterNetwork, WalletProvider } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

// Initialize connection and wallet adapter
const network = WalletAdapterNetwork.Mainnet;
const connection = new Connection(network);
const wallet = new PhantomWalletAdapter();

const connectButton = document.getElementById('connect-wallet');
const burnButton = document.getElementById('burn-token');
const walletInfo = document.getElementById('wallet-info');

connectButton.onclick = async () => {
    await wallet.connect();
    walletInfo.innerText = `Connected: ${wallet.publicKey.toString()}`;
    burnButton.disabled = false;
};

burnButton.onclick = async () => {
    const amount = document.getElementById('burn-amount').value;
    const burnAddress = new PublicKey('YourBurnAddressHere');
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: burnAddress,
            lamports: parseInt(amount * 1e9) // Adjust decimals for the SPL token
        })
    );

    try {
        await wallet.sendTransaction(transaction, connection);
        alert('Token Burned Successfully');
    } catch (error) {
        console.error('Burn failed', error);
        alert('Token Burn Failed');
    }
};

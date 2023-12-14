import '@/styles/tailwind.css'
import 'focus-visible'
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

export default function App({ Component, pageProps }) {
  const wallets = [new PetraWallet()];
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <Component {...pageProps} />
    </AptosWalletAdapterProvider>
  )
}

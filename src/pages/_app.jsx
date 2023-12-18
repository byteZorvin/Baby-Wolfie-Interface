import '@/styles/tailwind.css'
import 'focus-visible'
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
// import { ShadowWallet } from "@flipperplatform/wallet-adapter-plugin";
// import { NightlyWallet } from "@nightlylabs/aptos-wallet-adapter-plugin";
// import { OpenBlockWallet } from "@openblockhq/aptos-wallet-adapter";
// import { RiseWallet } from "@rise-wallet/wallet-adapter";
// import { TokenPocketWallet } from "@tp-lab/aptos-wallet-adapter";
// import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
// import { MSafeWalletAdapter } from "@msafe/aptos-wallet-adapter";
// import { WelldoneWallet } from "@welldone-studio/aptos-wallet-adapter";
// import { OKXWallet } from '@okwallet/aptos-wallet-adapter';

export default function App({ Component, pageProps }) {

  const wallets = [
    new FewchaWallet(),
    new MartianWallet(),
    new PetraWallet(),
    new PontemWallet(),
    // new ShadowWallet(),
    // new MSafeWalletAdapter(),
    // new NightlyWallet(),
    // new OpenBlockWallet(),
    // new RiseWallet(),
    // new TokenPocketWallet(),
    // new TrustWallet(),
    // new WelldoneWallet(),
    // new OKXWallet(),
  ];  
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={false}>
      <Component {...pageProps} />
    </AptosWalletAdapterProvider>
  )
}

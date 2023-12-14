export const DAPP_NAME = process.env.NEXT_PUBLIC_DAPP_NAME; 
export const DAPP_ADDRESS = process.env.NEXT_PUBLIC_DAPP_ADDRESS; 
export const MARKET_COINT_TYPE = process.env.NEXT_PUBLIC_MARKET_COIN_TYPE;

export const APTOS_NODE_URL = process.env.NEXT_PUBLIC_APTOS_NODE_URL;
export const APTOS_FAUCET_URL = process.env.NEXT_PUBLIC_APTOS_FAUCET_URL;

export const NETWORK=process.env.NEXT_PUBLIC_APTOS_NETWORK;

export const MODULE_URL="https://explorer.aptoslabs.com/account/" + DAPP_ADDRESS + "/modules?network=" + NETWORK
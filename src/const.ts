export const DEBUG = false;
export const MAX_UINT256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
export const NETWORK = DEBUG ? "kovan" : "mainnet";

export const RDAI_INDIA_RELIEF_HAT = DEBUG ? 75 : 248; // Random testnet Hat
export const RDAI_PROXY_CONTRACT = DEBUG
  ? "0x462303f77a3f17Dbd95eb7bab412FE4937F9B9CB"
  : "0x261b45d85ccfeabb11f022eba346ee8d1cd488c0";
export const DEBUG_DAI_ADDRESS = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";

export const STATS_ENDPOINT = DEBUG
  ? "https://india-statistics-production.up.railway.app/testnet"
  : "https://india-statistics-production.up.railway.app/";

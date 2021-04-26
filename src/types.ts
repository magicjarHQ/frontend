import Web3 from "web3";
import Web3Modal from "web3modal";
import { Contract } from "web3-eth-contract";

export interface Web3Provider {
  modal: Web3Modal | null;
  web3: Web3 | null;
}

export interface Contracts {
  dai: Contract | null;
  rDai: Contract | null;
}

interface BalanceAllowance {
  balance?: string;
  allowance?: string;
}
export interface BallancesAllowances {
  dai: BalanceAllowance | null;
  rDai: BalanceAllowance | null;
}

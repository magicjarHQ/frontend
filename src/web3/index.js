import Web3 from "web3"; // Web3
import rDAIABI from "./rDAIABI"; // rDAI ABI
import Web3Modal from "web3modal"; // Web3Modal
import { dai } from "@studydefi/money-legos/erc20"; // ERC20 ABI
import { useState, useEffect } from "react"; // State management
import { createContainer } from "unstated-next"; // Unstated-next containerization
import WalletConnectProvider from "@walletconnect/web3-provider"; // WalletConnectProvider (Web3Modal)

// Web3Modal provider options
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      // Inject Infura
      infuraId: "a39625814a574bb68d2cb67b62e4a1e5", //process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
};

// Constants
const RDAI_INDIA_RELIEF_HAT = 248;
const RDAI_PROXY_CONTRACT = "0x261b45d85ccfeabb11f022eba346ee8d1cd488c0";
const MAX_UINT256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

function useWeb3() {
  const [web3, setWeb3] = useState(null); // Web3 provider
  const [modal, setModal] = useState(null); // Web3Modal
  const [address, setAddress] = useState(null); // ETH address

  const [DAIContract, setDAIContract] = useState(null);
  const [rDAIContract, setrDAIContract] = useState(null);
  const [DAIAllowance, setDAIAllowance] = useState(null);
  const [rDAIAllowance, setrDAIAllowance] = useState(null);
  const [DAIBalance, setDAIBalance] = useState(null); // DAI Balance for Address
  const [rDAIBalance, setrDAIBalance] = useState(null); // rDAI Balance for Address

  /**
   * Sets up web3Modal and saves to state
   */
  const setupWeb3Modal = () => {
    // Create new web3Modal
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions: providerOptions,
    });

    // Set web3Modal
    setModal(web3Modal);
  };

  /**
   * Authenticate, save web3 provider, and save eth address
   */
  const authenticate = async () => {
    // Toggle modal
    const provider = await modal.connect();

    // Generate web3 object and save
    const web3 = new Web3(provider);
    setWeb3(web3);

    // Collect contracts
    const DAIContract = new web3.eth.Contract(dai.abi, dai.address);
    setDAIContract(DAIContract);

    const rDAIContract = new web3.eth.Contract(rDAIABI, RDAI_PROXY_CONTRACT);
    setrDAIContract(rDAIContract);

    // Collect address
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    setAddress(address);
    return;
  };

  /**
   * Unauthenticate and clear cache
   */
  const unauthenticate = async () => {
    // Check if logged in
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      // Close provider
      await web3.currentProvider.close();
    }

    // Nullify web3 provider and address
    setAddress(null);
    setWeb3(null);
  };

  const updateBalances = async () => {
    // Update DAI balance
    const DAIBalance = await getDAIBalance();
    setDAIBalance(web3.utils.fromWei(DAIBalance));
    console.log(DAIBalance);

    // Update rDAI balance
    const rDAIBalance = await getrDAIBalance();
    setrDAIBalance(web3.utils.fromWei(rDAIBalance));
    console.log(rDAIBalance);

    // Update DAI allowance
    const DAIAllowance = await getDAIAllowance();
    setDAIAllowance(web3.utils.fromWei(DAIAllowance));
    console.log(web3.utils.fromWei(DAIAllowance));

    // Update rDAI allowance
    const rDAIAllowance = await getrDAIAllowance();
    setrDAIAllowance(web3.utils.fromWei(rDAIAllowance));
    console.log("rDAI Allowance: ", web3.utils.fromWei(rDAIAllowance));
    return;
  };

  // TODO: document
  const getDAIBalance = async () => {
    return await DAIContract.methods.balanceOf(address).call();
  };

  const getDAIAllowance = async () => {
    return await DAIContract.methods
      .allowance(address, RDAI_PROXY_CONTRACT)
      .call();
  };

  const updateDAIAllowance = async (max, amount) => {
    if (max) {
      await DAIContract.methods
        .approve(RDAI_PROXY_CONTRACT, web3.utils.toBN(MAX_UINT256))
        .send({
          from: address,
        });
    } else {
      await DAIContract.methods
        .approve(
          RDAI_PROXY_CONTRACT,
          web3.utils.toWei(amount.toString(), "ether")
        )
        .send({
          from: address,
        });
    }
    await updateBalances();
    return;
  };

  const getrDAIBalance = async () => {
    return await rDAIContract.methods.balanceOf(address).call();
  };

  const getrDAIAllowance = async () => {
    return await rDAIContract.methods
      .allowance(address, RDAI_PROXY_CONTRACT)
      .call();
  };

  const updaterDAIAllowance = async (max, amount) => {
    if (max) {
      await rDAIContract.methods
        .approve(RDAI_PROXY_CONTRACT, web3.utils.toBN(MAX_UINT256))
        .send({
          from: address,
        });
    } else {
      await rDAIContract.methods
        .approve(
          RDAI_PROXY_CONTRACT,
          web3.utils.toWei(amount.toString(), "ether")
        )
        .send({
          from: address,
        });
    }
    await updateBalances();
    return;
  };

  const stakeDAI = async (amount) => {
    // TODO: check current hat, if different
    await rDAIContract.methods
      .mintWithSelectedHat(
        web3.utils.toWei(amount.toString(), "ether"),
        RDAI_INDIA_RELIEF_HAT
      )
      .send({
        from: address,
      });
    await updateBalances();
    return;
  };

  const unstakeDAI = async (amount) => {
    if (amount >= rDAIBalance) {
      await rDAIContract.methods.redeemAll().send({ from: address });
    } else {
      await rDAIContract.methods
        .redeem(web3.utils.toWei(amount.toString(), "ether"))
        .send({ from: address });
    }
    await updateBalances();
    return;
  };

  // On mount
  useEffect(() => {
    // Setup web3modal
    setupWeb3Modal();
    // Collect balances
  }, []);

  useEffect(() => {
    async function collect() {
      // Collect balances
      await updateBalances();
    }

    if (web3 && address) {
      collect();
    }
  }, [web3, address]);

  return {
    web3,
    address,
    authenticate,
    unauthenticate,
    DAIBalance,
    rDAIBalance,
    stakeDAI,
    unstakeDAI,
    DAIAllowance,
    updateDAIAllowance,
    rDAIAllowance,
    updaterDAIAllowance,
  };
}

const Web3Provider = createContainer(useWeb3);
export default Web3Provider;

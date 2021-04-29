import { kea } from "kea";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { dai } from "@studydefi/money-legos/erc20"; // ERC20 ABI
import { rDAIABI } from "lib/rDAIABI";
import {
  DEBUG,
  DEBUG_DAI_ADDRESS,
  NETWORK,
  RDAI_INDIA_RELIEF_HAT,
  RDAI_PROXY_CONTRACT,
} from "const";
import {
  BallancesAllowances,
  Contracts,
  StatsInterface,
  Web3Provider,
} from "types";
import { walletLogicType } from "types/logics/walletLogicType";
import { toast } from "react-toastify";

// Web3Modal provider options
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      // Inject Infura
      infuraId: "a39625814a574bb68d2cb67b62e4a1e5", // process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
};

const errorToast = (error?: string): void => {
  toast.error(
    <div style={{ maxWidth: 280 }}>
      There was a problem completing your transaction. <b>Please try again.</b>
      {error && (
        <div>
          Error details: <i>{error}</i>
        </div>
      )}
    </div>
  );
};

export const walletLogic = kea<
  walletLogicType<Web3Provider, Contracts, BallancesAllowances, StatsInterface>
>({
  actions: {
    updateProvider: (payload: Partial<Web3Provider>) => ({ payload }),
    updateContracts: (payload: Partial<Contracts>) => ({ payload }),
    setAddress: (address: string) => ({ address }),
    setApprovedAmount: (amount: number) => ({ amount }),
    authenticate: true,
    logout: true,
  },
  reducers: {
    provider: [
      { modal: null, web3: null } as Web3Provider,
      {
        updateProvider: (state, { payload }) => ({ ...state, ...payload }),
      },
    ],
    contracts: [
      { dai: null, rDai: null } as Contracts,
      {
        updateContracts: (state, { payload }) => ({ ...state, ...payload }),
      },
    ],
    address: [
      "",
      {
        setAddress: (_, { address }) => address,
      },
    ],
    approvedAmount: [
      0,
      {
        setApprovedAmount: (_, { amount }) => amount,
      },
    ],
  },
  loaders: ({ values }) => ({
    balancesAllowances: [
      { dai: null, rDai: null } as BallancesAllowances,
      {
        loadBalances: async () => {
          // DAI
          const DAIBalance = await values.contracts.dai?.methods
            .balanceOf(values.address)
            .call();
          const DAIAllowance = await values.contracts.dai?.methods
            .allowance(values.address, RDAI_PROXY_CONTRACT)
            .call();

          // rDAI
          const rDAIBalance = await values.contracts.rDai?.methods
            .balanceOf(values.address)
            .call();
          const rDAIAllowance = await values.contracts.rDai?.methods
            .allowance(values.address, RDAI_PROXY_CONTRACT)
            .call();

          return {
            dai: {
              balance: values.provider.web3?.utils.fromWei(DAIBalance),
              allowance: values.provider.web3?.utils.fromWei(DAIAllowance),
            },
            rDai: {
              balance: values.provider.web3?.utils.fromWei(rDAIBalance),
              allowance: values.provider.web3?.utils.fromWei(rDAIAllowance),
            },
          };
        },
      },
    ],
    approvedAmount: [
      // Used for deposits
      0,
      {
        approve: async ({ amount }: { amount: string }) => {
          if (amount <= (values.balancesAllowances.dai?.allowance || 0)) {
            return parseFloat(amount);
          }
          const result = await values.contracts.dai?.methods
            .approve(
              RDAI_PROXY_CONTRACT,
              values.provider.web3?.utils.toWei(amount.toString(), "ether")
            )
            .send({
              from: values.address,
            });
          if (result.error) {
            throw result.error;
          }
          return parseFloat(amount);
        },
        stake: async () => {
          const result = await values.contracts.rDai?.methods
            .mintWithSelectedHat(
              values.provider.web3?.utils.toWei(
                values.approvedAmount.toString(),
                "ether"
              ),
              RDAI_INDIA_RELIEF_HAT
            )
            .send({
              from: values.address,
            });
          if (result.error) {
            throw result.error;
          }
          return 0;
        },
      },
    ],
    withdrawApprovedAmount: [
      0,
      {
        approveWithdraw: async ({ amount }: { amount: string }) => {
          if (amount <= (values.balancesAllowances.rDai?.allowance || 0)) {
            return parseFloat(amount);
          }
          const result = await values.contracts.rDai?.methods
            .approve(
              RDAI_PROXY_CONTRACT,
              values.provider.web3?.utils.toWei(amount, "ether")
            )
            .send({
              from: values.address,
            });
          if (result.error) {
            throw result.error;
          }
          return parseFloat(amount);
        },
        unstake: async () => {
          const result = await values.contracts.rDai?.methods
            .redeem(
              values.provider.web3?.utils.toWei(
                values.withdrawApprovedAmount.toString(),
                "ether"
              )
            )
            .send({
              from: values.address,
            });
          if (result.error) {
            throw result.error;
          }
          return 0;
        },
      },
    ],
    stats: [
      { savings: 0, interest: 0 } as StatsInterface,
      {
        fetchStats: async () => {
          const hatStatistics = await values.contracts.rDai?.methods
            .getHatStats(RDAI_INDIA_RELIEF_HAT)
            .call();
          const loans = parseFloat(
            // @ts-ignore
            values.provider.web3?.utils.fromWei(hatStatistics.totalLoans)
          );
          const savings = parseFloat(
            // @ts-ignore
            values.provider.web3?.utils.fromWei(hatStatistics.totalSavings)
          );
          const interest = savings - loans;
          return { savings, interest };
        },
      },
    ],
  }),
  listeners: ({ values, actions }) => ({
    authenticate: async () => {
      // TODO: Loading state
      // Toggle modal
      const provider = await values.provider.modal?.connect();
      const web3 = new Web3(provider);
      actions.updateProvider({ web3 });
      // Collect contracts
      const daiContract = new web3.eth.Contract(
        // @ts-ignore TODO: Fix typing here
        dai.abi,
        DEBUG ? DEBUG_DAI_ADDRESS : dai.address
      );
      // @ts-ignore TODO: Fix typing here
      const rDAIContract = new web3.eth.Contract(rDAIABI, RDAI_PROXY_CONTRACT);
      actions.updateContracts({ dai: daiContract, rDai: rDAIContract });
      // Collect address
      const accounts = await web3.eth.getAccounts();
      actions.setAddress(accounts[0]);
      actions.fetchStats();
    },
    logout: async () => {
      // TODO: Loading state
      if (
        values.provider.web3 &&
        values.provider.web3.currentProvider &&
        typeof values.provider.web3.currentProvider !== "string" &&
        "close" in values.provider.web3.currentProvider
      ) {
        // @ts-expect-error TODO: Fix typing
        await values.provider.web3.currentProvider.close();
      }

      actions.setAddress("");
      actions.updateProvider({ web3: null });
    },
    setAddress: async ({ address }) => {
      if (address) {
        actions.loadBalances();
      }
    },
    approveSuccess: async () => {
      actions.loadBalances();
    },
    approveWithdrawSuccess: async () => {
      actions.loadBalances();
    },
    approveFailure: async ({ error }) => {
      errorToast(error);
    },
    approveWithdrawFailure: async ({ error }) => {
      errorToast(error);
    },
    stakeSuccess: async () => {
      actions.loadBalances();
      actions.fetchStats();
    },
    unstakeSuccess: async () => {
      actions.loadBalances();
      actions.fetchStats();
    },
    stakeFailure: async ({ error }) => {
      toast.error(
        <div style={{ maxWidth: 280 }}>
          There was a problem completing your transaction.{" "}
          <b>Please try again.</b>
          <div>
            Error details: <i>{error}</i>
          </div>
        </div>
      );
    },
  }),
  selectors: {
    authenticated: [(s) => [s.address], (address): boolean => !!address],
    loading: [
      (s) => [
        s.balancesAllowancesLoading,
        s.approvedAmountLoading,
        s.withdrawApprovedAmountLoading,
      ],
      (balanceLoading, depositLoading, withdrawLoading) =>
        balanceLoading || depositLoading || withdrawLoading,
    ],
  },
  events: ({ actions }) => ({
    afterMount: () => {
      const web3Modal = new Web3Modal({
        network: NETWORK,
        cacheProvider: true,
        providerOptions: providerOptions,
      });
      actions.updateProvider({ modal: web3Modal });
    },
  }),
});

import "./App.css";
import Web3Provider from "./web3";
import { useState } from "react";

const MAX_UINT256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

function App() {
  // Web3 state
  const {
    web3,
    address,
    DAIBalance,
    rDAIBalance,
    unauthenticate,
    authenticate,
    stakeDAI,
    unstakeDAI,
    DAIAllowance,
    updateDAIAllowance,
    rDAIAllowance,
    updaterDAIAllowance,
  } = Web3Provider.useContainer();

  // DAI Amounts
  const [daiToStake, setDaiToStake] = useState(0);
  const [daiToUnstake, setDaiToUnstake] = useState(0);

  // Loading states
  const [authButtonLoading, setAuthButtonLoading] = useState(false);
  const [stakeButtonLoading, setStakeButtonLoading] = useState(false);
  const [unstakeButtonLoading, setUnstakeButtonLoading] = useState(false);
  const [approvalButtonLoading, setApprovalButtonLoading] = useState(false);
  const [approvalRButtonLoading, setApprovalRButtonLoading] = useState(false);

  console.log(rDAIAllowance);
  /**
   * Authenticate user with Web3 + Loading
   */
  const authWallet = async () => {
    setAuthButtonLoading(true);

    try {
      await authenticate();
    } catch (error) {
      console.log("Error when authenticating.");
    }

    setAuthButtonLoading(false);
  };

  /**
   * Unauthenticate user with Web3 + Loading
   */
  const unauthWallet = async () => {
    setAuthButtonLoading(true);

    try {
      await unauthenticate();
    } catch {
      console.log("Error when unauthenticating.");
    }

    setAuthButtonLoading(false);
  };

  const stakeWithloading = async (amount) => {
    setStakeButtonLoading(true);

    try {
      await stakeDAI(amount);
    } catch {
      console.log("Error when staking DAI");
    }

    setStakeButtonLoading(false);
  };

  const unstakeWithLoading = async (amount) => {
    setUnstakeButtonLoading(true);

    try {
      await unstakeDAI(amount);
    } catch (error) {
      console.log(error);
      console.log("Error when unstaking DAI");
    }

    setUnstakeButtonLoading(false);
  };

  const approveDAIWithLoading = async (max, amount) => {
    setApprovalButtonLoading(true);

    try {
      await updateDAIAllowance(max, amount);
    } catch {
      console.log("Error when approving DAI to be spent");
    }

    setApprovalButtonLoading(false);
  };

  const approverDAIWithLoading = async (max, amount) => {
    setApprovalRButtonLoading(true);

    try {
      await updaterDAIAllowance(max, amount);
    } catch {
      console.log("Error when approving rDAI to be spent");
    }

    setApprovalRButtonLoading(false);
  };

  return (
    <div className="App">
      {/* General statistics */}
      <p>
        Uses{" "}
        <a
          href="https://etherscan.io/address/0x261b45d85ccfeabb11f022eba346ee8d1cd488c0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redeemable DAI
        </a>{" "}
        contracts.
      </p>

      {web3 && address ? (
        // Check if user is authenticated with Web3
        <div>
          {/* User address */}
          <p>You are authenticated as {address}.</p>

          {/* User balances */}
          <p>
            You have a balance of {DAIBalance} DAI and {rDAIBalance} DAI
            generating interest for Covid Relief.
          </p>

          {/* Lock wallet */}
          <button onClick={unauthWallet} disabled={authButtonLoading}>
            {authButtonLoading ? "Loading..." : "UnAuth Wallet"}
          </button>

          <div>
            {DAIBalance > 0 ? (
              // If you have a DAI balance
              <div>
                <h3>Stake DAI</h3>
                <input
                  type="number"
                  value={daiToStake}
                  onChange={(e) => setDaiToStake(e.target.value)}
                />

                {DAIAllowance !== 0 &&
                parseFloat(DAIAllowance) >= daiToStake ? (
                  // Ensure DAIAllowance is sufficient
                  <div>
                    <button
                      onClick={() => stakeWithloading(daiToStake)}
                      disabled={
                        stakeButtonLoading ||
                        parseFloat(daiToStake) > DAIBalance
                      }
                    >
                      {stakeButtonLoading
                        ? "Staking..."
                        : parseFloat(daiToStake) > DAIBalance
                        ? "Insufficient DAI Balance"
                        : "Stake DAI"}
                    </button>
                  </div>
                ) : (
                  // Else, show allowance buttons
                  <div>
                    <p>You must approve contract to spend your DAI</p>
                    <button
                      onClick={() => approveDAIWithLoading(false, daiToStake)}
                      disabled={approvalButtonLoading}
                    >
                      Approve spending {daiToStake} DAI{" "}
                    </button>
                    <button
                      onClick={() => approveDAIWithLoading(true, daiToStake)}
                      disabled={approvalButtonLoading}
                    >
                      Infinite Approve
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // If you don't have a DAI balance, don't show
              <div>
                <p>You have no DAI to lend. Get some DAI first!</p>
              </div>
            )}

            {rDAIBalance > 0 ? (
              // If you have a rDAI balance
              <div>
                <h3>Unstake DAI</h3>
                <input
                  type="number"
                  value={daiToUnstake}
                  onChange={(e) => setDaiToUnstake(e.target.value)}
                />
                {rDAIAllowance !== 0 &&
                parseFloat(rDAIAllowance) >= daiToUnstake ? (
                  <button
                    onClick={() =>
                      unstakeWithLoading(
                        daiToUnstake > rDAIBalance ? MAX_UINT256 : daiToUnstake
                      )
                    }
                    disabled={
                      unstakeButtonLoading ||
                      parseFloat(daiToUnstake) > rDAIBalance
                    }
                  >
                    {unstakeButtonLoading
                      ? "Unstaking..."
                      : parseFloat(daiToUnstake) > rDAIBalance
                      ? "Unstake All DAI"
                      : "Unstake DAI"}
                  </button>
                ) : (
                  // Else, show allowance buttons
                  <div>
                    <p>You must approve contract to spend your rDAI</p>
                    <button
                      onClick={() =>
                        approverDAIWithLoading(false, daiToUnstake)
                      }
                      disabled={approvalRButtonLoading}
                    >
                      Approve spending {daiToUnstake} rDAI{" "}
                    </button>
                    <button
                      onClick={() => approverDAIWithLoading(true, daiToUnstake)}
                      disabled={approvalRButtonLoading}
                    >
                      Infinite Approve
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // If you don't have a balance, don't show
              <div>
                <p>You have no interest earning DAI to unstake. Stake first!</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Else, if user is not authenticated
        <div>
          <p>You are not authenticated.</p>

          {/* Authentication button */}
          <button onClick={authWallet} disabled={authButtonLoading}>
            {authButtonLoading ? "Loading..." : "Auth Wallet"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

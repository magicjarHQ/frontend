import { Button, Input, Modal } from "components";
import { Loader } from "components/Loader";
import { ModalInterface } from "components/Modal";
import { useActions, useValues } from "kea";
import { walletLogic } from "logics/walletLogic";
import React, { useMemo, useState } from "react";
import "./ActionModals.scss";

export function DepositModal({
  onClose,
  ...props
}: Omit<ModalInterface, "children">): JSX.Element {
  const { balancesAllowances, loading, approvedAmount } = useValues(
    walletLogic
  );
  const { approve, setApprovedAmount, stake } = useActions(walletLogic);
  const [amount, setAmount] = useState("");
  const [touched, setTouched] = useState(false);

  const formState = useMemo(() => {
    if (!touched) {
      return null;
    }
    const parsedAmount = parseFloat(amount);
    if (
      !isNaN(parsedAmount) &&
      parsedAmount > 0 &&
      parsedAmount <= (balancesAllowances.dai?.balance || 0)
    ) {
      return "valid";
    }
    return "invalid";
  }, [touched, amount, balancesAllowances]);

  const handleClose = () => {
    setApprovedAmount(0);
    onClose();
  };

  return (
    <Modal {...props} onClose={handleClose} closable={!loading}>
      <div className="deposit-modal">
        <h2>Deposit funds to help</h2>
        <div className="wallet-balance">
          {balancesAllowances.dai?.balance ? (
            <>
              You have
              <b style={{ marginLeft: 4, marginRight: 4 }}>
                ${balancesAllowances.dai?.balance}
              </b>{" "}
              DAI available in your wallet
            </>
          ) : (
            "Fetching your wallet balance..."
          )}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {approvedAmount >= parseFloat(amount) ? (
              <div className="mt">
                You are depositing ${amount}.
                <div className="text-right mt">
                  <Button disabled={loading} onClick={stake}>
                    Confirm deposit
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt">
                <Input
                  autoFocus
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setTouched(true);
                  }}
                  state={formState}
                  errorMessage={
                    parseFloat(amount) > (balancesAllowances.dai?.balance || 0)
                      ? "You don't have enough DAI on your wallet to deposit"
                      : undefined
                  }
                  disabled={loading}
                />
                <div className="text-right mt">
                  <Button
                    disabled={formState !== "valid" || loading}
                    onClick={() => approve({ amount })}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        <div className="text-muted mt-2x">
          We currently only support DAI. MagicJar works best with MetaMask, if
          you run into issues with WalletConnect, wait 3 minutes and refresh the
          page.
        </div>
      </div>
    </Modal>
  );
}

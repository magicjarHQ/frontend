import { Button, Input, Modal } from "components";
import { IconDAI } from "components/icons";
import { Loader } from "components/Loader";
import { ModalInterface } from "components/Modal";
import { useActions, useValues } from "kea";
import { walletLogic } from "logics/walletLogic";
import React, { useMemo, useState } from "react";
import "./ActionModals.scss";

export function WithdrawModal({
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
      parsedAmount <= (balancesAllowances.rDai?.balance || 0)
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
        <h2>Withdraw Funds</h2>
        <div className="wallet-balance">
          {balancesAllowances.rDai?.balance ? (
            <>
              You have staked
              <b style={{ marginLeft: 4 }}>
                ${balancesAllowances.rDai?.balance}
              </b>
              <IconDAI
                style={{ color: "var(--text-default)", marginLeft: 4 }}
              />
            </>
          ) : (
            "Fetching your stake balance..."
          )}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {approvedAmount >= parseFloat(amount) ? (
              <div className="mt">
                Complete your withdraw of ${amount}.
                <div className="text-right mt">
                  <Button disabled={loading} onClick={stake}>
                    Withdraw ${amount}
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
                    parseFloat(amount) > (balancesAllowances.rDai?.balance || 0)
                      ? "This amount is larger than your current stake"
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
      </div>
    </Modal>
  );
}

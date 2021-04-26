import { Button, Input, Modal } from "components";
import { ModalInterface } from "components/Modal";
import { useActions, useValues } from "kea";
import { walletLogic } from "logics/walletLogic";
import React, { useMemo, useState } from "react";
import "./ActionModals.scss";

export function DepositModal({
  ...props
}: Omit<ModalInterface, "children">): JSX.Element {
  const { balancesAllowances, loading } = useValues(walletLogic);
  const { approve } = useActions(walletLogic);
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

  return (
    <Modal {...props}>
      <div className="deposit-modal">
        <h2>Deposit funds to help</h2>
        <div className="wallet-balance">
          {balancesAllowances.dai?.balance ? (
            <>
              You have <b>${balancesAllowances.dai?.balance}</b> DAI available
              in your wallet
            </>
          ) : (
            "Getting your wallet balance..."
          )}
        </div>
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
        </div>
        <div className="text-right mt">
          <Button
            disabled={formState !== "valid" || loading}
            onClick={() => approve({ amount })}
          >
            Continue
          </Button>
        </div>

        <div className="text-muted mt-2x">
          We currently only support DAI, but hope to support more tokens soon
        </div>
      </div>
    </Modal>
  );
}

import { useActions, useValues } from "kea";
import { walletLogic } from "logics/walletLogic";
import React from "react";
import { midEllipsis } from "utils";
import { Button } from "../Button";
import "./Header.scss";

export function Header(): JSX.Element {
  const { authenticated, address } = useValues(walletLogic);
  const { authenticate, logout } = useActions(walletLogic);

  return (
    <div className="header">
      <div className="header-main">
        <h2>MagicJar</h2>
        <span className="tagline">Support your causes by saving money</span>
      </div>
      <div className="actions">
        <a href="https://discord.gg/edXzegJ9" rel="noreferrer" target="_blank">
          Join Discord
        </a>
        <a
          href="https://uti5pq5o5y0.typeform.com/to/txONPtJW"
          rel="noreferrer"
          target="_blank"
        >
          Create a Jar
        </a>
        {authenticated ? (
          <>
            <span className="address">{midEllipsis(address, 12)}</span>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button onClick={authenticate}>Wallet Login</Button>
        )}
      </div>
    </div>
  );
}

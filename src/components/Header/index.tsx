import React from "react";
import { Button } from "../Button";
import "./Header.scss";

export function Header(): JSX.Element {
  return (
    <div className="header">
      <div className="header-main">
        <h2>MagicJar</h2>
        <span className="tagline">Support your causes by saving money</span>
      </div>
      <div className="actions">
        <a href="#discord">Join Discord</a>
        <a href="#create">Create a Jar</a>
        <Button>Wallet Login</Button>
      </div>
    </div>
  );
}

import React from "react";
import "./Jar.scss";

interface JarInterface {
  actions?: JSX.Element;
  totalStaked: number;
  totalInterest: number;
}

export function Jar({
  actions,
  totalStaked,
  totalInterest,
}: JarInterface): JSX.Element {
  return (
    <div className="jar-container">
      <div className="the-jar">
        <div className="total-stake">
          TOTAL STAKED{" "}
          <div className="amount">${totalStaked.toLocaleString()}</div>
        </div>
      </div>
      <div className="jar-inner">
        <div className="revenue">
          🎉 Total interest generated <b>${totalInterest.toLocaleString()}</b>!
        </div>
        <div className="actions">{actions}</div>
        <div className="donation">
          or{" "}
          <a
            href="https://twitter.com/sandeepnailwal/status/1385968552679727113"
            target="_blank"
            rel="noopener noreferrer"
          >
            donate
          </a>{" "}
          directly
        </div>
      </div>
    </div>
  );
}

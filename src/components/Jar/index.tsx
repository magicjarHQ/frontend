import React from "react";
import "./Jar.scss";

interface JarInterface {
  actions?: JSX.Element;
}

export function Jar({ actions }: JarInterface): JSX.Element {
  return (
    <div className="jar-container">
      <div className="the-jar">
        <div className="total-stake">
          TOTAL STAKED <div className="amount">$145,430</div>
        </div>
      </div>
      <div className="jar-inner">
        <div className="revenue">
          🎉 Generating <b>$14,650</b> per week!
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

import React from "react";
import "./Button.scss";

interface ButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  icon?: JSX.Element;
}

interface LinkButtonInterface extends React.AnchorHTMLAttributes<HTMLElement> {
  icon?: JSX.Element;
}

export function Button({
  children,
  block,
  className,
  icon,
  ...props
}: ButtonInterface): JSX.Element {
  return (
    <button
      className={`btn${className ? " " + className : ""}${
        block ? " block" : ""
      }`}
      {...props}
    >
      <span className="btn-icon">{icon}</span>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  className,
  icon,
  ...props
}: LinkButtonInterface): JSX.Element {
  return (
    <a className={`btn${className ? " " + className : ""}`} {...props}>
      <span className="btn-icon">{icon}</span>
      {children}
    </a>
  );
}

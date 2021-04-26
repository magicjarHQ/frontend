import React from "react";
import "./Button.scss";

interface ButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | JSX.Element;
  block?: boolean;
}

export function Button({
  children,
  block,
  className,
  ...props
}: ButtonInterface): JSX.Element {
  return (
    <button
      className={`btn${className ? " " + className : ""}${
        block ? " block" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  className,
  ...props
}: React.LinkHTMLAttributes<HTMLElement>): JSX.Element {
  return (
    <a className={`btn${className ? " " + className : ""}`} {...props}>
      {children}
    </a>
  );
}

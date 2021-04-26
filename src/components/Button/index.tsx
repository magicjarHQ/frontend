import React from "react";
import "./Button.scss";

interface ButtonInterface {
  children?: string | JSX.Element;
}

export function Button({ children }: ButtonInterface): JSX.Element {
  return <button className="btn">{children}</button>;
}

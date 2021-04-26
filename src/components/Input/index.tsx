import React from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: "valid" | "invalid" | null;
  errorMessage?: string;
}

export function Input({
  className,
  state,
  errorMessage,
  ...props
}: InputProps): JSX.Element {
  return (
    <>
      <input
        className={`mj-input${className ? ` ${className}` : ""}${
          state ? ` ${state}` : ""
        }`}
        {...props}
      />
      <div className="mj-input-error">{errorMessage}</div>
    </>
  );
}

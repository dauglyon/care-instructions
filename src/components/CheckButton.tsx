import React, { FC } from "react";

export const CheckButton: FC<{
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, disabled = false, onChange, children }) => {
  return (
    <div
      className="buttons has-addons"
      onClick={() => {
        onChange(!checked);
      }}
    >
      <button disabled={disabled} className="button">
        {children}
      </button>
      <button
        disabled={disabled}
        className={`button ${checked ? "is-success" : "is-danger"}`}
      >
        {checked ? "\u2714" : "\u2718"}
      </button>
    </div>
  );
};

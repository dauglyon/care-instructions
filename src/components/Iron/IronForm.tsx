import React, { FC, useState } from "react";
import { IronOptions } from "../../types/Options";
import { useEffect } from "react";
import { CheckButton } from "../CheckButton";

export const defaultIronOptions: IronOptions = {
  ironSteamOk: true,
  ironMethod: "any",
};

interface IronFormProps {
  onChange(ironOptions: IronOptions): void;
}

export const IronForm: FC<IronFormProps> = ({ onChange }) => {
  const [opt, setOpt] = useState<IronOptions>(defaultIronOptions);
  useEffect(() => onChange(opt), [opt, onChange]);

  const onMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setOpt((opt) => ({
      ...opt,
      ironMethod: e.target.value as IronOptions["ironMethod"],
    }));

  const onSteamOKChange = () =>
    setOpt((opt) => ({
      ...opt,
      ironSteamOk: !opt.ironSteamOk,
    }));

  return (
    <div>
      <div className="field">
        <label className="label">Iron Method</label>
        <div className="control">
          <div className="select">
            <select value={opt.ironMethod} onChange={onMethodChange}>
              <option value="no-iron">Do Not Iron</option>
              <option value="any">Any Heat</option>
              <option value="low">Low Heat</option>
              <option value="medium">Medium Heat</option>
              <option value="high">High Heat</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <CheckButton
          checked={opt.ironSteamOk}
          onChange={onSteamOKChange}
          disabled={opt.ironMethod === "no-iron"}
        >
          Steam OK?
        </CheckButton>
      </div>
    </div>
  );
};

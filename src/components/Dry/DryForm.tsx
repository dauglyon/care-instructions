import React, { FC, useState } from "react";
import { DryOptions } from "../../types/Options";
import { useEffect } from "react";
import { CheckButton } from "../CheckButton";

export const defaultDryOptions: DryOptions = {
  dryTumbleOk: true,
  dryTumbleMethod: "normal",
  dryTumbleTemp: "low",
  dryAltOk: false,
  dryAltMethod: "line",
  dryAltShade: false,
};

interface DryFormProps {
  onChange(dryOptions: DryOptions): void;
}

export const DryForm: FC<DryFormProps> = ({ onChange }) => {
  const [opt, setOpt] = useState<DryOptions>(defaultDryOptions);
  useEffect(() => onChange(opt), [opt, onChange]);

  const onTumbleOkChange = () =>
    setOpt((opt) => ({
      ...opt,
      dryTumbleOk: !opt.dryTumbleOk,
    }));
  const onTumbleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setOpt((opt) => ({
      ...opt,
      dryTumbleMethod: e.target.value as DryOptions["dryTumbleMethod"],
    }));
  const onTumbleTempChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setOpt((opt) => ({
      ...opt,
      dryTumbleTemp: e.target.value as DryOptions["dryTumbleTemp"],
    }));
  const onAltOkChange = () =>
    setOpt((opt) => ({
      ...opt,
      dryAltOk: !opt.dryAltOk,
    }));
  const onAltMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setOpt((opt) => ({
      ...opt,
      dryAltMethod: e.target.value as DryOptions["dryAltMethod"],
    }));
  const onAltShadeChange = () =>
    setOpt((opt) => ({
      ...opt,
      dryAltShade: !opt.dryAltShade,
    }));

  return (
    <div>
      <div className="field">
        <CheckButton checked={opt.dryTumbleOk} onChange={onTumbleOkChange}>
          Tumble Dry Ok?
        </CheckButton>
      </div>

      <div className="field">
        <label className="label">Tumble Dry Method</label>
        <div className="control">
          <div className="select">
            <select
              value={opt.dryTumbleMethod}
              onChange={onTumbleMethodChange}
              disabled={!opt.dryTumbleOk}
            >
              <option value="normal">Normal</option>
              <option value="perm-press">Perm. Press</option>
              <option value="delicate">Delicate</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Tumble Dry Temperature</label>
        <div className="control">
          <div className="select">
            <select
              value={opt.dryTumbleTemp}
              onChange={onTumbleTempChange}
              disabled={!opt.dryTumbleOk}
            >
              <option value="any">Any Temp.</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="no-heat">No Heat (Air)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <CheckButton checked={opt.dryAltOk} onChange={onAltOkChange}>
          Other Dry Method Ok?
        </CheckButton>
      </div>

      <div className="field">
        <label className="label">Other Dry Method</label>
        <div className="control">
          <div className="select">
            <select
              value={opt.dryAltMethod}
              onChange={onAltMethodChange}
              disabled={!opt.dryAltOk}
            >
              <option value="line">Line Dry</option>
              <option value="drip">Drip Dry</option>
              <option value="flat">Dry Flat</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <CheckButton
          checked={opt.dryAltShade}
          onChange={onAltShadeChange}
          disabled={!opt.dryAltOk}
        >
          Dry in the Shade?
        </CheckButton>
      </div>
    </div>
  );
};

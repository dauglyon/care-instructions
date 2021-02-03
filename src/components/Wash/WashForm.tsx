import React, { FC, useState } from 'react';
import { WashOptions } from '../../types/options';
import { useEffect } from 'react';

export const defaultWashOptions: WashOptions = {
  washWringOk: true,
  washMethod: "machine",
  washTemp: "normal",
  washTempStyle: "dot"
}

interface WashFormProps {
  onChange(washOptions: WashOptions): void
}

export const WashForm: FC<WashFormProps> = ({ onChange }) => {
  const [opt, setOpt] = useState<WashOptions>(defaultWashOptions);
  useEffect(() => onChange(opt), [opt, onChange]);

  const onMethodChange = (e: any) => setOpt(opt => {
    const newOpts = { ...opt, washMethod: e.target.value };

    if (newOpts.washMethod === "hand") {
      if (!["normal", 30, 40].includes(newOpts.washTemp)) {
        newOpts.washTemp = "normal";
      }
      newOpts.washTempStyle = "dot";
    }

    if (newOpts.washMethod === "nowash") {
      newOpts.washTemp = "normal";
    }

    if (["perm-press", "delicate", "machine"].includes(newOpts.washMethod)) {
      if (!["dot", "deg"].includes(newOpts.washTempStyle)) {
        newOpts.washTempStyle = "dot"
      }
    }

    return newOpts
  });

  const onTempChange = (e: any) => setOpt(opt => ({
    ...opt,
    washTemp: e.target.value
  }))

  const onTempStyleChange = (e: any) => setOpt(opt => ({
    ...opt,
    washTempStyle: e.target.value
  }))

  const onWringOkChange = () => setOpt(opt => ({
    ...opt,
    washWringOk: !opt.washWringOk
  }))

  const nowash = opt.washMethod === "nowash";
  const handwash = opt.washMethod === "hand";

  return (
    <form>
      <label>
        <span>Wash Method: </span>
        <select value={opt.washMethod} onChange={onMethodChange}>
          <option value="machine">Machine Wash</option>
          <option value="perm-press">Perm. Press</option>
          <option value="delicate">Delicate</option>
          <option value="hand">Hand Wash</option>
          <option value="nowash">Do Not Wash</option>
        </select>
      </label>
      <label>
        <span>Wash Temperature: </span>
        <select value={opt.washTemp} onChange={onTempChange} disabled={nowash}>
          <option value="normal">Normal</option>
          <option value="30">30&deg;C</option>
          <option value="40">40&deg;C</option>
          <option value="50" disabled={handwash}>50&deg;C</option>
          <option value="60" disabled={handwash}>60&deg;C</option>
          <option value="70" disabled={handwash}>70&deg;C</option>
          <option value="95" disabled={handwash}>95&deg;C</option>
        </select>
      </label>
      <label>
        <span>Wash Temp. Style: </span>
        <select value={opt.washTempStyle} onChange={onTempStyleChange} disabled={nowash || handwash}>
          <option value="deg">Degrees (Celsius)</option>
          <option value="dot">Symbolic (•)</option>
        </select>
      </label>
      <label>
        <input type="checkbox" checked={opt.washWringOk} onChange={onWringOkChange} disabled={opt.washMethod === 'nowash'}></input>
        <span> Wringing OK?</span>
      </label>
    </form>
  );
}
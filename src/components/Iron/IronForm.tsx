import React, { FC, useState } from 'react';
import { IronOptions } from '../../types/options';
import { useEffect } from 'react';

export const defaultIronOptions: IronOptions = {
  ironSteamOk: true,
  ironMethod: 'any'
}

interface IronFormProps {
  onChange(ironOptions: IronOptions): void
}

export const IronForm: FC<IronFormProps> = ({ onChange }) => {
  const [opt, setOpt] = useState<IronOptions>(defaultIronOptions);
  useEffect(() => onChange(opt), [opt, onChange]);

  const onMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => setOpt(opt => ({
    ...opt,
    ironMethod: e.target.value as IronOptions['ironMethod']
  }))

  const onSteamOKChange = (e: React.ChangeEvent<HTMLInputElement>) => setOpt(opt => ({
    ...opt,
    ironSteamOk: !opt.ironSteamOk
  }))

  return (
    <form>
      <label>
        <span>Iron Method: </span>
        <select value={opt.ironMethod} onChange={onMethodChange}>
          <option value="no-iron">Do Not Iron</option>
          <option value="any">Any Heat</option>
          <option value="low">Low Heat</option>
          <option value="medium">Medium Heat</option>
          <option value="high">High Heat</option>
        </select>
      </label>
      <label>
        <input type="checkbox" checked={opt.ironSteamOk} onChange={onSteamOKChange} disabled={opt.ironMethod === 'no-iron'}></input>
        <span> Steam OK?</span>
      </label>
    </form>
  );
}
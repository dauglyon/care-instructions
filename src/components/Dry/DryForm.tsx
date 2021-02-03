import React, { FC, useState } from 'react';
import { DryOptions } from '../../types/options';
import { useEffect } from 'react';

export const defaultDryOptions: DryOptions = {
  dryTumbleOk: true,
  dryTumbleMethod: 'normal',
  dryTumbleTemp: 'low',
  dryAltOk: false,
  dryAltMethod: 'line',
  dryAltShade: false
}

interface DryFormProps {
  onChange(dryOptions: DryOptions): void
}

export const DryForm: FC<DryFormProps> = ({ onChange }) => {
  const [opt, setOpt] = useState<DryOptions>(defaultDryOptions);
  useEffect(() => onChange(opt), [opt, onChange]);

  const onTumbleOkChange = () => setOpt(opt => ({
    ...opt,
    dryTumbleOk: !opt.dryTumbleOk
  }));
  const onTumbleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => setOpt(opt => ({
    ...opt,
    dryTumbleMethod: e.target.value as DryOptions['dryTumbleMethod']
  }))
  const onTumbleTempChange = (e: React.ChangeEvent<HTMLSelectElement>) => setOpt(opt => ({
    ...opt,
    dryTumbleTemp: e.target.value as DryOptions['dryTumbleTemp']
  }))
  const onAltOkChange = () => setOpt(opt => ({
    ...opt,
    dryAltOk: !opt.dryAltOk
  }))
  const onAltMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => setOpt(opt => ({
    ...opt,
    dryAltMethod: e.target.value as DryOptions['dryAltMethod']
  }))
  const onAltShadeChange = (e: React.ChangeEvent<HTMLInputElement>) => setOpt(opt => ({
    ...opt,
    dryAltShade: !opt.dryAltShade
  }))

  return (
    <form>
      <label>
        <input type="checkbox" checked={opt.dryTumbleOk} onChange={onTumbleOkChange}></input>
        <span> Tumble Dry Ok?</span>
      </label>
      <label>
        <span>Tumble Dry Method: </span>
        <select value={opt.dryTumbleMethod} onChange={onTumbleMethodChange} disabled={!opt.dryTumbleOk}>
          <option value="normal">Normal</option>
          <option value="perm-press">Perm. Press</option>
          <option value="delicate">Delicate</option>
        </select>
      </label>
      <label>
        <span>Tumble Dry Temperature: </span>
        <select value={opt.dryTumbleTemp} onChange={onTumbleTempChange} disabled={!opt.dryTumbleOk}>
          <option value="any">Any Temp.</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="no-heat">No Heat (Air)</option>
        </select>
      </label>
      <label>
        <input type="checkbox" checked={opt.dryAltOk} onChange={onAltOkChange}></input>
        <span> Other Dry Method Ok?</span>
      </label>
      <label>
        <span>Other Dry Method: </span>
        <select value={opt.dryAltMethod} onChange={onAltMethodChange} disabled={!opt.dryAltOk}>
          <option value="line">Line Dry</option>
          <option value="drip">Drip Dry</option>
          <option value="flat">Dry Flat</option>
        </select>
      </label>
      <label>
        <input type="checkbox" checked={opt.dryAltShade} onChange={onAltShadeChange} disabled={!opt.dryAltOk}></input>
        <span> Dry in the Shade?</span>
      </label>
    </form>
  );
}
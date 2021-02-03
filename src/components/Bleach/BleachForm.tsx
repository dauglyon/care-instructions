import React, { FC, useState } from 'react';
import { BleachOptions } from '../../types/options';
import { useEffect } from 'react';

export const defaultBleachOptions: BleachOptions = {
  bleachMethod: "ok"
}

interface BleachFormProps {
  onChange(bleachOptions: BleachOptions): void
}

export const BleachForm: FC<BleachFormProps> = ({ onChange }) => {
  const [opt, setOpt] = useState<BleachOptions>(defaultBleachOptions);
  useEffect(() => onChange(opt), [opt, onChange]);

  const onMethodChange = (e: any) => {
    setOpt({
      ...opt,
      bleachMethod: e.target.value
    })
  }

  return (
    <form>
      <label>
        <span>Bleach Method: </span>
        <select value={opt.bleachMethod} onChange={onMethodChange}>
          <option value="ok">Any Bleach</option>
          <option value="non-chlorine">Non-Chlorine Bleach Only</option>
          <option value="no-bleach">Do Not Bleach</option>
        </select>
      </label>
    </form>
  );
}
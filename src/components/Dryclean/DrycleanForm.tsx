import React, { FC, useState } from "react";
import { DrycleanOptions } from "../../types/Options";
import { useEffect } from "react";

export const defaultDrycleanOptions: DrycleanOptions = {
  drycleanMethod: "any",
  drycleanLowHeat: false,
  drycleanNoSteam: false,
  drycleanProcessIntensity: "normal",
  drycleanReduceMoisture: false,
  drycleanShortCycle: false,
  drycleanWetcleanOk: true,
};

interface DrycleanFormProps {
  onChange(drycleanOptions: DrycleanOptions): void;
}

export const DrycleanForm: FC<DrycleanFormProps> = ({ onChange }) => {
  const [opt, setOpt] = useState<DrycleanOptions>(defaultDrycleanOptions);
  useEffect(() => onChange(opt), [opt, onChange]);

  const onMethodChange = (e: any) =>
    setOpt((opt) => ({
      ...opt,
      drycleanMethod: e.target.value,
    }));

  const onReduceMoistureChange = () =>
    setOpt((opt) => ({
      ...opt,
      drycleanReduceMoisture: !opt.drycleanReduceMoisture,
    }));

  const onNoSteamChange = () =>
    setOpt((opt) => ({
      ...opt,
      drycleanNoSteam: !opt.drycleanNoSteam,
    }));

  return (
    <form>
      <label>
        <span>Dryclean Method: </span>
        <select value={opt.drycleanMethod} onChange={onMethodChange}>
          <option value="no-dryclean">Do Not Dryclean</option>
          <option value="dryclean-ok">Dryclean OK</option>
          <option value="any">Dryclean, Any Sovlent</option>
          <option value="petroleum">Dryclean, Petroleum (P) Solvent</option>
          <option value="no-dryclean">Dryclean, Non-TCE/HCS (F) Solvent</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={opt.drycleanReduceMoisture}
          onChange={onReduceMoistureChange}
        ></input>
        <span> Reduced Moisture?</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={!opt.drycleanNoSteam}
          onChange={onNoSteamChange}
        ></input>
        <span> Steam Finishing OK?</span>
      </label>
    </form>
  );
};

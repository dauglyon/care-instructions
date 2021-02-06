import React, { FC } from "react";
import { IronOptions } from "../../types/Options";
import { SVGManager } from "../SVGManager";

import { ReactComponent as IronSVG } from "../../img/washicon-derived/iron.svg";

export * from "./IronForm";

export const ironText = (opt: IronOptions) => {
  if (opt.ironMethod === "no-iron") return "Do Not Iron";

  return (
    "Iron on " +
    {
      low: "Low Heat",
      medium: "Medium Heat",
      high: "High Heat",
      any: "Any Temp",
    }[opt.ironMethod] +
    (opt.ironSteamOk ? "." : ", No Steam.")
  );
};

export const IronIcon: FC<IronOptions> = (opt) => {
  return (
    <SVGManager
      showLayers={{
        base: true,
        [opt.ironMethod]: true,
        "no-steam": !opt.ironSteamOk && opt.ironMethod !== "no-iron",
      }}
    >
      <IronSVG width="64px" height="64px" x="0px" y="0px" viewBox="0 0 32 32" />
    </SVGManager>
  );
};

export const IronPreview: FC<IronOptions> = (opt) => {
  return (
    <>
      <IronIcon {...opt} />
      <div>{ironText(opt)}</div>
    </>
  );
};

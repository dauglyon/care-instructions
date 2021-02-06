import React, { FC } from "react";
import { BleachOptions } from "../../types/Options";
import { SVGManager } from "../SVGManager";

import { ReactComponent as BleachSVG } from "../../img/washicon-derived/bleach.svg";

export * from "./BleachForm";

export const bleachText = ({ bleachMethod }: BleachOptions) => {
  return {
    "no-bleach": "Do Not Bleach",
    ok: "Bleach When Needed",
    "non-chlorine": "Non-Chlorine Bleach When Needed",
  }[bleachMethod];
};

export const BleachIcon: FC<BleachOptions> = (opt) => {
  return (
    <SVGManager
      showLayers={{
        base: true,
        "non-chlorine": opt.bleachMethod === "non-chlorine",
        "no-bleach": opt.bleachMethod === "no-bleach",
      }}
    >
      <BleachSVG
        width="64px"
        height="64px"
        x="0px"
        y="0px"
        viewBox="0 0 32 32"
      />
    </SVGManager>
  );
};

export const BleachPreview: FC<BleachOptions> = (opt) => {
  return (
    <>
      <BleachIcon {...opt} />
      <div>{bleachText(opt)}</div>
    </>
  );
};

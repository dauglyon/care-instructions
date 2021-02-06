import React, { FC } from "react";
import { DrycleanOptions } from "../../types/Options";
import { SVGManager } from "../SVGManager";

import { ReactComponent as DrycleanSVG } from "../../img/washicon-derived/dryclean.svg";

export * from "./DrycleanForm";

export const drycleanText = (opt: DrycleanOptions) => {
  return "";
};

export const DrycleanIcon: FC<DrycleanOptions> = (opt) => {
  return (
    <SVGManager showLayers={{ base: true }}>
      <DrycleanSVG
        width="64px"
        height="64px"
        x="0px"
        y="0px"
        viewBox="0 0 32 32"
      />
    </SVGManager>
  );
};

export const DrycleanPreview: FC<DrycleanOptions> = (opt) => {
  return (
    <>
      <DrycleanIcon {...opt} />
      <div>{drycleanText(opt)}</div>
    </>
  );
};

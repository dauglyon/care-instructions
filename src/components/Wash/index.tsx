import React, { FC } from "react";
import { WashOptions } from "../../types/Options";
import { SVGManager } from "../SVGManager";

import { ReactComponent as WashSVG } from "../../img/washicon-derived/wash.svg";
import { ReactComponent as NoWringSVG } from "../../img/washicon-derived/no-wring.svg";

export * from "./WashForm";

export const washText = ({
  washMethod,
  washTemp,
  washWringOk,
}: WashOptions) => {
  if (washMethod === "nowash") return "Do Not Wash";
  let wash = washMethod === "hand" ? "Hand Wash" : "Machine Wash";
  if (washMethod === "perm-press") wash += ", Permanent Press";
  if (washMethod === "delicate") wash += ", Delicate";
  const temp = {
    normal: "",
    30: "30°C",
    40: "40°C",
    50: "50°C",
    60: "60°C",
    70: "70°C",
    95: "95°C",
  }[washTemp];
  if (temp) wash += ` ${temp}`;
  if (!washWringOk) wash += ". Do Not Wring";
  return wash;
};

export const NoWringIcon: FC<WashOptions> = (opt) => {
  if (opt.washWringOk) return null;
  return (
    <NoWringSVG
      width="64px"
      height="64px"
      x="0px"
      y="0px"
      viewBox="0 0 32 32"
    />
  );
};

export const WashIcon: FC<WashOptions> = (opt) => {
  const washStyle = opt.washMethod === "hand" ? "hand" : opt.washTempStyle;
  return (
    <SVGManager
      showLayers={{
        base: opt.washMethod !== "hand",
        hand: opt.washMethod === "hand",
        "perm-press":
          opt.washMethod === "perm-press" || opt.washMethod === "delicate",
        delicate: opt.washMethod === "delicate",
        nowash: opt.washMethod === "nowash",
        ...(opt.washTemp !== "normal"
          ? {
              [`${washStyle}-${opt.washTemp}`]: true,
            }
          : {}),
      }}
    >
      <WashSVG width="64px" height="64px" x="0px" y="0px" viewBox="0 0 32 32" />
    </SVGManager>
  );
};

export const WashPreview: FC<WashOptions> = (opt) => {
  return (
    <div className="card" style={{ width: "256px" }}>
      <div className="card-content">
        <WashIcon {...opt} />
        <NoWringIcon {...opt} />
      </div>
      <div className="card-content">
        <>
          <WashIcon {...opt} />
          <NoWringIcon {...opt} />
        </>
      </div>
      <div className="card-content box">{washText(opt)}</div>
    </div>
  );
};

import React, { FC } from "react";
import { DryOptions } from "../../types/Options";
import { SVGManager } from "../SVGManager";

import { ReactComponent as DrySVG } from "../../img/washicon-derived/dry.svg";

export * from "./DryForm";

export const dryText = (opt: DryOptions) => {
  if (!(opt.dryTumbleOk || opt.dryAltOk)) return "Do Not Dry.";
  let txt = "";
  if (opt.dryTumbleOk) {
    txt += "Tumble Dry";
    if (opt.dryTumbleMethod !== "normal") {
      txt +=
        ", " +
        {
          "perm-press": "Perm. Press",
          delicate: "Delicate",
        }[opt.dryTumbleMethod];
    }
    txt +=
      " " +
      {
        any: "on Any Heat",
        low: "on Low Heat",
        medium: "on Medium Heat",
        high: "on High Heat",
        "no-heat": "with No Heat",
      }[opt.dryTumbleTemp];
  }
  if (opt.dryAltOk) {
    if (opt.dryTumbleOk) txt += ". Or, ";
    txt += {
      line: "Line Dry",
      drip: "Drip Dry",
      flat: "Dry Flat",
    }[opt.dryAltMethod];
    if (opt.dryAltShade) txt += " in the Shade";
    if (!opt.dryTumbleOk) txt += ". Do Not Tumble Dry";
  }
  return txt;
};

export const MainDryIcon: FC<DryOptions> = (opt) => {
  return (
    <SVGManager
      showLayers={{
        base: true,
        tumble: opt.dryTumbleOk || opt.dryAltOk,
        "no-dry": !opt.dryTumbleOk,
        ...(opt.dryTumbleOk && opt.dryTumbleTemp !== "any"
          ? {
              [opt.dryTumbleTemp]: true,
            }
          : {}),
        ...(opt.dryTumbleOk && opt.dryTumbleMethod !== "normal"
          ? {
              [opt.dryTumbleMethod]: true,
            }
          : {}),
      }}
    >
      <DrySVG width="64px" height="64px" x="0px" y="0px" viewBox="0 0 32 32" />
    </SVGManager>
  );
};

export const AltDryIcon: FC<DryOptions> = (opt) => {
  if (!opt.dryAltOk) return null;
  return (
    <SVGManager
      showLayers={{
        base: true,
        [opt.dryAltMethod]: true,
        shade: opt.dryAltShade,
      }}
    >
      <DrySVG width="64px" height="64px" x="0px" y="0px" viewBox="0 0 32 32" />
    </SVGManager>
  );
};

export const DryPreview: FC<DryOptions> = (opt) => {
  return (
    <>
      <MainDryIcon {...opt}></MainDryIcon>
      <AltDryIcon {...opt}></AltDryIcon>
      <div>{dryText(opt)}</div>
    </>
  );
};

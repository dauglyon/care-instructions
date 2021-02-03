import React, { FC } from 'react';
import { DryOptions } from '../../types/options';
import { SVGManager, SVGGroup } from '../SVGManager';

const dryText = (opt: DryOptions) => {
  if (!(opt.dryTumbleOk || opt.dryAltOk)) return "Do Not Dry."
  let txt = "";
  if (opt.dryTumbleOk) {
    txt += "Tumble Dry"
    if (opt.dryTumbleMethod !== "normal") {
      txt += ", " + {
        "perm-press": "Perm. Press",
        "delicate": "Delicate"
      }[opt.dryTumbleMethod]
    }
    txt += " " + {
      "any": "on Any Heat",
      "low": "on Low Heat",
      "medium": "on Medium Heat",
      "high": "on High Heat",
      "no-heat": "with No Heat"
    }[opt.dryTumbleTemp]
  }
  if (opt.dryAltOk) {
    if (opt.dryTumbleOk) txt += ". Or, ";
    txt += {
      "line": "Line Dry",
      "drip": "Drip Dry",
      "flat": "Dry Flat"
    }[opt.dryAltMethod]
    if (opt.dryAltShade) txt += " in the Shade"
    if (!opt.dryTumbleOk) txt += ". Do Not Tumble Dry"
  }
  return txt + ".";
};

export const MainDry: FC<DryOptions> = (opt) => {
  return (
    <SVGManager svgName="dry" width="64px" height="64px" x="0px" y="0px" viewBox="0 0 32 32">
      <SVGGroup groupId='base' shouldShow={true} />
      <SVGGroup groupId='tumble' shouldShow={opt.dryTumbleOk || opt.dryAltOk} />
      <SVGGroup groupId='no-dry' shouldShow={!opt.dryTumbleOk} />
      <SVGGroup groupId='high' shouldShow={opt.dryTumbleOk && opt.dryTumbleTemp === 'high'} />
      <SVGGroup groupId='medium' shouldShow={opt.dryTumbleOk && opt.dryTumbleTemp === 'medium'} />
      <SVGGroup groupId='low' shouldShow={opt.dryTumbleOk && opt.dryTumbleTemp === 'low'} />
      <SVGGroup groupId='no-heat' shouldShow={opt.dryTumbleOk && opt.dryTumbleTemp === 'no-heat'} />
      <SVGGroup groupId='perm-press' shouldShow={opt.dryTumbleOk && opt.dryTumbleMethod === 'perm-press'} />
      <SVGGroup groupId='delicate' shouldShow={opt.dryTumbleOk && opt.dryTumbleMethod === 'delicate'} />
    </SVGManager>
  );
}

export const AltDry: FC<DryOptions> = (opt) => {
  if (!opt.dryAltOk) return null
  return (
    <SVGManager svgName="dry" width="64px" height="64px" x="0px" y="0px" viewBox="0 0 32 32">
      <SVGGroup groupId='base' shouldShow={true} />
      <SVGGroup groupId='line' shouldShow={opt.dryAltMethod === "line"} />
      <SVGGroup groupId='flat' shouldShow={opt.dryAltMethod === "flat"} />
      <SVGGroup groupId='drip' shouldShow={opt.dryAltMethod === "drip"} />
      <SVGGroup groupId='shade' shouldShow={opt.dryAltShade} />
    </SVGManager>
  );
}

export const Dry: FC<DryOptions> = (opt) => {
  return (
    <div>
      <MainDry {...opt}></MainDry>
      <AltDry {...opt}></AltDry>
      <div>{dryText(opt)}</div>
    </div>
  )
}
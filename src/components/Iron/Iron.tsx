import React, { FC } from 'react';
import { IronOptions } from '../../types/options';
import { SVGManager, SVGGroup } from '../SVGManager';

const ironText = (opt: IronOptions) => {
  if (opt.ironMethod === "no-iron") return "Do Not Iron";

  return "Iron on " + {
    "low": "Low Heat",
    "medium": "Medium Heat",
    "high": "High Heat",
    "any": "Any Temp"
  }[opt.ironMethod] + (opt.ironSteamOk ? "." : ", No Steam.");
};

export const Iron: FC<IronOptions> = (opt) => {
  return (
    <div>
      <SVGManager svgName="iron" width="64px" height="64px" x="0px" y="0px" viewBox="0 0 32 32">
        <SVGGroup groupId='base' shouldShow={true} />
        <SVGGroup groupId='low' shouldShow={opt.ironMethod === "low"} />
        <SVGGroup groupId='medium' shouldShow={opt.ironMethod === "medium"} />
        <SVGGroup groupId='high' shouldShow={opt.ironMethod === "high"} />
        <SVGGroup groupId='no-iron' shouldShow={opt.ironMethod === "no-iron"} />
        <SVGGroup groupId='no-steam' shouldShow={!opt.ironSteamOk && opt.ironMethod !== "no-iron"} />
      </SVGManager>
      <div>{ironText(opt)}</div>
    </div>
  )
}
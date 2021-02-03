import React, { FC } from 'react';
import { BleachOptions } from '../../types/options';
import { SVGManager, SVGGroup } from '../SVGManager';

const bleachText = ({ bleachMethod }: BleachOptions) => {
  return {
    "no-bleach": "Do Not Bleach",
    "ok": "Any Bleach When Needed",
    "non-chlorine": "Only Non-Chlorine Bleach When Needed"
  }[bleachMethod];
};

export const Bleach: FC<BleachOptions> = (props) => {
  return (
    <div>
      <SVGManager svgName="bleach" width="64px" height="64px" x="0px" y="0px" viewBox="0 0 32 32">
        <SVGGroup groupId='base' shouldShow={true} />

        <SVGGroup groupId='non-chlorine' shouldShow={props.bleachMethod === "non-chlorine"} />
        <SVGGroup groupId="no-bleach" shouldShow={props.bleachMethod === "no-bleach"} />

      </SVGManager>
      <div>{bleachText(props)}</div>
    </div>
  )
}
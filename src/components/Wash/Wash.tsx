import React, { FC } from 'react';
import { WashOptions } from '../../types/options';
import { SVGManager, SVGGroup } from '../SVGManager';

const washText = ({ washMethod, washTemp }: WashOptions) => {
  if (washMethod === "nowash") return "Do Not Wash";
  let wash = washMethod === "hand" ? "Hand Wash" : "Machine Wash";
  if (washMethod === "perm-press") wash += ", Permanent Press"
  if (washMethod === "delicate") wash += ", Delicate"
  const temp = {
    "normal": "",
    30: "30°C",
    40: "40°C",
    50: "50°C",
    60: "60°C",
    70: "70°C",
    95: "95°C"
  }[washTemp];
  return `${wash} ${temp}`
};

export const NoWring: FC<WashOptions> = (opt) => {
  if (opt.washWringOk) return null
  return (
    <SVGManager svgName="noWring" width="64px" height="64px" x="0px" y="0px" viewBox="0 0 32 32">
      <SVGGroup groupId='base' shouldShow={true} />
    </SVGManager>
  );
}

export const Wash: FC<WashOptions> = (props) => {
  const washStyle = props.washMethod === "hand" ? "hand" : props.washTempStyle;
  return (
    <div>
      <SVGManager svgName="wash" width="64px" height="64px" x="0px" y="0px" viewBox="0 0 32 32">
        <SVGGroup groupId='hand-bin' shouldShow={props.washMethod === "hand"} />
        <SVGGroup groupId='normal-bin' shouldShow={props.washMethod !== "hand"} />

        <SVGGroup groupId='perm-press' shouldShow={props.washMethod === "perm-press" || props.washMethod === "delicate"} />
        <SVGGroup groupId='delicate' shouldShow={props.washMethod === "delicate"} />

        <SVGGroup groupId='nowash' shouldShow={props.washMethod === "nowash"} />

        <SVGGroup groupId={`${washStyle}-${props.washTemp}`} shouldShow={true} />

      </SVGManager>
      <NoWring {...props}></NoWring>
      <div>{washText(props)}</div>
    </div>
  )
}
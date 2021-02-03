import React, { FC, useRef, useState, useEffect } from 'react';

/* eslint import/no-webpack-loader-syntax: off */
import washSrc from '!!raw-loader!../img/washicon-derived/wash.svg';
import bleachSrc from '!!raw-loader!../img/washicon-derived/bleach.svg';
import noWringSrc from '!!raw-loader!../img/washicon-derived/no-wring.svg';
import drySrc from '!!raw-loader!../img/washicon-derived/dry.svg';
import drycleanSrc from '!!raw-loader!../img/washicon-derived/dryclean.svg';
import ironSrc from '!!raw-loader!../img/washicon-derived/iron.svg';

const sources = {
  wash: washSrc,
  bleach: bleachSrc,
  noWring: noWringSrc,
  dry: drySrc,
  dryclean: drycleanSrc,
  iron: ironSrc,
}

export function elementFromSource(src: string) {
  var div = document.createElement('div');
  div.innerHTML = src;
  return div.firstElementChild ?? document.createElement('svg');;
}


interface SVGGroupProps { groupId: string, shouldShow: boolean };

export const SVGGroup: FC<SVGGroupProps> = () => (<></>);

interface SVGManagerProps extends React.SVGProps<SVGSVGElement> {
  svgName: keyof typeof sources,
  children?: React.ReactElement<SVGGroupProps> | React.ReactElement<SVGGroupProps>[];
}

export const SVGManager: FC<SVGManagerProps> = ({ svgName, children, ...svgProps }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [groupState, setGroupState] = useState<Record<string, boolean>>({});

  // Check for group changes
  const newGroupState: Record<string, boolean> = {};

  React.Children.forEach(children ?? [], (child) => {
    if (!child) return;
    const { props: { groupId, shouldShow = true } } = child as React.ReactElement<SVGGroupProps>;;
    newGroupState[groupId] = shouldShow;
  });

  const noChanges = [...new Set([...Object.keys(groupState), ...Object.keys(newGroupState)])]
    .every(key => newGroupState.hasOwnProperty(key)
      && groupState.hasOwnProperty(key)
      && newGroupState[key] === groupState[key]);

  if (!noChanges) {
    setGroupState(newGroupState);
  }

  // inject SVG w/ appropriate groups after mount
  useEffect(() => {
    if (ref?.current) {
      const svg = ref.current;
      const icon = elementFromSource(sources[svgName]);
      [...icon.querySelectorAll("g")]
        .filter(el => !groupState[el.id])
        .forEach(el => el.remove());

      svg.innerHTML = icon.innerHTML;
    }
  }, [svgName, groupState])


  return <svg {...svgProps} ref={ref}></svg>
}
import React, { FC, useRef, useState, useEffect } from "react";

interface SVGManagerProps {
  showLayers: Record<string, boolean>;
  children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

export const SVGManager: FC<SVGManagerProps> = ({
  showLayers,
  children,
  ...svgProps
}) => {
  const SVGRef = useRef<SVGSVGElement>(null);
  const [renderKey, setRenderKey] = useState<string>("");

  // mutate SVG and remove appropriate groups after mount
  useEffect(() => {
    if (SVGRef?.current) {
      const svg = SVGRef.current;
      [...svg.querySelectorAll("g")]
        .filter((el) => !showLayers[el.id])
        .forEach((el) => el.remove());

      const title =
        svg.querySelector("title") ||
        svg.appendChild(
          document.createElementNS("http://www.w3.org/2000/svg", "title")
        );

      const titleInfo = Object.entries(showLayers)
        .filter(([key, val]) => val && key !== "base")
        .map(([key, _]) => key)
        .join("_");

      const txt = `${svg.nodeName}--${titleInfo || "default"}`;
      setRenderKey(txt);
      title.textContent = txt;
    }
  }, [showLayers, svgProps]);

  return React.cloneElement(children, {
    key: renderKey,
    ref: SVGRef,
  });
};

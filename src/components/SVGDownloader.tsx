import React, { FC } from "react";
import fileDownload from "js-file-download";

export const SVGDownloader: FC<
  {
    downloadFrom: React.RefObject<any>;
  } & React.HTMLAttributes<HTMLButtonElement>
> = ({ downloadFrom, children, ...props }) => {
  const onClick = () => {
    const wrapper = downloadFrom?.current;
    if (wrapper) {
      [...wrapper.querySelectorAll("svg")].forEach((svg) => {
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svg);
        if (
          !source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)
        ) {
          source = source.replace(
            /^<svg/,
            '<svg xmlns="http://www.w3.org/2000/svg"'
          );
        }
        if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
          source = source.replace(
            /^<svg/,
            '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
          );
        }
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

        const careInstruction = new Blob([source], { type: "image/svg+xml" });
        const fileName = svg.querySelector("title")?.textContent ?? "image";
        fileDownload(careInstruction, fileName);
      });
    }
  };
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
};

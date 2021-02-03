import React, { FC, useRef } from 'react';
import fileDownload from 'js-file-download';

interface SVGDownloaderProps {
  fileName?: string
}

export const SVGDownloader: FC<SVGDownloaderProps> = ({ fileName = "image.svg", children }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const onClick = () => {
    const span = ref?.current
    if (span) {
      [...span.querySelectorAll('svg')].forEach(svg => {
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svg);
        if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
          source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
          source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

        const blob = new Blob([source], { type: 'image/svg+xml' });
        fileDownload(blob, fileName);
      })
    }
  }
  return <>
    <span ref={ref}>{children}</span>
    <button onClick={onClick}>&#11015; Download</button>
  </>
}
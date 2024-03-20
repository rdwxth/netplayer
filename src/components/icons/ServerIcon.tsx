import * as React from 'react';
import { SVGProps, memo } from 'react';

const ServerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 13v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3"
    />
    <rect
      width="20"
      height="8"
      x="2"
      y="4"
      rx="2"
      ry="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

export default memo(ServerIcon);

import * as React from 'react';
import { SVGProps, memo } from 'react';

const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon-nfplayerPlay"
    style={{ width: '100%', height: '100%' }}
    {...props}
  >
    <path
      d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
      fill="currentColor"
    />
  </svg>
);

export default memo(PlayIcon);

import * as React from 'react';
import { SVGProps, memo } from 'react';

const FastForwardIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={32}
        height={32}
        viewBox="0 0 24 24"
        style={{ width: '100%', height: '100%' }}
        {...props}
    >
        <path
            fill="currentColor"
            d="M4 4v16l8.5-8L4 4zm9 0v16l8.5-8L13 4z"
        />
    </svg>
);

const Memo = memo(FastForwardIcon);
export default Memo;
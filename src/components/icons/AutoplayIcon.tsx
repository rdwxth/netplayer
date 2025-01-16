import * as React from 'react';
import { SVGProps, memo } from 'react';

const AutoplayIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="iconify iconify--ic"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        style={{ width: '100%', height: '100%' }}
        {...props}
    >
        <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"
        />
    </svg>
);

const Memo = memo(AutoplayIcon);
export default Memo;

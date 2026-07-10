import { useId } from "react";

export default function CheckedIcon() {
    const uniqueId = useId();
    const maskId = `mask-${uniqueId}`;

    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse" x="-0.5" y="-0.5" width="20" height="20" fill="black">
                    <rect fill="white" x="-0.5" y="-0.5" width="20" height="20" />
                    <path d="M1.5 5.5C1.5 3.29086 3.29086 1.5 5.5 1.5H13.5C15.7091 1.5 17.5 3.29086 17.5 5.5V13.5C17.5 15.7091 15.7091 17.5 13.5 17.5H5.5C3.29086 17.5 1.5 15.7091 1.5 13.5V5.5Z" />
                </mask>
            </defs>
            <path d="M1.5 5.5C1.5 3.29086 3.29086 1.5 5.5 1.5H13.5C15.7091 1.5 17.5 3.29086 17.5 5.5V13.5C17.5 15.7091 15.7091 17.5 13.5 17.5H5.5C3.29086 17.5 1.5 15.7091 1.5 13.5V5.5Z" fill="#CCE88E" />
            <path d="M5.5 1.5V3H13.5V1.5V0H5.5V1.5ZM17.5 5.5H16V13.5H17.5H19V5.5H17.5ZM13.5 17.5V16H5.5V17.5V19H13.5V17.5ZM1.5 13.5H3V5.5H1.5H0V13.5H1.5ZM5.5 17.5V16C4.11929 16 3 14.8807 3 13.5H1.5H0C0 16.5376 2.46243 19 5.5 19V17.5ZM17.5 13.5H16C16 14.8807 14.8807 16 13.5 16V17.5V19C16.5376 19 19 16.5376 19 13.5H17.5ZM13.5 1.5V3C14.8807 3 16 4.11929 16 5.5H17.5H19C19 2.46243 16.5376 0 13.5 0V1.5ZM5.5 1.5V0C2.46243 0 0 2.46243 0 5.5H1.5H3C3 4.11929 4.11929 3 5.5 3V1.5Z" fill="#397968" mask={`url(#${maskId})`} />
            <path d="M4.8335 11.167C4.8335 11.167 5.8335 11.167 7.16683 13.5003C7.16683 13.5003 10.8727 7.38921 14.1668 6.16699" stroke="#397968" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
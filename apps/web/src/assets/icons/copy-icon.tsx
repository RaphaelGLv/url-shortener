import { AppIconProps } from './_types';

export const CopyIcon = ({ size = 24, color = 'currentColor', props = {} }: AppIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="9" y="9" width="10" height="10" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export default CopyIcon;

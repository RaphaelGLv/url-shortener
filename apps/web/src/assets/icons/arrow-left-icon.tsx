import { AppIconProps } from './_types';

export const ArrowLeftIcon = ({ size = 24, color = 'currentColor', props = {} }: AppIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19 12H6" />
    <path d="M12 19L5 12L12 5" />
  </svg>
);

export default ArrowLeftIcon;

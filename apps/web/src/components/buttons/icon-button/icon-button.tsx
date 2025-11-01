import styles from "./icon-button.module.css";
import { AppIcons } from "@/assets/icons/_index";

interface IconButtonProps {
  icon: (typeof AppIcons)[keyof typeof AppIcons];
  onClick: () => void;
  ariaLabel: string;
  className?: string;
  props?: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "aria-label" | "children"
  >;
}

export function IconButton({
  icon: Icon,
  onClick,
  ariaLabel,
  className,
  props,
}: IconButtonProps) {
  return (
    <button
      className={`${styles.iconButton} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon aria-label="" size={24} props={{ "aria-hidden": true }} />
    </button>
  );
}

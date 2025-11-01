import styles from "./loader.module.css";

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return (
    <span className={`${styles.loader} ${className}`} aria-label="Loading">
    </span>
  );
}

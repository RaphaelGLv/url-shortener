import { Loader } from '../../loader/loader';
import styles from './text-button.module.css';

interface TextButtonProps {
    text: string;
    onClick: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    props?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled" | "children">;
}

export function TextButton({ text, onClick, isLoading=false, disabled=false, props }: TextButtonProps) {
    return (
        <button className={`${styles.textButton} ${isLoading ? styles.hideText : ''}`} onClick={onClick} disabled={isLoading || disabled} {...props}>
            {text}
            {isLoading && <Loader className={styles.loader} />}
        </button>
    )
}
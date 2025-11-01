import { Loader } from '../../loader/loader';
import styles from './text-button.module.css';
import primaryStyles from './button-styles/primary.module.css'
import secondaryStyles from './button-styles/secondary.module.css'

export interface TextButtonProps {
    text: string;
    onClick: () => void;
    buttonStyle?: 'primary' | 'secondary';
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    props?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled" | "children">;
}

export function TextButton({ text, onClick, buttonStyle='primary', isLoading=false, disabled=false, className, props }: TextButtonProps) {
    const stylesMap = {
        primary: primaryStyles.button,
        secondary: secondaryStyles.button,
    };

    return (
        <button className={`${styles.textButton} ${isLoading ? styles.hideText : ''} ${className} ${stylesMap[buttonStyle]}`} onClick={onClick} disabled={isLoading || disabled} {...props}>
            {text}
            {isLoading && <Loader className={styles.loader} />}
        </button>
    )
}
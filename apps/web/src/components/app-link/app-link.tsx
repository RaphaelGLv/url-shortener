import styles from './app-link.module.css';
import Link from 'next/link';

interface AppLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
}

const AppLink: React.FC<AppLinkProps> = ({ href, children, className, target="_blank" }) => {
    return (
        <Link href={href} className={`${styles.appLink} ${className}`} target={target} rel='noopener noreferrer'>
            {children}
        </Link>
    );
};

export default AppLink;

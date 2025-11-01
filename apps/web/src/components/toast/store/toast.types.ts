type ToastTypes = 'success' | 'error' | 'info';

export interface ToastStoreProps {
    show: boolean;
    type: ToastTypes;
    message: string;
    setToast: ( {type, message}: Pick<ToastStoreProps, 'type' | 'message'> ) => void;
}
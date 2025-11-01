import { create } from "zustand";
import { ToastStoreProps } from "./toast.types";

export const useToastStore = create<ToastStoreProps>((set) => ({
    show: false,
    type: 'info',
    message: '',
    setToast: ({type, message}) => {
        set({ type, message, show: true });
        
        setTimeout(() => {
            set({ show: false });
        }, 3000);
    },
}));
import { AppIconProps } from "./_types";
import { CloseIcon } from "./close-icon";

export const AppIcons = {
    CLOSE: (props: AppIconProps) => <CloseIcon {...new AppIconProps(props)} />,
} as const;
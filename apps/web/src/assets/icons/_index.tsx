import { AppIconProps } from "./_types";
import { CloseIcon } from "./close-icon";
import { CopyIcon } from "./copy-icon";
import { TrashIcon } from "./trash-icon";
import { ArrowLeftIcon } from "./arrow-left-icon";

export const AppIcons = {
    CLOSE: (props: AppIconProps) => <CloseIcon {...new AppIconProps(props)} />,
    COPY: (props: AppIconProps) => <CopyIcon {...new AppIconProps(props)} />,
    TRASH: (props: AppIconProps) => <TrashIcon {...new AppIconProps(props)} />,
    ARROW_LEFT: (props: AppIconProps) => <ArrowLeftIcon {...new AppIconProps(props)} />,
} as const;
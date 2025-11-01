const DEFAULT_SIZE = 24;

export class AppIconProps {
  "aria-label": string;
  size?: number = DEFAULT_SIZE;
  color?: string = "currentColor";
  props?: Omit<
    React.SVGProps<SVGSVGElement>,
    "aria-label" | "children" | "width" | "height"
  > = {};

  constructor(init?: Partial<AppIconProps>) {
    Object.assign(this, init);
  }
}

import { IconColorDefault, IconProps } from "./IconProps";

export function IconAlignLeft(props: IconProps) {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12.5H0V14.5H12V12.5ZM12 4.5H0V6.5H12V4.5ZM0 10.5H18V8.5H0V10.5ZM0 18.5H18V16.5H0V18.5ZM0 0.5V2.5H18V0.5H0Z"
        fill={props.color || IconColorDefault}
      />
    </svg>
  );
}

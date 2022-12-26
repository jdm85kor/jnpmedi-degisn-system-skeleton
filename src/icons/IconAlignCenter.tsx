import { IconColorDefault, IconProps } from "./IconProps";

export function IconAlignCenter(props: IconProps) {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12.5V14.5H14V12.5H4ZM0 18.5H18V16.5H0V18.5ZM0 10.5H18V8.5H0V10.5ZM4 4.5V6.5H14V4.5H4ZM0 0.5V2.5H18V0.5H0Z"
        fill={props.color || IconColorDefault}
      />
    </svg>
  );
}

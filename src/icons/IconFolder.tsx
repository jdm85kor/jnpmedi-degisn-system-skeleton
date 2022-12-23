import { IconColorDefault, IconProps } from "./IconProps";

export function IconFolder(props: IconProps) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.91729 0H1.72932C0.778195 0 0.0086466 0.778195 0.0086466 1.72932L0 12.1052C0 13.0564 0.778195 13.8346 1.72932 13.8346H15.5639C16.4286 13.8346 16.8609 13.4022 17.2932 12.5376L19.8872 6.23791C20.1866 5.5108 19.8872 5.18796 19.0225 5.18796H17.2932V3.45864C17.2932 2.50752 16.515 1.72932 15.5639 1.72932H8.64661L6.91729 0ZM7.92894 3.45864L6.19962 1.72932H1.72932V9.51127L3.45864 6.05262C3.71804 5.53383 4.3233 5.18796 4.75563 5.18796H15.5639V3.45864H7.92894ZM2.16165 12.1052H15.5639L17.7255 6.91729H4.75563L2.16165 12.1052Z"
        fill={props.color || IconColorDefault}
      />
    </svg>
  );
}

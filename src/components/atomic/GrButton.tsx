import { MouseEventHandler } from "react";
import {
  BackgroundColor,
  BackgroundColorDisabled,
  BackgroundColorDisabledHover,
  BackgroundColorHover,
  Colors,
} from "../../guide/colors";

type Size = "small" | "medium" | "large" | "fill" | "auto";

export interface GrButtonProps {
  children: React.ReactNode;
  /** 테마 색상 */
  color?: Colors;
  /** 버튼 활성화/비활성화 */
  disabled?: boolean;
  /** 외곽선 여부 */
  bordered?: boolean;
  /** 버튼 크기 */
  size?: Size;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const GrButton = (props: GrButtonProps) => {
  const css = {
    height: "2rem",
    color: "#fff",
    borderStyle: "solid",
    borderColor: "black", //"#e1e5e7",
    borderRadius: "0.25rem",
    borderWidth: props.bordered ? "1px" : "0px",
    width:
      props.size === "large"
        ? "15rem"
        : props.size === "medium"
        ? "10rem"
        : props.size === "small"
        ? "6rem"
        : props.size === "fill"
        ? "100%"
        : "auto",
    backgroundColor: BackgroundColor[props.color || "primary"],
    "&:hover": {
      borderColor: "#bfc2c4",
      backgroundColor: BackgroundColorHover[props.color || "primary"],
    },
    "&[disabled]": {
      color: "#bdbfbf",
      backgroundColor: BackgroundColorDisabled[props.color || "primary"],
      "&:hover": {
        backgroundColor: BackgroundColorDisabledHover[props.color || "primary"],
      },
    },
  };

  return (
    <button disabled={props.disabled} onClick={props.onClick} css={css}>
      {props.children}
    </button>
  );
};

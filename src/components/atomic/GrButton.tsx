import styled from "@emotion/styled";
import { MouseEventHandler } from "react";
import {
  backgroundColor,
  backgroundColorDark,
  backgroundColorDisabled,
  backgroundColorDisabledHover,
  backgroundColorHover,
  Colors,
} from "../../guide/colors";

type Size = "small" | "medium" | "large" | "fill" | "auto";

const width_map = {
  small: "6rem",
  medium: "10rem",
  large: "15rem",
  fill: "100%",
  auto: "auto",
};

const StyledButton = styled.button<GrButtonProps>`
  ${(props: GrButtonProps) =>
    `
  height: 44px;
  color: #fff;
  border-style: solid;
  border-color: black;
  border-radius: 0.25rem;
  cursor: pointer;
  width: ${width_map[props.size || "auto"]};
  background-color: ${backgroundColor[props.color || "primary"]};
  border-width: ${props.bordered ? "1px" : "0px"};
  text-align: ${props.align || "center"};

  &:hover {
    border-color: #bfc2c4;
    background-color: ${backgroundColorHover[props.color || "primary"]};
  }

  &:active {
    background-color: ${backgroundColorDark[props.color || "primary"]};
    transform-origin: top left;
    transform: translate(1px, 1px);
    box-shadow: -1px -1px 3px #888;
  }

  &:disabled {
    color: #bdbfbf;
    background-color: ${backgroundColorDisabled[props.color || "primary"]};
    &:hover {
      background-color: ${
        backgroundColorDisabledHover[props.color || "primary"]
      };
    }
  }
  `}
`;

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
  /** 컨텐츠 정렬 방식 */
  align?: "left" | "center" | "right";

  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * ## 기초적인 버튼 컴포넌트
 *
 * - 테마 색상을 지정할 수 있습니다
 * - 버튼 크기를 지정할 수 있습니다 (`height` 는 아직 `44px` 로 고정되어 있음)
 * - 외곽선 표시 여부를 지정할 수 있습니다
 * - 버튼 내부를 ReactNode 로 채울 수 있습니다
 * - 눌림효과는 Figma 의 Dark 계열 색상을 임시로 사용해 봄 (뭘 넣을까요? c.c @양승범)
 */
export function GrButton(props: GrButtonProps) {
  return (
    <StyledButton {...props} color={props.color}>
      {props.children}
    </StyledButton>
  );
}

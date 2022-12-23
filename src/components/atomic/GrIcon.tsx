import { IconNone } from "../../icons/IconNone";
import { IconEraser } from "../../icons/IconEraser";
import { IconFolder } from "../../icons/IconFolder";
import { IconAlignLeft } from "../../icons/IconAlignLeft";
import { IconAlignRight } from "../../icons/IconAlignRight";
import { IconAlignCenter } from "../../icons/IconAlignCenter";
import { IconAlignJustify } from "../../icons/IconAlignJustify";
import styled from "@emotion/styled";

export type IconTypes =
  | "none"
  | "eraser"
  | "folder"
  | "align-left"
  | "align-right"
  | "align-center"
  | "align-justify";

const map: { [key in IconTypes]: any } = {
  none: IconNone,
  eraser: IconEraser,
  folder: IconFolder,
  "align-left": IconAlignLeft,
  "align-center": IconAlignCenter,
  "align-right": IconAlignRight,
  "align-justify": IconAlignJustify,
};

const StyledIcon = styled.div<GrIconProps>`
  display: inline-flex;
  margin: 0.5rem;
  transition: transform 0.2s ease-in-out;
  transform: rotate(${(props: GrIconProps) => props.rotation}deg);
  &:hover {
    transform: rotate(${(props: GrIconProps) => props.rotationOnHover}deg);
  }
`;

export interface GrIconProps {
  /** 아이콘 모양 */
  name: IconTypes;
  /** 아이콘 색상, CSS 에서 지정할수 있는 모든 색상 가능 */
  color?: string;
  /** 아이콘 로테이션 */
  rotation?: number;
  /** 마우스 오버시 아이콘 로테이션 */
  rotationOnHover?: number;
}

/**
 * ## 아이콘 컴포넌트
 * > 고래밥에서 제공하는 모양 중 하나를 사용할 수 있습니다
 *
 * - 원하는 색상을 입힐 수 있습니다
 * - !!!!! 아직 사이즈 조절이 가능하지 않습니다
 */
export function GrIcon(props: GrIconProps) {
  const Component = map[props.name || "none"];

  return (
    <StyledIcon {...props}>
      <Component color={props.color} />
    </StyledIcon>
  );
}

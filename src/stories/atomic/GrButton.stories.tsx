import { GrButton, GrButtonProps } from "../../components/atomic/GrButton";
import { ComponentStory } from "@storybook/react";
import { GrIcon } from "../../components/atomic/GrIcon";

export default {
  title: "Atomic Components/GrButton",
  component: GrButton,
  argTypes: {
    children: {
      control: {
        type: "text",
        // disable: true,
      },
    },
    onClick: {
      control: {
        disable: true,
      },
    },
  },
};

const Template: ComponentStory<typeof GrButton> = (args) => (
  <GrButton {...args} />
);

/** Spec */
export const Spec = Template.bind({});
Spec.args = {
  color: "primary",
  disabled: false,
  bordered: false,
  size: "auto",
  children: (
    <div>
      <GrIcon name="eraser" color="white" /> 이것은 버튼이에요
    </div>
  ),
} as GrButtonProps;

/** Story - error 1 */
export const Story1 = Template.bind({});
Story1.storyName = "Test Case #1 - text overflow (fixed width)";
Story1.args = {
  ...Spec.args,
  size: "medium",
  children:
    "This is a very long ABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZ",
} as GrButtonProps;
Story1.decorators = [
  (Story) => (
    <div style={{ width: "15rem", height: "2rem", border: "1px solid black" }}>
      <Story />
    </div>
  ),
];

/** Story - error 2 */
export const Story2 = Template.bind({});
Story2.storyName = "Test Case #2 - text overflow (auto width)";
Story2.args = {
  ...Spec.args,
  size: "auto",
  children:
    "This is a very long ABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZ",
} as GrButtonProps;

export const Story3 = Template.bind({});
Story3.storyName = "마우스 오버시 Flip Rotate 효과";
Story3.decorators = [
  (Story) => (
    <GrButton size="large">
      <GrIcon name="align-left" color="white" interaction-rotate="true" />
      안됨
    </GrButton>
  ),
];

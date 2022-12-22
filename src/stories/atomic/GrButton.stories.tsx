import { GrButton, GrButtonProps } from "../../components/atomic/GrButton";
import { ComponentStory } from "@storybook/react";
import { GrIcon } from "../../components/atomic/GrIcon";

export default {
  title: "Atomic Components/GrButton",
  component: GrButton,
  argTypes: {
    children: {
      control: {
        disable: true,
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
      이것은 버튼이에요 <GrIcon name="eraser" />
    </div>
  ),
} as GrButtonProps;

/** Story - error 1 */
export const Story1 = Template.bind({});
Story1.storyName = "Test Case #1 - text overflow (fixed width)";
Story1.args = {
  ...Spec.args,
  size: "large",
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

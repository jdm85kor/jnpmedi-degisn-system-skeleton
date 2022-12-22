import { GrButton, GrButtonProps } from "../components/atomic/GrButton";

export default {
  title: "Atomic Components/GrButton",
  component: GrButton,
};

const Template = (args) => <GrButton {...args}>이것은 버튼이에요</GrButton>;

export const Basic = Template.bind({});

Basic.args = {
  color: "primary",
  disabled: false,
  bordered: false,
  size: "auto",
} as GrButtonProps;

import { GrButton, GrButtonProps } from "../../components/atomic/GrButton";

export default {
  title: "Atomic Components/GrButton",
  component: GrButton,
  parameters: {
    backgrounds: {
      values: [
        {
          name: "white",
          value: "#fff",
        },
        {
          name: "gray",
          value: "#ccc",
        },
        {
          name: "dark",
          value: "#333",
        },
      ],
    },
  },
};

const Template = (args) => <GrButton {...args} />;

export const Spec = Template.bind({});
Spec.args = {
  color: "primary",
  disabled: false,
  bordered: false,
  size: "auto",
  children: "이것은 버튼이에요",
} as GrButtonProps;

export const Text_Overflow_Fixed_Width = Template.bind({});
Text_Overflow_Fixed_Width.args = {
  ...Spec.args,
  size: "large",
  children:
    "This is a very long ABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZ",
} as GrButtonProps;
Text_Overflow_Fixed_Width.decorators = [
  (Story) => (
    <div style={{ width: "15rem", height: "2rem", border: "1px solid black" }}>
      <Story />
    </div>
  ),
];

export const Text_Overflow_Auto_Width = Template.bind({});
Text_Overflow_Auto_Width.args = {
  ...Spec.args,
  size: "auto",
  children:
    "This is a very long ABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZABCDEFGHIJKLMNOPQRSUTVWXYZ",
} as GrButtonProps;

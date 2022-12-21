import { Input } from "../components/atomic/Input";

export default {
  title: "Example/Input",
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Input {...args} />;

export const BlueSmall = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BlueSmall.args = {
  primary: true,
  label: "Blue Small",
};

export const RedSmall = Template.bind({});
RedSmall.args = {
  label: "Red Small",
};

export const BlueLarge = Template.bind({});
BlueLarge.args = {
  primary: true,
  size: "large",
  label: "Blue Large",
};

export const RedLarge = Template.bind({});
RedLarge.args = {
  size: "small",
  label: "Red Large",
};

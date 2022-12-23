import { Table } from "../components/molecule/table/Table";

export default {
  title: "Example/Table",
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Table {...args} />;

export const DefaultTable = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultTable.args = {};

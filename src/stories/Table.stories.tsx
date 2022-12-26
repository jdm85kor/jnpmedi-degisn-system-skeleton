import { Table } from "../components/atomic/table/Table";

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
DefaultTable.args = {
  head: { title: "테이블 thead" },
  body: {
    rows: [
      {
        theme: "normal",
        cols: [
          {
            theme: "primary",
            content: "첫번째 td이요",
            handler: () => {
              window.alert("no 1");
            },
          },
          {
            theme: "primary",
            content: "첫번째 td이요",
            handler: () => {
              window.alert("no 2");
            },
          },
          {
            theme: "primary",
            content: "첫번째 td이요",
            handler: () => {
              window.alert("no 3");
            },
          },
        ],
      },
      {
        theme: "normal",
        cols: [
          {
            theme: "normal",
            content: "네번째 td이요",
            handler: () => {
              window.alert("no 4");
            },
          },
          {
            theme: "normal",
            content: "다섯번째 td이요",
            handler: () => {
              window.alert("no 5");
            },
          },
          {
            theme: "normal",
            content: "여섯번째 td이요",
            handler: () => {
              window.alert("no 6");
            },
          },
        ],
      },
      { theme: "primary", cols: [] },
    ],
  },
};

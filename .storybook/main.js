const path = require("path");
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          ["react-app", { flow: false, typescript: true }],
          [
            "@babel/preset-react",
            { runtime: "automatic", importSource: "@emotion/react" },
          ],
          require.resolve("@emotion/babel-preset-css-prop"),
        ],
      },
    });
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.alias = {
      ...config.resolve.alias,
      "@emotion/core": toPath("node_modules/@emotion/react"),
      "@emotion/styled": toPath("node_modules/@emotion/styled"),
      "emotion-theming": toPath("node_modules/@emotion/react"),
    };
    return config;
  },
  framework: "@storybook/react",
};

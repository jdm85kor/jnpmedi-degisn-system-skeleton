export type Colors = "primary" | "emphasize" | "link" | "warning" | "success";

export const backgroundColor: { [k in Colors]: string } = {
  primary: "#259ac5",
  emphasize: "#ff890a",
  link: "#1f42bb",
  warning: "#ff4916",
  success: "#009a6d",
};

export const backgroundColorHover: { [k in Colors]: string } = {
  primary: "#1a88b3",
  emphasize: "#e06a09",
  link: "#0e329e",
  warning: "#cf3b0e",
  success: "#00895d",
};

export const backgroundColorDisabled: { [k in Colors]: string } = {
  primary: "#def0f6",
  emphasize: "#ffedda",
  link: "#dde3f5",
  warning: "#ffe4dc",
  success: "#d9f1e9",
};

export const backgroundColorDisabledHover: { [k in Colors]: string } = {
  primary: "#cad8de",
  emphasize: "#e3d3c5",
  link: "#b7c1e2",
  warning: "#e0ccc5",
  success: "#c5d6d1",
};

export const backgroundColorDark: { [k in Colors]: string } = {
  primary: "#0d587f",
  emphasize: "#e94c0b",
  link: "#001a90",
  warning: "#c32e01",
  success: "#005c34",
};

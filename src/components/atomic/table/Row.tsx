import styled from "@emotion/styled";

const StyledRow = styled.tr<{ theme: "normal" | "primary" }>`
  ${({ theme }) => {
    if (theme === "normal") {
      return `
        box-sizing: border-box;

        /* Auto layout */

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;
        gap: 10px;

        width: 100%;
        height: 40px;

        /* White (Text-Invert) */

        background: #FFFFFF;
        /* Border-Gray */

        border: 1px solid #E1E5E7;

        /* Inside auto layout */

        flex: none;
        order: 0;
        flex-grow: 1;
      `;
    } else if (theme === "primary") {
      return `
        box-sizing: border-box;

        /* Auto layout */

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;
        gap: 10px;

        width: 100%;
        height: 40px;

        /* Primary */

        background: #259ac5;
        /* Border-Gray */

        border: 1px solid #e1e5e7;

        /* Inside auto layout */

        flex: none;
        order: 0;
        align-self: stretch;
        flex-grow: 0;
      `;
    } else {
      return ``;
    }
  }}
`;

export const Row = ({
  children,
  theme = "normal",
}: {
  children: React.ReactNode;
  theme: "primary" | "normal";
}) => {
  return <StyledRow theme={theme}>{children}</StyledRow>;
};

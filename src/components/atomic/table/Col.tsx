import styled from "@emotion/styled";

const StyledCol = styled.td<{ theme: "normal" | "primary" }>`
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

        // gap: 10px;

        // width: 100px;
        // height: 104px;

        /* White (Text-Invert) */

        background: #FFFFFF;
        /* Border-Gray */

        border: 1px solid #E1E5E7;

        /* Inside auto layout */

        flex: none;
        order: 0;
        align-self: stretch;
        flex-grow: 0;
      `;
    } else if (theme === "primary") {
      return `
        box-sizing: border-box;

        /* Auto layout */

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;

        // gap: 10px;

        // width: 100px;
        // height: 104px;

        /* White (Text-Invert) */

        background: #ffffff;
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

export const Col = ({
  children,
  theme = "normal",
  handler,
}: {
  children: React.ReactNode;
  theme: "normal" | "primary";
  handler: () => void;
}) => {
  return (
    <StyledCol theme={theme} onClick={handler}>
      {children}
    </StyledCol>
  );
};

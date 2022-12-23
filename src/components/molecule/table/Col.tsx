import styled from "@emotion/styled";

const StyledCol = styled.td`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 10px;

  width: 100px;
  height: 104px;

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

export const Col = ({ content }: { content: React.ReactNode }) => {
  return <StyledCol>{content}</StyledCol>;
};

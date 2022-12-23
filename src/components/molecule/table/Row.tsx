import styled from "@emotion/styled";

const StyledRow = styled.tr`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 10px;

  width: 1814px;
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

export const Row = ({ content }: { content: React.ReactNode }) => {
  return <StyledRow>{content}</StyledRow>;
};

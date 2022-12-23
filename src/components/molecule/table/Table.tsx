import styled from "@emotion/styled";

const StyledTable = styled.table``;

export const Table = ({
  head,
  body,
}: {
  head: React.ReactNode;
  body: React.ReactNode;
}) => {
  return (
    <StyledTable>
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </StyledTable>
  );
};

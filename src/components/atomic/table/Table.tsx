import styled from "@emotion/styled";
import { Col } from "./Col";
import { Row } from "./Row";

const StyledTable = styled.table`
  position: relative;
  width: 100%;
`;

interface Props {
  head: { title: string; node: React.ReactNode };
  body: any;
  children: React.ReactNode;
}

export const Table = ({ head, body, children }: Props) => {
  console.log(children);
  return (
    <StyledTable>
      <thead>
        <Row theme="primary">
          <th>{head?.title || ""}</th>
        </Row>
      </thead>
      <tbody>
        {body?.rows?.length &&
          body.rows.map((row, rowIdx) => {
            return (
              <Row theme={row.theme} key={`row-${rowIdx}`}>
                {row.cols.map((col, colIdx) => {
                  return (
                    <Col
                      theme={col.theme}
                      key={`col-${colIdx}`}
                      handler={col.handler}
                    >
                      {col.content}
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        {children}
      </tbody>
    </StyledTable>
  );
};

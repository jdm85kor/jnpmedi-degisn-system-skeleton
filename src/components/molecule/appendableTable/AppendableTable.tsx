import React, { useState } from "react";
import styled from "@emotion/styled";
import { Table } from "../../atomic/table/Table";
import { Row } from "../../atomic/table/Row";
import { Col } from "../../atomic/table/Col";

const StyledButton = styled.button`
  display: flex;
  width: 100%;
  background: skyblue;

  & > span {
  }
`;

interface Props {
  head: { title: string; node: React.ReactNode };
  body: any;
  children: React.ReactNode;
}

export const AppendableTable = ({ head, body }: Props) => {
  const [appendRow, setAppendRow] = useState([]);

  const handleClick = () => {
    window.alert("새로운 row 추가, props에 추가하거나 children에 추가");
    setAppendRow((prev) => {
      return prev.concat({
        theme: "normal",
        cols: [
          {
            theme: "normal",
            content: "추가된 row의 td이요",
            handler: () => {
              window.alert("no alpha");
            },
          },
          {
            theme: "normal",
            content: "추가된 row의 td이요",
            handler: () => {
              window.alert("no alpha");
            },
          },
          {
            theme: "normal",
            content: "추가된 row의 td이요",
            handler: () => {
              window.alert("no alpha");
            },
          },
        ],
      });
    });
  };
  return (
    <Table head={head} body={body}>
      <>
        {appendRow.map(({ cols, theme }, rowIdx) => {
          return (
            <Row theme={theme} key={`append-${rowIdx}`}>
              {cols.map((col, colIdx) => {
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
        <StyledButton type="button" onClick={handleClick}>
          <span>추가</span>
        </StyledButton>
      </>
    </Table>
  );
};

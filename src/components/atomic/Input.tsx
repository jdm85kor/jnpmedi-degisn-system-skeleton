import React from "react";
import styled from "@emotion/styled";

const StyledDiv = styled.div<{ primary: boolean; size: string }>`
  & > input {
    border-color: ${(props) => (props.primary ? "blue" : props.color)};
    height: ${(props) => (props.size === "large" ? "100px" : "20px")};
  }
`;

export const Input = ({ primary, size }) => {
  return (
    <StyledDiv primary={primary} size={size} color="red">
      <input />
    </StyledDiv>
  );
};

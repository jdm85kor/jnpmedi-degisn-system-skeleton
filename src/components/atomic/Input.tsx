import styled from "@emotion/styled";

const StyledDiv = styled.div<{
  primary: boolean;
  size: "large" | "small";
  color: string;
}>`
  & > input {
    border-color: ${(props) => (!!props.primary ? "blue" : props.color)};
    height: ${(props) => (props.size === "large" ? "100px" : "20px")};
  }
`;

interface InputProps {
  primary: boolean;
  size: "large" | "small";
}

export const Input = ({ primary, size = "small" }: InputProps) => {
  return (
    <StyledDiv primary={primary} size={size} color="red">
      <input />
    </StyledDiv>
  );
};

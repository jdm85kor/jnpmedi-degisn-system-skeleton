import styled from "@emotion/styled";

const StyledButton = styled.button<{ align?: "left" | "center" | "right" }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ align = "center" }) => align};
  padding: 0px 16px;
  align-items: center;
  box-sizing: border-box;
  background: #259ac5;
  color: #ffffff;
  gap: 8px;
  border: 1px solid #259ac5;
  border-radius: 2px;
  width: 200px;
  height: 50px;

  & > div {
  }
`;

interface ButtonProps {
  title: string;
  align: "LEFT" | "CENTER" | "RIGHT";
  disabled: boolean;
}

export const Button = ({ title, disabled }: ButtonProps) => {
  return (
    <StyledButton align={"right"} disabled={disabled}>
      {title}
    </StyledButton>
  );
};

import React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../theme";

const flowUP = keyframes`
    from{
        opacity: 0;
        transform: translateY(20px);
    }

    to{
        opacity: 1;
        transform: translateY(0px);
    }
`;

const DaysAheadContainer = styled.div`
  animation: ${flowUP} 0.5s linear 250ms forwards;
  opacity: 0;
  display: flex;
  background-color: ${theme.colors.white};
  /* width: 10%; */
  height: 5rem;
  border-radius: 1rem;
  margin: 0.5rem 1rem;
  padding: 1rem;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.05);
  label {
    font-weight: 500;
    font-size: 2rem;
  }
`;

export const DaysAheadForCast = () => {
  return <DaysAheadContainer>here be dragons</DaysAheadContainer>;
};

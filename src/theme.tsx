import React from "react";
import { DefaultTheme, keyframes } from "styled-components";
export const theme: DefaultTheme = {
  colors: {
    white: "white",
    black: "black",
    main: "#F2C760",
    secondary: "#F2A260",
  },
};

export const flowUP = keyframes`
from{
    opacity: 0;
    transform: translateY(20px);
}

to{
    opacity: 1;
    transform: translateY(0px);
}
`;

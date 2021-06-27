import React from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  size?: string;
}
interface ILoaderProps {
  size?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderStyle = styled.div<ILoaderProps>`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: ${(props) => (props.size ? props.size : "75px")};
  height: ${(props) => (props.size ? props.size : "75px")};
  margin: auto;
  animation: ${spin} 2s linear infinite;
`;

export const Loader = ({ size }: IProps) => {
  return <LoaderStyle size={size} />;
};

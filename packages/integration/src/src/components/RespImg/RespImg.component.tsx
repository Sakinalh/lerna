import styled from "styled-components";

export interface ResponsiveImgProps {
    maxHeight: number;
}

export const ResponsiveImg = styled.img<ResponsiveImgProps>`
  height: auto;
  max-width: 100%;
  max-height: ${(props: any) => props.maxHeight}rem;
`;

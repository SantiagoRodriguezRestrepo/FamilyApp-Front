import { Button } from 'react-bootstrap';
import {
  ColorDanger,
  ColorHoverDanger,
  ColorHoverPrimary,
  ColorPrimary,
  ColorWhite,
} from '../style';
import styled from 'styled-components';

export const Logo = styled.img`
  width: 64px;
  height: 64px;
`;

export const ContentArea = styled.div`
  padding: 0;
  min-width: 204px;
  height: 100%;
`;

export const ButtonCustom = styled(Button)`
  background-color: ${({ color }) =>
    (color === 'primary' && ColorPrimary) ||
    (color === 'danger' && ColorDanger)};
  color: ${ColorWhite};
  border: none;
  &:hover {
    color: ${ColorWhite};
    background-color: ${({ color }) =>
      (color === 'primary' && ColorHoverPrimary) ||
      (color === 'danger' && ColorHoverDanger)};
    border: none;
  }
  &:active {
    color: ${ColorWhite} !important;
    background-color: ${({ color }) =>
      (color === 'primary' && ColorHoverPrimary) ||
      (color === 'danger' && ColorHoverDanger)} !important;
    border: none !important;
  }
`;

export const Card = styled.div`
  box-shadow: 0px 5px 22px rgba(0, 0, 0, 0.04),
    0px 0px 0px 0.5px rgba(0, 0, 0, 0.03);
  background-color: #fff;
  color: #111927;
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 8px;
  overflow: hidden;
  border-radius: 20px;
  padding: 32px 24px;
`;

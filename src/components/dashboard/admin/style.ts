import { Col, Container, Nav, Offcanvas } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import {
  BgColorDark,
  ColorGray60,
  ColorPrimary,
  ColorWhite,
} from '../../../theme/style';
import styled from 'styled-components';

export const MainContainer = styled(Container)``;

export const MenuIcon = styled(FaBars)`
  font-size: 28px;
  color: #fff;
  margin: 20px;
  cursor: pointer;

  @media screen and (min-width: 1200px) {
    display: none;
  }
`;

export const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
`;

export const Name = styled.h3`
  font-size: 24px;
  margin: 20px 0;
`;

export const Option = styled(Nav.Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  color: ${ColorGray60};

  &.option-active {
    background-color: rgba(255, 255, 255, 0.04);
    color: ${ColorWhite};
  }

  &.option-active svg {
    color: ${ColorPrimary};
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
    color: ${ColorGray60};
  }
`;

export const ColRight = styled(Col)`
  background-color: #f8f9fc;

  @media screen and (min-width: 1200px) {
    padding-left: 350px;
  }
`;

export const ColLeft = styled(Col)`
  background-color: ${BgColorDark};
  position: fixed;
  height: 100%;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

export const BodyCanvas = styled(Offcanvas.Body)`
  background-color: ${BgColorDark};
  height: 100%;

  div {
    @media screen and (max-width: 1200px) {
      height: calc(100% - 100px);
    }
  }
`;

import { Container } from 'react-bootstrap';

import styled from 'styled-components';
import { IStyleResponsive } from '../../utils/interfaces';
import { BgColorDark } from '../../theme/style';

export const MainContainer = styled(Container)`
  background-color: ${BgColorDark};
`;

export const LogoContainer = styled.div<IStyleResponsive>`
  width: 100%;
  display: flex;
  gap: 1.5rem;
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: #2e72ac;
  color: white;

  @media screen and (max-width: 920px) {
    height: 80px;
  }
`;

export const LoginContainer = styled.div<IStyleResponsive>`
  height: calc(100vh - 100px);
  display: flex;
  width: 100%;

  @media screen and (max-width: 920px) {
    height: calc(100vh - 80px);
    display: flex
    align-items: center;
  }
`;

export const RowLogin = styled.div<IStyleResponsive>`
  @media screen and (max-width: 920px) {
    flex-direction: column;
  }
`;

export const SearchContainer = styled.div<IStyleResponsive>`
  @media screen and (max-width: 920px) {
    flex-direction: column;
  }
`;

export const Hr = styled.hr<IStyleResponsive>`
  border: none;
  border-left: 1px solid white;
  height: 80%;
  width: 1px;

  @media screen and (max-width: 920px) {
    border-top: 1px solid white;
    height: 1px;
    width: 80%;
  }
`;

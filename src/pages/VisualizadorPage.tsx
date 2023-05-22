import React from 'react';
import { VisualizadorDashboard } from '../components/visualizador/VisualizadorDashboard';
import { TPropsVisualizadorParam } from '../utils/types';

export const VisualizadorPage = ({ idRecluse }: TPropsVisualizadorParam) => {
  return <VisualizadorDashboard idRecluse={idRecluse} />;
};

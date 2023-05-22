import React, { useEffect, useRef, useState } from 'react';
import { TPropsRecluseRecord } from '../../../utils/types';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { Container } from 'react-bootstrap';
import { formatDateString } from '../../../utils/functions';

export const View: React.FC<TPropsRecluseRecord> = ({
  titulo,
  urlImagen,
  comentario,
  fecha,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagePath, setImagePath] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (urlImagen) {
      const imagePath = urlImagen.substring(urlImagen.lastIndexOf('\\') + 1);
      setImagePath(`/img/${imagePath}`);
    }
  }, [urlImagen]);
  return (
    <Container>
      <div className="text-center mb-5">
        <h1>{titulo}</h1>
        <b>{formatDateString(fecha!)}</b>
      </div>
      <p className="mb-5">{comentario}</p>
      {urlImagen && imagePath && (
        <div ref={containerRef}>
          <ReactPhotoSphereViewer
            key={imagePath}
            src={imagePath}
            height={'80vh'}
            width={'100%'}
            container={containerRef.current!}
            minFov={70}
          />
        </div>
      )}
    </Container>
  );
};

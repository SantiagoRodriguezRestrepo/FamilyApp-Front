import { Modal } from 'react-bootstrap';
import { TPropsPopUpImage } from '../../../../../../utils/types';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { useRef } from 'react';

export const PopUpImage = ({ showModal, setShowModal }: TPropsPopUpImage) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={containerRef}>
            <ReactPhotoSphereViewer
              src="/img/panoramica.avif"
              height={'80vh'}
              width={'100%'}
              container={containerRef.current!}
              minFov={70}
            />
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

import { Modal } from 'react-bootstrap';
import { PropsPopUpImage } from '../../../../../../utils/types';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { useRef } from 'react';

export const PopUpImage = ({ showModal, setShowModal }: PropsPopUpImage) => {
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
              src="https://images.unsplash.com/photo-1557971370-e7298ee473fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2320&q=80"
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

import { Modal } from 'react-bootstrap';
import { TPropsPopUpImage } from '../../../../../../utils/types';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { useRef } from 'react';

export const PopUpImage = ({
  showModal,
  setShowModal,
  image,
}: TPropsPopUpImage) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagePath = image.substring(image.lastIndexOf('\\') + 1);
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={containerRef}>
            <ReactPhotoSphereViewer
              src={`/img/${imagePath}`}
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

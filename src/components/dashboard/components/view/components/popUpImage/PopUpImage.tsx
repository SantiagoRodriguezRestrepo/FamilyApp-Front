import { Modal } from 'react-bootstrap';
import { PropsPopUpImage } from '../../../../../../utils/types';

export const PopUpImage = ({ showModal, setShowModal }: PropsPopUpImage) => {
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ isOpen, setIsOpen, handleDelete }) => {
  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Excluir Tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body className="w-100 text-center">
        Tem certeza que deseja excluir esta tarefa?
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          variant="danger"
          onClick={() => {
            handleDelete();
            setIsOpen(false);
          }}
        >
          Excluir
        </Button>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

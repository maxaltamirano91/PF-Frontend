import { Modal } from 'react-bootstrap'

const ModalComponent = ({ show, handleClose, content, size, centered }) => {
	return (
		<Modal show={show} onHide={handleClose} size={size} centered={centered}>
			<Modal.Body>{content}</Modal.Body>
		</Modal>
	)
}
export default ModalComponent

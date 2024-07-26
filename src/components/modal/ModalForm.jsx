import React from 'react'
import ReactModal from 'react-modal'
import './ModalForm.css'

ReactModal.setAppElement('#root')

const ModalForm = ({ isOpen, onRequestClose, children }) => {
	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="modal"
			overlayClassName="overlay"
			ariaHideApp={false}
		>
			<button className="close-button" onClick={onRequestClose}>
				&times;
			</button>
			{children}
		</ReactModal>
	)
}

export default ModalForm
import React from 'react'
import { Modal } from 'react-bootstrap'

function CustomModal(props) {
    const { children,
        footerComponent,
        title,
        closeModal,
        ...rest } = props
    return (
        <Modal  onHide={closeModal}  {...rest} >
            <Modal.Header >
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>{footerComponent}</Modal.Footer>
        </Modal>
    )
}

export default CustomModal
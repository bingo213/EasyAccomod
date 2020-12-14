import React from 'react'
import Modal from 'react-modal';

function Modal({component}) {
    const [modalIsOpden, setModelIsOpen] = useState(false);
    return (
        <Modal
        isOpen={modalIsOpden}
        onRequestClose={() => setModelIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: '#262525ad',
            zIndex: 10,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            width: '90vw',
            maxWidth: '60rem',
            maxHeight: '100vh',
            margin: 'auto',
          },
        }}
        className="modal"
      >
        <i
          className="fal fa-times"
          onClick={() => setModelIsOpen(false)}
        ></i>
        {component}
      </Modal>
    )
}

export default Modal

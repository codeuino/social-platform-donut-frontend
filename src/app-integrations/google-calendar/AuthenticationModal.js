import React from 'react';
import GoogleButton from 'react-google-button';
import { Modal, Row } from 'react-bootstrap';

const AuthenticationModal = () => {
  return (
    <Modal
      show={true}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <div className='container'>
        <Modal.Header className='heading border border-0 p-0'>
          <Modal.Title id='contained-modal-title-vcenter'>
            <div className='title'>Authentication Required</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='form-content'>
            <a
              href='http://localhost:8000/oauth/google'
              style={{ textDecoration: 'none' }}
            >
              <div>
                <GoogleButton style={{ marginLeft: '100px' }} />
              </div>
            </a>
          </Row>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AuthenticationModal;

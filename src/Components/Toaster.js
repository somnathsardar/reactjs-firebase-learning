import React from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';

const Toaster = (props) => {
  const getToastType = (type)=> {
    if(type === 'Success') return 'success';
    else if(type === 'Error') return 'danger';
    else if(type === 'Warning') return 'warning'
    else return 'light'
  }

  return (
    <div>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg={getToastType(props.toastType)}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto"></strong>
            <small className="text-muted"></small>
          </Toast.Header>
          <Toast.Body>{props.toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default Toaster

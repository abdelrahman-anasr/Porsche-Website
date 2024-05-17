import React from 'react';

function OrderSuccessModal({ showModal, closeModal }) {
  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Order Successful</h5>
          </div>
          <div className="modal-body">
            <p>Your order has been successfully placed!</p>
            <p>Thank you for choosing Porsche®</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessModal;

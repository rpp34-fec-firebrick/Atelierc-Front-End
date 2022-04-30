import React from 'react';
import { ComparisonTable } from './ComparisonTable.js';

const Modal = ({ handleClose, show, prodCharaData }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h1 className="modal-title">Comparing</h1>
        <ComparisonTable prodCharaData={prodCharaData} />
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export { Modal };

import React from 'react';
import './Modal.css';
import html2canvas from 'html2canvas';

const Modal = ({ isVisible, onClose, children }: { isVisible: boolean; onClose: () => void; children: React.ReactNode }) => {
  const handleSaveCard = () => {
    const userCard: HTMLElement | null = document.querySelector('.user-info-modal');
    if (userCard) {
      html2canvas(userCard, {
        useCORS: true,
        backgroundColor: null,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'user-card.png';
        link.click();
      });
    }
  };

  if (!isVisible) return null;

  const handleSaveButtonClick = () => {
    handleSaveCard();
    onClose();
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>
          &times;
        </button>
        {children}
        <button className='save-button' onClick={handleSaveButtonClick}>
          Save user card
        </button>
      </div>
    </div>
  );
};

export default Modal;

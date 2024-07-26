import { useState } from 'react';
import Modal from './Modal';
import { UserInformation } from './types';

export const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <span style={{ marginRight: 5 }}>
        <b>{label}:</b>
      </span>
      <span>{value}</span>
    </div>
  );
};

export const ProfileInformation = ({ userData }: { userData: UserInformation | null }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (!userData) {
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className='user-info'>
          <div>No information provided</div>
        </div>
      </>
    );
  }

  const { email, firstName, lastName, phone, city } = userData;
  return (
    <>
      <u>
        <h3>Your Submitted User Information</h3>
      </u>
      <div className='user-info' onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
        <div className='overlay'>Click to save your card</div>
        <InfoRow label='Email' value={email} />
        <InfoRow label='First Name' value={firstName} />
        <InfoRow label='Last Name' value={lastName} />
        <InfoRow label='City' value={city} />
        <InfoRow label='Phone' value={phone} />
      </div>
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className='user-info user-info-modal'>
          <InfoRow label='Email' value={email} />
          <InfoRow label='First Name' value={firstName} />
          <InfoRow label='Last Name' value={lastName} />
          <InfoRow label='City' value={city} />
          <InfoRow label='Phone' value={phone} />
        </div>
      </Modal>
    </>
  );
};

import { useState } from 'react';
import { ProfileInformation } from '../ProfileInformation';
import { FunctionalForm } from './FunctionalForm';
import { UserInformation } from '../types';

export const FunctionalApp = () => {
  const [userData, setUserData] = useState<UserInformation | null>(null);
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} />
      <FunctionalForm setUserData={setUserData} />
    </>
  );
};

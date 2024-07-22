import { Component } from 'react';
import { ProfileInformation } from '../ProfileInformation';
import { ClassForm } from './ClassForm';
import { UserInformation } from '../types';

type ClassAppState = {
  userData: UserInformation | null;
};

export class ClassApp extends Component<Record<string, never>, ClassAppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      userData: null,
    };
  }

  setUserData = (userData: UserInformation) => {
    this.setState({ userData: userData });
  };

  render() {
    const { userData } = this.state;
    return (
      <>
        <h2>Class-based</h2>
        <ProfileInformation userData={userData} />
        <ClassForm setUserData={this.setUserData} />
      </>
    );
  }
}

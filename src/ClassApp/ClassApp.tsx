import { Component } from 'react';
import { ProfileInformation } from '../ProfileInformation';
import { ClassForm } from './ClassForm';
import { UserInformation } from '../types';

type ClassAppState = {
  userData: UserInformation | null;
};

export class ClassApp extends Component<ClassAppState> {
  constructor(classProps: ClassAppState) {
    super(classProps);
    this.state = {
      userData: null,
    };
  }

  setUserData = (userData: UserInformation | null) => {
    this.setState({ userData });
  };

  render() {
    return (
      <>
        <h2>Class-based</h2>
        <ProfileInformation userData={this.props.userData} />
        <ClassForm setUserData={this.setUserData} />
      </>
    );
  }
}

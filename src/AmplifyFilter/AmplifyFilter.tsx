import React from 'react';
// import { useSelector } from 'react-redux';
import { Filter } from 'react-admin';

export const AmplifyFilter: React.FC = props => {
  // const nextToken = useSelector<any>(state => state.nextToken);
  return <Filter {...props}></Filter>;
};

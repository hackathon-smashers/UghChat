import { TargetUserContext } from '../app/providers';
import { useContext } from 'react';

export const useTargetUser = () => {
  const data = useContext(TargetUserContext);

  return data as any;
};
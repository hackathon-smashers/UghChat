import { DatabaseContext } from '../app/providers';
import { useContext } from 'react';

export const useDatabase = () => {
  const data = useContext(DatabaseContext);

  return data;
};
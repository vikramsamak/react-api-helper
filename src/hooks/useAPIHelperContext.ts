import { useContext } from 'react';
import { ApiHelperContext } from '../contexts/ApiHelperProvider';

export const useApiHelperContext = () => {
  const context = useContext(ApiHelperContext);
  if (!context) {
    throw new Error('useAPIHelper must be used within APIHelperProvider');
  }
  return context;
};

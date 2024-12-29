import React from 'react';
import { QueryClientConfig } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

export interface ApiHelperProviderProps {
  baseURL: string;
  axiosConfig?: AxiosRequestConfig;
  queryClientConfig?: QueryClientConfig;
  children: React.ReactNode;
}

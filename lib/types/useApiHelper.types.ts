import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { HTTPMethod } from './GenericTypes';

export interface useApiHelperProps<
  responseType,
  errorType,
  payloadType = unknown,
> extends Omit<
    UseQueryOptions<responseType, errorType, responseType>,
    'queryKey' | 'queryFn'
  > {
  url: string;
  params?: Record<string, unknown>;
  data?: payloadType;
  queryKey?: QueryKey;
  axiosOptions?: AxiosRequestConfig;
  method: HTTPMethod;
  onSuccess?: (data: responseType) => void;
  onError?: (error: errorType) => void;
}

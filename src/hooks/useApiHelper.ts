import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiHelperResult, useApiHelperProps } from '../types';
import { apiRequest } from '../utils';
import { useApiHelperContext } from './useApiHelperContext';

export function useApiHelper<
  responseType = unknown,
  errorType = unknown,
  payloadType = unknown,
>({
  url,
  params,
  queryKey = [],
  axiosOptions,
  method,
  onSuccess,
  onError,
  ...rest
}: useApiHelperProps<responseType, errorType, payloadType>): ApiHelperResult<
  responseType,
  errorType,
  payloadType
> {
  const { axiosInstance } = useApiHelperContext();

  const queryResult = useQuery<responseType, errorType>({
    queryKey: queryKey || [],
    queryFn: async () =>
      await apiRequest<responseType, errorType>(axiosInstance, 'GET', url, {
        params,
        ...axiosOptions,
      }),
    enabled: method === 'GET',
    ...rest,
  });

  const mutationResult = useMutation<responseType, errorType, payloadType>({
    mutationFn: async (payload: payloadType) =>
      await apiRequest<responseType, errorType>(axiosInstance, method, url, {
        data: payload,
        params,
        ...axiosOptions,
      }),
    onSuccess,
    onError,
  });

  return method === 'GET' ? queryResult : mutationResult;
}

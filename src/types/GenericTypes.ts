import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiHelperResult<responseType, errorType, payloadType> =
  | UseQueryResult<responseType, errorType>
  | UseMutationResult<responseType, errorType, payloadType>;

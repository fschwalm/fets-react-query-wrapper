import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";

export type HasGetMethod<T> = {
  [K in keyof T]: T[K] extends { get: (...args: any[]) => any } ? K : never;
}[keyof T];

// Type for extracting the arguments type of the 'get' method
export type ExtractArgsType<T, K extends keyof T> = T[K] extends {
  get: (args: infer J) => any;
}
  ? J
  : never;

// Helper type to check if a function has required parameters
export type HasRequiredParams<T extends (...args: any[]) => any> =
  Parameters<T> extends [any, ...any[]] ? true : false;

export type GetMethodJsonBodyType<T, K extends keyof T> = T[K] extends {
  get: (...args: any[]) => Promise<{ json: () => Promise<infer R> }>;
}
  ? R
  : never;

// ResourceProps type with conditional 'args' prop
export type ResourceProps<T, K extends HasGetMethod<T>> = {
  path: K;
  client: T;
  config?: Omit<
    UseQueryOptions<GetMethodJsonBodyType<T, K>, ExtractArgsType<T, K>>,
    "queryFn" | "queryKey"
  >;
  render: (
    data: UseQueryResult<GetMethodJsonBodyType<T, K>, ExtractArgsType<T, K>>
  ) => ReactNode;
  // @ts-ignore
} & (HasRequiredParams<T[K]["get"]> extends true
  ? { args: ExtractArgsType<T, K> }
  : { args?: ExtractArgsType<T, K> });

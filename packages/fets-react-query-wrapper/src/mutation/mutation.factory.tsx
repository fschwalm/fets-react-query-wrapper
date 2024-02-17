import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type Client = {
  [resourcePath: string]: {
    post?: (args: any) => Promise<any>;
    patch?: (args: any) => Promise<any>;
    put?: (args: any) => Promise<any>;
    delete?: (args: any) => Promise<any>;
    get?: (args: any) => Promise<any>;
  };
};

type NonGetMethods = Exclude<keyof Client[string], "get">;

type MutationResourceKeys<T extends Client> = keyof T;

type MutationMethodNames<
  T extends Client,
  K extends MutationResourceKeys<T>
> = NonGetMethods & keyof T[K];

type MutationMethodInfo<
  T extends Client,
  K extends keyof T,
  M extends NonGetMethods
> = T[K][M] extends (args: infer Args) => Promise<infer ReturnType>
  ? [Args, ReturnType]
  : never;

export function createMutationHook<T extends Client>(client: T) {
  return <
    K extends MutationResourceKeys<T>,
    M extends MutationMethodNames<T, K>
  >(
    resource: K,
    method: M,
    options: UseMutationOptions<
      MutationMethodInfo<T, K, M>[1],
      Error,
      MutationMethodInfo<T, K, M>[0]
    > = {}
  ) => {
    type ArgsType = MutationMethodInfo<T, K, M>[0];
    type ReturnType = MutationMethodInfo<T, K, M>[1];

    // @ts-ignore
    const mutationFn = (args: ArgsType) => client[resource][method](args);

    return useMutation<ReturnType, Error, ArgsType>(mutationFn, options);
  };
}

import { ComponentType, ReactNode, Suspense } from "react";
import { Resource } from "./resource";
import { HasGetMethod, ResourceProps } from "./resource.types";

type ResourceFactoryData<T> =
  | {
      client: T;
      suspense: true;
      loader: ReactNode;
      errorBoundary?: ComponentType<{ children: React.ReactNode }>;
    }
  | {
      client: T;
      suspense?: false;
      loader?: never;
      errorBoundary?: ComponentType<{ children: React.ReactNode }>;
    };

export function createResource<T>({
  client,
  loader,
  suspense,
  errorBoundary: ErrorBoundary,
}: ResourceFactoryData<T>) {
  return function ResourceComponent<K extends HasGetMethod<T>>(
    props: Omit<ResourceProps<T, K>, "client">
  ) {
    let content: React.ReactElement = (
      // @ts-ignore
      <Resource<T, K> client={client} {...props} />
    );

    if (suspense && ErrorBoundary) {
      return (
        <ErrorBoundary>
          <Suspense fallback={loader!}>{content} </Suspense>
        </ErrorBoundary>
      );
    }

    if (suspense) {
      content = <Suspense fallback={loader!}>{content}</Suspense>;
    }

    if (ErrorBoundary && !suspense) {
      return <ErrorBoundary>{content}</ErrorBoundary>;
    }

    return content;
  };
}

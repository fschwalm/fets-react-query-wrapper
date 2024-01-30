import { Resource } from "./resource";
import { HasGetMethod, ResourceProps } from "./resource.types";

export function createResource<T>({ client }: { client: T }) {
  return function ResourceComponent<K extends HasGetMethod<T>>(
    props: Omit<ResourceProps<T, K>, "client">
  ) {
    // @ts-ignore
    return <Resource<T, K> client={client} {...props} />;
  };
}

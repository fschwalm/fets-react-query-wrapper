import { useQuery } from "@tanstack/react-query";
import {
  ExtractArgsType,
  GetMethodJsonBodyType,
  HasGetMethod,
  ResourceProps,
} from "./resource.types";

function Resource<T, K extends HasGetMethod<T>>({
  path,
  client,
  render,
  args,
  config = {},
}: ResourceProps<T, K>) {
  const queryResult = useQuery<
    GetMethodJsonBodyType<T, K>,
    ExtractArgsType<T, K>
  >({
    queryKey: [path, args],
    queryFn: async () => {
      // @ts-ignore
      const response = await client[path].get(args);
      return response.json();
    },
    ...config,
  });

  return render(queryResult);
}

export { Resource };

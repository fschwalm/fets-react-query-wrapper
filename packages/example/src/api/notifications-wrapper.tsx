import { createResource } from "fets-react-query-wrapper";
import { CustomErrorBoundary } from "../CustomErrorBoundary";
import { NotificationsClient } from "./notifications-client";

export const NotificationsResource = createResource({
  client: NotificationsClient,
  errorBoundary: CustomErrorBoundary,
  suspense: true,
  loader: <p>Loading...</p>,
});

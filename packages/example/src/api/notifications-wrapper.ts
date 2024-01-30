import { createResource } from "fets-react-query-wrapper";
import { NotificationsClient } from "./notifications-client";

export const NotificationsResource = createResource({
  client: NotificationsClient,
});

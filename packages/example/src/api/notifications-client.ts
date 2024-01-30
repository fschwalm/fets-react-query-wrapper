import { createClient, type NormalizeOAS } from "fets";

import type oas from "./oas";

export const NotificationsClient = createClient<NormalizeOAS<typeof oas>>({
  endpoint: "http://localhost:4799",
});

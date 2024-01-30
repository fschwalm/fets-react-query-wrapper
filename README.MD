# fets-react-query-wrapper

A React wrapper for [react-query](https://github.com/tanstack/query) and [fets](https://github.com/ardatan/fets) library.

Make HTTP requests without effort and typed-safe based on OpenApi.

## Requirements

You must have `react-query@4` and `fets` installed on your app.

```sh
# pnpm
pnpm add react-query@4 fets
```

## Getting started

```sh
# pnpm
pnpm add fets-react-query-wrapper
```

## Configuration

```js
import { createClient, type NormalizeOAS } from "fets";

import type oas from "./oas";

export const NotificationsClient =
  createClient <
  NormalizeOAS <
  typeof oas >>
    {
      endpoint: "http://localhost:4799",
    };
```

#### `createResource` to create a Resource Component

```js
import { createResource } from "fets-react-query-wrapper";
import { NotificationsClient } from "./notifications-client";

export const NotificationsResource = createResource({
  client: NotificationsClient,
});
```

## Usage

```js
import { NotificationsResource } from "./api/notifications-wrapper";

function App() {
  return (
    <NotificationsResource
      path="/notifications"
      render={({ data }) => {
        return (
          <ul>
            {data?.notifications?.map((notification) => (
              <li key={notification.id}>{notification.titulo}</li>
            ))}
          </ul>
        );
      }}
    ></NotificationsResource>
  );
}

export default App;
```

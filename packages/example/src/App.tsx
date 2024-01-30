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

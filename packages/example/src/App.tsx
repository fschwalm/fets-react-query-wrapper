import { useQueryClient } from "@tanstack/react-query";
import {
  NotificationsResource,
  useNotificationsMutations,
} from "./api/notifications-wrapper";

function App() {
  const { mutate: deleteByID } = useNotificationsMutations(
    "/notifications/{id}",
    "delete"
  );
  const queryClient = useQueryClient();

  function handleDelete(id: string) {
    deleteByID(
      { params: { id } },
      {
        onSuccess() {
          console.log("deleted!");

          queryClient.invalidateQueries({ queryKey: ["/notifications"] });
        },
        onError() {
          console.log("delete error");
        },
      }
    );
  }

  return (
    <NotificationsResource
      path="/notifications"
      render={({ data }) => {
        return (
          <ul>
            {data?.notifications?.map((notification) => (
              <li key={notification.id}>
                {notification.titulo}{" "}
                <button onClick={() => handleDelete(notification.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        );
      }}
    ></NotificationsResource>
  );
}

export default App;

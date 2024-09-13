import { AddUser } from "../utils/add-user"
import { EditUser } from "../utils/edit-user"
import { useDeleteUserMutation, useGetUsersQuery } from "./users.api"

export const Users = () => {
  const { data, isLoading, error } = useGetUsersQuery(null)
  const [deleteUser, result] = useDeleteUserMutation()

  return (
    <>
      <h3>Users</h3>
      <AddUser />
      <EditUser />
      {isLoading && (
        <img src="https://media3.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif?cid=6c09b952feadosmj0ulmjbwm8nh13xrkp3bpcfezcwdr7i7v&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
      )}
      {data &&
        data.map(user => (
          <div key={user.id}>
            <p>
              {user.name} with {user.salary} AMD
            </p>
            <button
              onClick={() => deleteUser(user.id)}
              style={{
                border: "1px solid grey",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
    </>
  )
}

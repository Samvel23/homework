import { useState } from "react"
import { IUser } from "../users/types"
import { useGetUsersQuery, useUpdateUserMutation } from "../users/users.api"

export const EditUser = () => {
  const { data } = useGetUsersQuery(null)
  const [user, setUser] = useState<IUser>({ id: "", name: "", salary: 0 })
  const [updateUser, result] = useUpdateUserMutation()
  const [open, setOpen] = useState<boolean>(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateUser(user).then(res => {
      setOpen(false)
      setUser({ id: "", name: "", salary: 0 })
    })
  }
  const handleEditClick = (selectedUser: IUser) => {
    setUser(selectedUser)
  }
  return (
    <>
      {data?.map(item => (
        <div key={item.id}>
          <span>
            {item.name} - {item.salary}
          </span>
          <button
            onClick={() => {
              setOpen(!open)
              handleEditClick(item)
            }}
            style={{
              border: "1px solid grey",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Edit
          </button>
        </div>
      ))}
      {open && (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", justifyContent: "center", gap: "10px" }}
        >
          <input
            type="text"
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
          />

          <input
            type="number"
            value={user.salary}
            onChange={e => setUser({ ...user, salary: +e.target.value })}
          />

          <button type="submit">Update</button>
        </form>
      )}
    </>
  )
}

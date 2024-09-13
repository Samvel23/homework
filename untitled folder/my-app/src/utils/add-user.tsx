import { useState } from "react"
import { InputUser } from "../users/types"
import { useAddUserMutation } from "../users/users.api"

export const AddUser = () => {
  const [user, setUser] = useState<InputUser>({ name: "", salary: 0 })
  const [addUser, result] = useAddUserMutation()
  const [open, setOpen] = useState<boolean>(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addUser(user).then(res => {
      setUser({ name: "", salary: 0 })
    })
  }
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          border: "1px solid grey",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Add User
      </button>
      {open && (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", justifyContent: "center", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Please Enter a Name"
            value={user.name}
            onChange={event => setUser({ ...user, name: event.target.value })}
          />
          <input
            type="number"
            step={20000}
            placeholder="Please Enter a Salary"
            value={user.salary}
            onChange={event =>
              setUser({ ...user, salary: +event.target.value })
            }
          />
          <button>Save</button>
        </form>
      )}
    </>
  )
}

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { InputUser, IUser } from "./types"

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004" }),
  tagTypes: ["Users"],
  endpoints: builder => ({
    getUsers: builder.query<IUser[], null>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    addUser: builder.mutation<IUser, InputUser>({
      query: param => ({
        url: "/users",
        method: "POST",
        body: param,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<IUser, string>({
      query: id => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<IUser, InputUser & { id: string }>({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
})

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } =
  usersApi

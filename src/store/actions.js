import { ADD, ASYNC_ADD } from "./action-types"

export const add = () => ({
  type: ADD,
})

export const asyncAdd = () => ({
  type: ASYNC_ADD,
})

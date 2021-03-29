import { ADD, MINUS, ASYNC_ADD, ASYNC_MINUS } from "./action-types";

export const add = () => ({
  type: ADD,
});

export const asyncAdd = () => ({
  type: ASYNC_ADD,
});

export const minus = () => ({
  type: MINUS,
});

export const asyncMinus = () => ({
  type: ASYNC_MINUS,
});

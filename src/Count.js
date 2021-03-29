import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, asyncAdd, minus, asyncMinus } from "./store/actions";

function Count() {
  const { num } = useSelector((state) => ({
    num: state.num,
  }));
  const dispatch = useDispatch();
  return (
    <div className="count">
      <p>{num}</p>
      <button onClick={() => dispatch(add())}>同步加1</button>
      <button onClick={() => dispatch(asyncAdd())}>异步加1</button>
      <button onClick={() => dispatch(minus())}>同步减1</button>
      <button onClick={() => dispatch(asyncMinus())}>异步减1</button>
    </div>
  );
}

export default Count;

import React, { useState } from "react";
import { changeMode } from "../../slice/DarkModeSlice";
import { useDispatch, useSelector } from "react-redux";

import "./Switch.css";

function Switch() {
  const dispatch = useDispatch();
  const mode = useSelector((state)=> state.mode.mode)

  const handleSwitch = () => {
    dispatch(changeMode())
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={mode} onChange={handleSwitch} />
      <span className="slider"></span>
    </label>
  );
}
export default Switch;

import { IoIosAdd } from "react-icons/io";
import { useState } from "react";

import "./inputAdd.css";
export function InputAdd({ valueDefault, action }) {
  const [variable, setVariable] = useState("");
  return (
    <>
      <input
        onChange={(event) => setVariable(event.target.value)}
        type="text"
        placeholder={valueDefault}
        value={variable}
      />
      <IoIosAdd
        size="35px"
        className="button_add"
        onClick={() => {
          action(variable);
          setVariable("");
        }}
      />
    </>
  );
}

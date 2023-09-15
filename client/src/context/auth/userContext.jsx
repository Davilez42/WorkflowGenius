import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [state, setState] = useState(false);

  return (
    <>
      <UserContext.Provider value={{ state, setState }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
}

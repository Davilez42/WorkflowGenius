import ReactDom from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/auth/userContext.jsx";
import "./App.css";

ReactDom.createRoot(document.getElementById("root")).render(
  <>
    <UserContextProvider>

      <App />

    </UserContextProvider>
  </>
);

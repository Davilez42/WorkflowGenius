import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loguin from "./components/auth/Loguin";
import Register from "./components/auth/Register";

const routes = (
  <Routes>
    < Route 
    path="/" 
    element={<Loguin />} 
    />

    < Route 
    path="/register"
    element={<Register />} 
    />

    < Route
      path="*"
      element={
        <div>
          <h1>Not found page</h1>
        </div>
      }
    />

  </Routes>
);
export default function App() {
  return (
    <>
      <BrowserRouter>{routes}</BrowserRouter>
    </>
  );
}

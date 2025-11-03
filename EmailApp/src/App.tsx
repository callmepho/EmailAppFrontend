import { Route, Routes } from "react-router";
import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import Login from "./components/pages/Login";
import Email from "./components/pages/Email";

function App() {
  return (
    <>
      <ModeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </>
  );
}

export default App;

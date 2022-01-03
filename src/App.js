import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import CustomLocation from "./Components/CustomLocation";
import WApp from "./App2";
import Notfound from "./Components/NotFound";

export default function App() {
  return (
    <div>
      <div className="text-4xl p-4 w-1/3 text-center mx-auto bg-green-100 ring-2 ring-green-400 m-4">
        Weather App
      </div>
      <Routes>
        <Route path="/" element={<WApp />}></Route>
        <Route
          path="/:city"
          element={<CustomLocation></CustomLocation>}
        ></Route>
        <Route path="*" element={<Notfound></Notfound>}></Route>
      </Routes>
    </div>
  );
}

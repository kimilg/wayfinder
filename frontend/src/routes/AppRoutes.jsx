import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import Recommend from "../pages/Recommend.jsx";
import Write from "../pages/Write.jsx";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/write" element={<Write />} />
      </Routes>
  )
}
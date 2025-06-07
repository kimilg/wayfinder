import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Recommend from "../pages/Recommend";
import Write from "../pages/Write";
import List from "../pages/List";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/write" element={<Write />} />
        <Route path="/list" element={<List />} />
      </Routes>
  )
}
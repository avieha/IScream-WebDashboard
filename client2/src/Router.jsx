import { Routes, Route } from "react-router-dom";
import Branches from "./pages/Branches";
import Flavors from "./pages/Flavors";

export default function Router() {
  return (
    <Routes>
    <Route path="/flavors" element={<Flavors />} />
    <Route path="/branches" element={<Branches />} />
  </Routes>
  )
}

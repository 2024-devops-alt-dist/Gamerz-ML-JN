import { JSX } from "react";
import { Route, Routes } from "react-router-dom";
import WebLayout from "./pages/web/WebLayout";
import Home from "./pages/web/Home";
import AppLayout from "./pages/app/AppLayout";
import Discover from "./pages/web/Discover";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<WebLayout />}>
        <Route index element={<Home />} />
        <Route path="discover" element={<Discover />} />
        <Route path="support" element={<div>Support</div>} />
        <Route path="careers" element={<div>Careers</div>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<div>Dashboard</div>} />
      </Route>
    </Routes>
  );
}

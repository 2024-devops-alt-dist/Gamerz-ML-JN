import { JSX } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import WebLayout from "./pages/web/WebLayout";
import Home from "./pages/web/Home";
import AppLayout from "./pages/app/AppLayout";
import ProtectedRoute from "./service/ProtectedRoute";
import Discover from "./pages/web/Discover";
import Support from "./pages/web/Support";
import Careers from "./pages/web/Careers";
import { ChatPage } from "./pages/app/ChatPage";

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route index element={<Home />} />
          <Route path="discover" element={<Discover />} />
          <Route path="support" element={<Support />} />
          <Route path="careers" element={<Careers />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>

        {/* Protected route */}
        <Route path="/app/" element={<AppLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<ChatPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import Search from "@pages/Search";
import LocationDetails from "@pages/LocationDetails";
import Settings from "@pages/Settings";
import NotFound from "@pages/NotFound";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { useEffect } from "react";
import { requestNotificationPermission, maybeNotifySevere } from "@utils/notifications";
import { useTheme } from "@hooks/useTheme";

export default function App() {
  const { theme } = useTheme();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    maybeNotifySevere();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/location/:id" element={<LocationDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

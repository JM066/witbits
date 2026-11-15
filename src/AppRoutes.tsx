import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import App from "./App";
import Layout from "@/components/views/Layout";

// Loaded on first visit to /profile, so the form code (react-hook-form, TextField, Slider)
// stays out of the gallery's initial download.
const Profile = lazy(() => import("./pages/Profile"));

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<App />} />
      <Route
        path="/profile"
        element={
          <Suspense fallback={null}>
            <Profile />
          </Suspense>
        }
      />
    </Route>
  </Routes>
);

export default AppRoutes;

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import App from "./App";
import Layout from "@/components/views/Layout";

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

import { Link, Outlet, useLocation } from "react-router";
import Header from "@/components/views/Header";
import Text from "@/shared/components/Text";
import "./Layout.module.css";

const Layout = () => {
  const { pathname } = useLocation();
  const isProfile = pathname === "/profile";

  return (
    <div className="container">
      <Header>
        <Text
          as="h1"
          variant="secondary"
          text={isProfile ? "Profile" : "Image Gallery"}
        />
        {isProfile ? (
          <Link to="/">Back to gallery</Link>
        ) : (
          <Link to="/profile">Profile</Link>
        )}
      </Header>
      <main className="main">
        {/* Active page renders here - header stays mounted, pages unmount on navigation */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

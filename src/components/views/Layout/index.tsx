import { Link as RouterLink, Outlet, useLocation } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import styles from "./Layout.module.css";

const Layout = () => {
  const { pathname } = useLocation();
  const isProfile = pathname === "/profile";

  return (
    <div className={styles.container}>
      <AppBar position="static" component="header">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h5" component="h1" className={styles.title}>
            {isProfile ? "Profile" : "Image Gallery"}
          </Typography>
          <Link
            component={RouterLink}
            to={isProfile ? "/" : "/profile"}
            color="inherit"
            underline="hover"
          >
            {isProfile ? "Back to gallery" : "Profile"}
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" className={styles.main}>
        {/* Active page renders here - header stays mounted, pages unmount on navigation */}
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;

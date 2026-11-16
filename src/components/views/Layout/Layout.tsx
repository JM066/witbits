import { Link, Outlet } from "react-router";
import Header from "@/components/views/Header";
import Text from "@/shared/components/Text";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            witbits
            <span className={styles.dot} aria-hidden="true" />
          </Link>
          <Text
            variant="secondary"
            size="caption"
            className={styles.tagline}
            text="The most famous card store that nobody has ever heard of"
          />
        </div>
      </Header>
      <main className={styles.main}>
        {/* Active page renders here - header stays mounted, pages unmount on navigation */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

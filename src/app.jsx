import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./pages/main/main";
import styles from "./app.module.css";
import Login from "./pages/login/login";
import { useCallback, useState } from "react";
import HeaderLogoutBtn from "./components/header-login-btn/header-logout-btn";
import Auth from "./service/auth/auth";

function App({ database, cloudinary }) {
  const [user, setUser] = useState(null);
  const [mainAuthSys, setAuthSys] = useState(null); // 이거 진짜 별론데...
  const navigate = useNavigate();

  // useEffect 써서? 아님 세션 정보를 가질 방법이 있나?...

  const handleSocialLogin = useCallback((loggedUser, authSys) => {
    setAuthSys(authSys);
    setUser(loggedUser);
    // console.log(loggedUser);
  }, []);

  const handleLogout = useCallback(async () => {
    await mainAuthSys.logout();
    navigate("/");
    setUser(null);
    setAuthSys(null);
  }, []);

  return (
    <div className={styles.document}>
      <div
        className={
          user ? `${styles.container} ${styles.login}` : styles.container
        }
      >
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src="/favicon.ico" alt="logo" />
          </div>
          <h2>Bunsiness Card Maker</h2>
          {user ? <HeaderLogoutBtn onLogout={handleLogout} /> : ""}
        </header>
        <Routes path="">
          <Route
            path="/"
            element={
              <Login
                user={user}
                onSocialLogin={handleSocialLogin}
                AuthSys={Auth}
                database={database}
              />
            }
          ></Route>
          <Route
            path="/app"
            element={
              <Main user={user} database={database} cloudinary={cloudinary} />
            }
          ></Route>
        </Routes>
        <footer className={styles.footer}>
          <span>Code your dream</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
